import dashboardMachine from "../fsm/dashboardMachine";
import transition from "../transition";

const state = {
	currentState: dashboardMachine.initialState,
	currentSession: null
};

const mutations = {
	updateDashboardState(state, nextState) {
		state.currentState = nextState;
	},
	updateCurrentSession(state, currentSession) {
		state.currentSession = currentSession;
	}
};

const actions = {
	DASHBOARD_TRANSITION: (context, event) => {
		transition(dashboardMachine, context, event);
	},
	GET_CURRENT_SESSION: async ({ dispatch }) => {
		const token = localStorage.getItem("token");
		const date = new Date();
		const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		const today = `${date.getFullYear()}-${month}-${date.getDate()}`;
		const query = {
			query: `
					query getCurrentSession($date: Date!) {
						getSessionsByDate(sessionDate: $date) {
							_id
						}
					}
				`,
			variables: {
				date: today
			}
		};
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: token
				},
				body: JSON.stringify(query)
			});
			const data = await res.json();
			if (data.errors) {
				const error = {
					message: data.errors[0].message,
					statusCode: data.errors[0].extensions.exception.statusCode
				};
				throw error;
			}
			let currentSession = null;
			const results = data.data.getSessionsByDate;
			if (results.length > 0) {
				currentSession = results[results.length - 1];
			}

			dispatch("DASHBOARD_TRANSITION", {
				type: currentSession ? "SUCCESS" : "ERROR",
				params: { currentSession }
			});
		} catch (err) {
			console.log(err);
			dispatch("DASHBOARD_TRANSITION", { type: "ERROR" });
		}
	},
	UPDATE_CURRENT_SESSION: ({ commit }, { params }) => {
		commit("updateCurrentSession", params.currentSession);
	}
};

export default {
	state,
	mutations,
	actions
};
