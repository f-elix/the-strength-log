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
	}
};

export default {
	state,
	mutations,
	actions
};
