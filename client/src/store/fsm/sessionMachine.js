import { Machine } from "xstate";

export const sessionMachine = Machine({
	id: "Session",
	initial: "idle",
	states: {
		idle: {
			entry: ["HIDE_LOADING"],
			on: {
				DISPLAY: "displaying",
				EDIT: "editing",
				CREATE: "creating"
			},
			exit: ["SHOW_LOADING"]
		},
		displaying: {
			entry: ["DISPLAY_SESSION", "HIDE_LOADING"],
			on: {
				EDIT: "editing",
				DELETE: "deleting",
				DISCARD: {
					target: "idle",
					actions: ["DISCARD_SESSION", "ROUTE_DASHBOARD"]
				}
			}
		},
		creating: {
			entry: ["CREATE_SESSION"],
			on: {
				CREATED: {
					target: "editing",
					actions: ["ROUTE_SESSION"]
				},
				ERROR: "idle"
			}
		},
		editing: {
			entry: ["EDIT_SESSION", "HIDE_LOADING"],
			on: {
				SAVE: "saving",
				DISCARD: {
					target: "idle",
					actions: ["ROUTE_DASHBOARD"]
				}
			}
		},
		saving: {
			entry: ["SHOW_LOADING", "SAVE_SESSION"],
			on: {
				SUCCESS: "displaying",
				ERROR: "editing"
			}
		},
		deleting: {
			entry: ["SHOW_LOADING", "DELETE_SESSION"],
			on: {
				SUCCESS: "idle",
				ERROR: "displaying"
			}
		}
	}
});

export default sessionMachine;
