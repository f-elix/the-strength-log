import { Machine } from "xstate";

export const sessionMachine = Machine({
	id: "Session",
	initial: "idle",
	states: {
		idle: {
			on: {
				DISPLAY: "displaying",
				EDIT: "editing"
			}
		},
		displaying: {
			entry: ["DISPLAY_SESSION"],
			on: {
				EDIT: "editing",
				DELETE: "deleting"
			}
		},
		editing: {
			entry: ["EDIT_SESSION"],
			on: {
				SAVE: {
					target: "saving",
					actions: ["SAVE_SESSION"]
				},
				DISCARD: "idle"
			}
		},
		saving: {
			on: {
				SUCCESS: "displaying",
				ERROR: {
					target: "editing",
					action: ["SHOW_ERROR"]
				}
			}
		},
		deleting: {
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
