import searchMachine from "../fsm/searchMachine";
import transition from "../transition";

const state = {
	currentState: searchMachine.initialState,
	sessions: [],
	searchParams: {
		dates: null,
		sessionName: null
	},
	currentQuery: ""
};

const mutations = {
	updateSearchState(state, nextState) {
		state.currentState = nextState;
	},
	updateSearchParams(state, searchParams) {
		state.searchParams = searchParams;
	},
	updateSessions(state, sessions) {
		state.sessions = sessions;
	},
	updateCurrentQuery(state, queryName) {
		state.currentQuery = queryName;
	},
	clearSearch(state) {
		state.sessions = [];
		state.searchParams = {
			dates: null,
			sessionName: null
		};
		state.currentQuery = "";
	}
};

const getters = {
	currentWeekDates() {
		let date = new Date();
		const monday = date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
		date = new Date();
		const sunday = date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? 0 : 7));
		return {
			monday: new Date(monday).toISOString().split("T")[0],
			sunday: new Date(sunday).toISOString().split("T")[0]
		};
	},
	lastWeekDates() {
		let date = new Date();
		const monday = date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1) - 7);
		date = new Date();
		const sunday = date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? 0 : 7) - 7);
		return {
			monday: new Date(monday).toISOString().split("T")[0],
			sunday: new Date(sunday).toISOString().split("T")[0]
		};
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
			const queryName = params.queryName;
			const sessions = data.data[queryName];
			dispatch("SEARCH_TRANSITION", {
				type: "SUCCESS",
				params: {
					sessions,
					queryName,
					searchParams: {
						dates: {
							fromDate: params.query.variables.fromDate,
							toDate: params.query.variables.toDate
						},
						sessionName: params.query.variables.title
					}
				}
			});
		} catch (err) {
			console.log(err);
			dispatch("SEARCH_TRANSITION", { type: "ERROR", params: { error: err } });
		}
	},
	UPDATE_SESSIONS: ({ commit }, { params }) => {
		commit("updateSessions", params.sessions);
	},
	UPDATE_SEARCH_PARAMS: ({ commit }, { params }) => {
		commit("updateSearchParams", params.searchParams);
	},
	UPDATE_QUERY: ({ commit }, { params }) => {
		commit("updateCurrentQuery", params.queryName);
	},
	DISCARD_SEARCH: ({ commit }) => {
		commit("clearSearch");
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
