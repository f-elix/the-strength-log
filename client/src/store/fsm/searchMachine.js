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
			entry: ["GET_SESSIONS"],
			on: {
				SUCCESS: "success",
				ERROR: "idle"
			}
		},
		success: {
			entry: ["UPDATE_SESSIONS", "UPDATE_SEARCH_PARAMS", "UPDATE_QUERY", "ROUTE_SEARCH"],
			on: {
				DISCARD: {
					target: "idle",
					actions: ["DISCARD_SEARCH"]
				},
				SEARCH: "searching"
			}
		}
	}
});

export default searchMachine;
