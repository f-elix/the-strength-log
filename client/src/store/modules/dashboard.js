import dashboardMachine from "../fsm/dashboardMachine";
import transition from "../transition";

import router from "../../router";

const state = {
	currentState: dashboardMachine.initialState
};
const mutations = {
	updateDashboardState(state, nextState) {
		state.currentState = nextState;
	}
};
const actions = {
	DASHBOARD_TRANSITION: (context, event) => {
		transition(dashboardMachine, context, event);
	},
	CREATE_SESSION: async ({ dispatch }) => {
		const token = localStorage.getItem("token");
		const date = new Date();
		const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		const query = {
			query: `
        mutation createSession($date: Date!) {
          createSession(sessionDate: $date) {
            _id
            createdAt
            title
            sessionDate
          }
        }
      `,
			variables: {
				date: formattedDate
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
			const newSession = data.data.createSession;
			newSession.exercises = [];
			dispatch("SESSION_TRANSITION", { type: "EDIT", params: { newSession } });
		} catch (error) {
			console.log(error);
		}
	}
};

export default {
	state,
	mutations,
	actions
};
