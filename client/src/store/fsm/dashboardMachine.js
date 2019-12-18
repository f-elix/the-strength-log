import { Machine } from "xstate";

const dashboardMachine = Machine({
  id: "Dashboard",
  initial: "idle",
  states: {
    idle: {}
  }
});
