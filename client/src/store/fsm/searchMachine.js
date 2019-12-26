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
				SUCCESS: {
					target: "success",
					actions: ["ROUTE_SEARCH"]
				},
				ERROR: "idle"
			}
		},
		success: {
			entry: ["UPDATE_SESSIONS", "UPDATE_SEARCH_PARAMS", "UPDATE_QUERY"],
			on: {
				DISCARD: {
					target: "idle",
					actions: ["DISCARD_SEARCH"]
				}
			}
		}
	}
});

export default searchMachine;
