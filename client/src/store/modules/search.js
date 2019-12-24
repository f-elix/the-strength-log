import searchMachine from "../fsm/searchMachine";
import transition from "../transition";

const state = {
	currentState: searchMachine.initialState,
	sessions: []
};

const mutations = {
	updateSearchState(state, nextState) {
		state.currentState = nextState;
	},
	updateSessions(state, sessions) {
		state.sessions = sessions;
	}
};

const actions = {
	SEARCH_TRANSITION: (context, event) => {
		transition(searchMachine, context, event);
	},
	GET_SESSIONS: async ({ dispatch }, { params }) => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: token
				},
				body: JSON.stringify(params.query)
			});
			const data = await res.json();
			if (data.errors) {
				const error = {
					message: data.errors[0].message,
					statusCode: data.errors[0].extensions.exception.statusCode
				};
				throw error;
			}
			const sessions = data.data[params.queryName];
			dispatch("SEARCH_TRANSITION", { type: "SUCCESS", params: { sessions } });
		} catch (err) {
			console.log(err);
			dispatch("SEARCH_TRANSITION", { type: "ERROR", params: { error: err } });
		}
	},
	UPDATE_SESSIONS: ({ commit }, { params }) => {
		commit("updateSessions", params.sessions);
	}
};

export default {
	state,
	mutations,
	actions
};
