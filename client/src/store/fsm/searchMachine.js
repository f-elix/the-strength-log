import { Machine } from "xstate";

const searchMachine = Machine({
	id: "Search",
	initial: "idle",
	states: {
		idle: {
			on: {
				SEARCH: "searching",
				DISCARD: {
					target: "idle",
					actions: ["DISCARD_SEARCH"]
				}
			}
		},
		searching: {
			entry: ["GET_SESSIONS"],
			on: {
				SUCCESS: {
					target: "idle",
					actions: ["UPDATE_SESSIONS", "UPDATE_SEARCH_PARAMS", "UPDATE_QUERY", "ROUTE_SEARCH"]
				},
				ERROR: "idle"
			}
		}
	}
});

export default searchMachine;
