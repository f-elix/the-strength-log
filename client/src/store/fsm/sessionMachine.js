import { Machine } from "xstate";

export const sessionMachine = Machine({
	id: "Session",
	initial: "idle",
	states: {
		idle: {
			on: {
				DISPLAY: "displaying",
				EDIT: "editing",
				CREATE: "creating"
			}
		},
		displaying: {
			entry: ["DISPLAY_SESSION"],
			on: {
				EDIT: "editing",
				DELETE: "deleting"
			}
		},
		creating: {
			entry: ["CREATE_SESSION"],
			on: {
				SUCCESS: "editing",
				ERROR: {
					target: "idle",
					actions: ["SHOW_ERROR"]
				}
			}
		},
		editing: {
			entry: ["EDIT_SESSION"],
			on: {
				SAVE: "saving",
				DISCARD: {
					target: "idle",
					actions: ["DISCARD_SESSION"]
				}
			}
		},
		saving: {
			entry: ["SAVE_SESSION"],
			on: {
				SUCCESS: "displaying",
				ERROR: {
					target: "editing",
					action: ["SHOW_ERROR"]
				}
			}
		},
		deleting: {
			entry: ["DELETE_SESSION"],
			on: {
				SUCCESS: "idle",
				ERROR: {
					target: "displaying",
					action: ["SHOW_ERROR"]
				}
			}
		}
	}
});

export default sessionMachine;
