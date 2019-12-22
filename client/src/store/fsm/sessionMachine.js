import { Machine } from "xstate";

export const sessionMachine = Machine({
  id: "Session",
  initial: "idle",
  states: {
    idle: {
      on: {
        EDIT: "editing",
        DELETE: "deleted"
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
