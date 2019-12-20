import sessionMachine from "../fsm/sessionMachine";
import transition from "../transition";

const state = {};
const mutations = {};
const actions = {
  SESSION_TRANSITION: (context, event) => {
    transition(sessionMachine, context, event);
  }
};

export default {
  state,
  mutations,
  actions
};
