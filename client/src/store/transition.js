function transition(machine, { state, commit, dispatch }, action) {
  const nextState = machine.transition(state.currentState, action);
  commit(`update${machine.config.id}State`, nextState);
  nextState.actions.forEach(action => {
    dispatch(action.type);
  });
}

export default transition;
