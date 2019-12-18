import { Machine } from "xstate";

const authMachine = Machine({
  id: "Auth",
  initial: "mounting",
  states: {
    mounting: {
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
          }
        },
        signup: {
          on: {
            LOGIN: "login",
            SIGNUP: "#fetching"
          }
        },
        last: {
          type: "history"
        }
      }
    },
    fetching: {
      id: "fetching",
      entry: ["POST_USER"],
      on: {
        SUCCESS: "authenticated",
        ERROR: "idle.last"
      }
    },
    authenticated: {
      entry: ["GO_TO_DASHBOARD"],
      on: {
        LOGOUT: "idle"
      },
      exit: ["CLEAR_STORAGE", "LOGOUT"]
    }
  }
});

export default authMachine;
