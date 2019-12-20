import authMachine from "../fsm/authMachine";
import transition from "../transition";

import router from "../../router";

const state = {
  currentState: authMachine.initialState,
  userData: {},
  error: ""
};

const mutations = {
  updateAuthState(state, nextState) {
    state.currentState = nextState;
  },
  updateUserData(state, data) {
    state.userData = data;
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
      dispatch("AUTH_TRANSITION", { type: data.data.isAuth ? "SUCCESS" : "ERROR", params: { token } });
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
        dispatch("AUTH_TRANSITION", { type: "SUCCESS", params: { token } });
      })
      .catch(error => {
        dispatch("AUTH_TRANSITION", { type: "ERROR", params: { error } });
      });
  },
  STORE_USER_IN_STATE: ({ commit }, { params }) => {
    const userQuery = {
      query: `
      {
        getUserData {
          name
          email
          _id
          log {
            title
            sessionDate
            exercises {
              name
              sets {
                setQty
                repQty
                weigth
              }
            }
            notes
            _id
            createdAt
            updatedAt
          }
        }
      }
    `
    };
    fetch(process.env.VUE_APP_API, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: params.token
      },
      body: JSON.stringify(userQuery)
    })
      .then(res => res.json())
      .then(data => {
        const userData = data.data.getUserData;
        commit("updateUserData", userData);
      })
      .catch(err => {
        console.log(err);
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
