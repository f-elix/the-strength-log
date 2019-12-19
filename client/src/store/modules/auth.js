import authMachine from "../fsm/authMachine";
import transition from "../transition";

import router from "../../router";

const state = {
  currentState: authMachine.initialState,
  userData: null,
  error: null
};

const mutations = {
  updateAuthState(state, nextState) {
    state.currentState = nextState;
  },
  updateUserData(state, data) {
    state.userData = {
      ...state.userData,
      data
    };
  },
  updateError(state, msg) {
    state.error = msg;
  },
  clearError(state) {
    state.error = null;
  }
};

const actions = {
  AUTH_TRANSITION: (context, event) => {
    transition(authMachine, context, event);
  },
  CHECK_FOR_AUTH: async ({ dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch("AUTH_TRANSITION", { type: "ERROR" });
      return;
    }
    const isAuthQuery = {
      query: `
        query isAuthenticated($token: String!) {
          isAuth(token: $token)
        }
      `,
      variables: {
        token: token
      }
    };
    try {
      const res = await fetch(process.env.VUE_APP_API, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(isAuthQuery)
      });
      const data = await res.json();
      dispatch("AUTH_TRANSITION", { type: data.data.isAuth ? "SUCCESS" : "ERROR" });
      return;
    } catch (err) {
      dispatch("AUTH_TRANSITION", { type: "ERROR" });
    }
  },
  AUTH_USER: async ({ dispatch }, { params }) => {
    const { authQuery, queryName } = params;
    fetch(process.env.VUE_APP_API, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(authQuery)
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          const error = {
            message: data.errors[0].message,
            statusCode: data.errors[0].extensions.exception.statusCode
          };
          throw error;
        }
        const token = data.data[queryName].token;
        const userId = data.data[queryName].userId;
        dispatch("AUTH_TRANSITION", { type: "SUCCESS", params: { token, userId } });
      })
      .catch(error => {
        dispatch("AUTH_TRANSITION", { type: "ERROR", params: { error } });
      });
  },
  STORE_USER_IN_STATE: ({ commit }, { params }) => {
    const userQuery = {
      query: `
        query getUser($userId: String!) {
          getUserData(userID: $userID) {
            name
            email
          }
        }
      `,
      variables: {
        userId: params.userId
      }
    };
    fetch(process.env.VUE_APP_API, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + params.token
      },
      body: JSON.stringify(userQuery)
    })
      .then(res => res.json())
      .then(user => {
        console.log(user);
      });
  },
  SHOW_ERROR: ({ commit }, { params }) => {
    commit("updateError", params.error);
  },
  HIDE_ERROR: ({ commit }) => {
    commit("clearError");
  },
  STORE_TOKEN_IN_LOCALSTORAGE: (_, { params }) => {
    localStorage.setItem("token", params.token);
  },
  // STORE_USERID_IN_STATE: ({ commit }, { params }) => {
  //   commit("updateUserData", params.userId);
  // },
  LOGIN: () => {
    router.push("/dashboard");
  },
  CLEAR_STORAGE: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },
  LOGOUT: () => {
    router.push("/");
  }
};

export default {
  state,
  actions,
  mutations
};
