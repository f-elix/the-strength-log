import { Machine } from "xstate";

const searchMachine = Machine({
	id: "Search",
	initial: "idle",
	states: {
		idle: {
			on: {
				SEARCH: "searching"
			}
		},
		searching: {
			entry: ["SHOW_LOADING", "GET_SESSIONS"],
			on: {
				SUCCESS: "success",
				ERROR: {
					target: "idle",
					actions: ["HIDE_LOADING"]
				}
			}
		},
		success: {
			entry: ["UPDATE_SESSIONS", "UPDATE_SEARCH_PARAMS", "UPDATE_QUERY", "ROUTE_SEARCH", "HIDE_LOADING"],
			on: {
				DISCARD: {
					target: "idle",
					actions: ["DISCARD_SEARCH", "ROUTE_DASHBOARD"]
				},
				SEARCH: "searching"
			}
		}
	}
});

export default searchMachine;
