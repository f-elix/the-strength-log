import { Machine } from "xstate";

export const sessionMachine = Machine({
  id: "session",
  initial: "editing",
  context: {
    exerciseList: []
  },
  states: {
    idle: {
      on: {
        EDIT: "editing",
        DELETE: "deleted"
      }
    },
    editing: {
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
