import authMachine from "../fsm/authMachine";
import transition from "../transition";

import router from "../../router";

const state = {
  currentState: authMachine.initialState,
  authQuery: null,
  error: null,
  userData: null
};

const mutations = {
  updateAuthState(state, nextState) {
    state.currentState = nextState;
  },
  updateAuthQuery(state, query) {
    state.authQuery = query;
  },
  updateError(state, msg) {
    state.error = msg;
  },
  updateUserData(state, data) {
    state.userData = data;
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
  POST_USER: async ({ state, dispatch, commit }) => {
    fetch(process.env.VUE_APP_API, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(state.authQuery)
    })
      .then(res => res.json())
      .then(data => {
        // Extract data
        if (data.errors) {
          const error = {
            message: data.errors[0].message,
            statusCode: data.errors[0].extensions.exception.statusCode
          };
          throw error;
        }
        const query = data.data.signupUser ? "signupUser" : "loginUser";
        const token = data.data[query].token;
        const userId = data.data[query].userId;
        // Store token and id in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        // Update user
        commit("updateUserData", { userId, token });
        // Transition state
        dispatch("AUTH_TRANSITION", { type: "SUCCESS" });
      })
      .catch(err => {
        // Update error
        commit("updateError", err);
        // Transition state
        dispatch("AUTH_TRANSITION", { type: "ERROR" });
      });
  },
  GO_TO_DASHBOARD: () => {
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
