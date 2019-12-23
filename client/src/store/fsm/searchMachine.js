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
			entry: ["UPDATE_SESSIONS"]
		}
	}
});

export default searchMachine;
