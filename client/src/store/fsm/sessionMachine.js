import { Machine } from "xstate";

export const sessionMachine = Machine({
  id: "session",
  initial: "idle",
  states: {
    idle: {
      on: {
        CREATE: "creating",
        DISPLAY: "displaying"
      }
    },
    displaying: {
      entry: ["DISPLAY_SESSION"],
      on: {
        EDIT: "editing",
        DELETE: "deleted"
      }
    },
    creating: {
      entry: ["CREATE_SESSION"],
      on: {
        "": "editing"
      }
    },
    editing: {
      entry: ["EDIT_SESSION"],
      on: {
        SAVE: "idle",
        DISCARD: "idle"
      }
    },
    deleted: {
      type: "final"
    }
  }
});

export default sessionMachine;
