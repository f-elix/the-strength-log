import { Machine } from "xstate";

export const sessionMachine = Machine({
	id: "Session",
	initial: "idle",
	states: {
		idle: {
			entry: ["HIDE_LOADING"],
			on: {
				DISPLAY: {
					target: "displaying",
					actions: ["DISPLAY_SESSION"]
				},
				EDIT: "editing",
				CREATE: "creating"
			},
			exit: ["SHOW_LOADING"]
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
		displaying: {
			entry: ["HIDE_LOADING"],
			on: {
				EDIT: "editing",
				DELETE: "deleting",
				DISCARD: {
					target: "idle",
					actions: ["CLEAR_SESSION_DATA", "ROUTE_DASHBOARD"]
				},
				BACK_TO_SEARCH: {
					target: "idle",
					actions: ["ROUTE_SEARCH"]
				}
			}
		},
		editing: {
			entry: ["EDIT_SESSION", "HIDE_LOADING"],
			on: {
				SAVE: "saving",
				DISCARD: "displaying",
				DISCARD_NEW: {
					target: "idle",
					actions: ["DELETE_SESSION", "CLEAR_SESSION_DATA", "ROUTE_DASHBOARD"]
				},
				BACK_TO_DASHBOARD: {
					target: "editing",
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
