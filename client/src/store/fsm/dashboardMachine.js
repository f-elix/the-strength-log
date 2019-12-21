import { Machine } from "xstate";

const dashboardMachine = Machine({
  id: "Dashboard",
  initial: "idle",
  states: {
    idle: {
      on: {
        CREATE_SESSION: "creating"
      }
    },
    creating: {
      type: "final"
    }
  }
});

export default dashboardMachine;
