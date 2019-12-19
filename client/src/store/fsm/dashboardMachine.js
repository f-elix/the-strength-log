import { Machine } from "xstate";

const dashboardMachine = Machine({
  id: "Dashboard",
  initial: "idle",
  states: {
    entry: ["QUERY_USER"],
    idle: {}
  }
});

export default dashboardMachine;
