import { Machine } from "xstate";

const authMachine = Machine({
	id: "Auth",
	initial: "init",
	states: {
		init: {
			on: {
				LOADED: "checkingForAuth"
			}
		},
		checkingForAuth: {
			entry: ["SHOW_LOADING", "CHECK_FOR_AUTH"],
			on: {
				SUCCESS: {
					target: "authenticated",
					actions: ["ROUTE_DASHBOARD"]
				},
				ERROR: "idle"
			}
		},
		idle: {
			id: "idle",
			initial: "login",
			entry: ["HIDE_LOADING"],
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
			entry: ["SHOW_LOADING", "AUTH_USER"],
			on: {
				SUCCESS: {
					target: "authenticated",
					actions: ["ROUTE_DASHBOARD"]
				},
				ERROR: {
					target: "idle.last",
					actions: ["SHOW_ERROR"]
				}
			}
		},
		authenticated: {
			entry: ["STORE_TOKEN_IN_LOCALSTORAGE", "STORE_USER_IN_STATE"],
			on: {
				LOGOUT: {
					target: "idle",
					actions: ["ROUTE_AUTH", "CLEAR_STORAGE"]
				},
				LOADED: {
					target: "checkingForAuth"
				}
			},
			exit: ["SHOW_LOADING"]
		}
	}
});

export default authMachine;
