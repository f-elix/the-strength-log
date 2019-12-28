import authMachine from "../fsm/authMachine";
import transition from "../transition";

import router from "../../router";

const state = {
	currentState: authMachine.initialState,
	userData: {},
	error: "",
	loading: false
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
	},
	showLoading(state) {
		state.loading = true;
	},
	hideLoading(state) {
		state.loading = false;
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
			if (data.errors) {
				const error = {
					message: data.errors[0].message,
					statusCode: data.errors[0].extensions.exception.statusCode
				};
				throw error;
			}
			dispatch("AUTH_TRANSITION", { type: data.data.isAuth ? "SUCCESS" : "ERROR", params: { token } });
		} catch (err) {
			console.log(err);
			dispatch("AUTH_TRANSITION", { type: "ERROR", params: { error: err } });
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
	STORE_USER_IN_STATE: async ({ commit }, { params }) => {
		const userQuery = {
			query: `
      {
        getUserData {
          name
        }
      }
    `
		};
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: params.token
				},
				body: JSON.stringify(userQuery)
			});
			const data = await res.json();
			if (data.errors) {
				const error = {
					message: data.errors[0].message,
					statusCode: data.errors[0].extensions.exception.statusCode
				};
				throw error;
			}
			const userData = data.data.getUserData;
			commit("updateUserData", userData);
		} catch (error) {
			console.log(error);
		}
	},
	SHOW_ERROR: ({ commit }, { params }) => {
		commit("updateError", params.error);
	},
	HIDE_ERROR: ({ commit }) => {
		commit("clearError");
	},
	SHOW_LOADING: ({ commit }) => {
		commit("showLoading");
	},
	HIDE_LOADING: ({ commit }) => {
		commit("hideLoading");
	},
	STORE_TOKEN_IN_LOCALSTORAGE: (_, { params }) => {
		localStorage.setItem("token", params.token);
	},
	CLEAR_STORAGE: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
	}
};

export default {
	state,
	actions,
	mutations
};
