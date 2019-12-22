import { Machine } from "xstate";

const dashboardMachine = Machine({
  id: "Dashboard",
  initial: "idle",
  states: {
    idle: {
      on: {
        CREATE_SESSION: "session"
      }
    },
    session: {
      entry: ["CREATE_SESSION"],
      on: {
        DISCARD: "idle"
      }
    },
    fetching: {}
  }
});

export default dashboardMachine;
