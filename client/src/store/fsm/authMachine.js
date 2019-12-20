import { Machine } from "xstate";

const authMachine = Machine({
  id: "Auth",
  initial: "loading",
  states: {
    loading: {
      on: {
        LOADED: "checkingForAuth"
      }
    },
    checkingForAuth: {
      entry: ["CHECK_FOR_AUTH"],
      on: {
        SUCCESS: "authenticated",
        ERROR: "idle"
      }
    },
    idle: {
      id: "idle",
      initial: "login",
      states: {
        login: {
          on: {
            SIGNUP: "signup",
            LOGIN: "#fetching"
          },
          exit: ["HIDE_ERROR"]
        },
        signup: {
          on: {
            LOGIN: "login",
            SIGNUP: "#fetching"
          },
          exit: ["HIDE_ERROR"]
        },
        last: {
          type: "history"
        }
      }
    },
    fetching: {
      id: "fetching",
      entry: ["AUTH_USER"],
      on: {
        SUCCESS: "authenticated",
        ERROR: {
          target: "idle.last",
          actions: ["SHOW_ERROR"]
        }
      }
    },
    authenticated: {
      entry: ["STORE_TOKEN_IN_LOCALSTORAGE", "STORE_USER_IN_STATE", "LOGIN"],
      on: {
        LOGOUT: "idle"
      },
      exit: ["CLEAR_STORAGE", "LOGOUT"]
    }
  }
});

export default authMachine;
