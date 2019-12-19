function transition(machine, { state, commit, dispatch }, { type, params }) {
  const nextState = machine.transition(state.currentState, { type, params });
  commit(`update${machine.config.id}State`, nextState);
  nextState.actions.forEach(action => {
    dispatch(action.type, { type, params });
  });
}

export default transition;
