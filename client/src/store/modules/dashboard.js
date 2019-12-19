import dashboardMachine from "../fsm/dashboardMachine";
import transition from "../transition";

const state = {};
const mutations = {};
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
