function transition(machine, { state, commit, dispatch }, { type, data }) {
  const nextState = machine.transition(state.currentState, { type, data });
  commit(`update${machine.config.id}State`, nextState);
  console.log(nextState);
  nextState.actions.forEach(action => {
    dispatch(action.type, { type, data });
  });
}

export default transition;
