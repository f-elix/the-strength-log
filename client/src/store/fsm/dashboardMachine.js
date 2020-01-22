import { Machine } from "xstate";

const dashboardMachine = Machine({
	id: "Dashboard",
	initial: "idle",
	states: {
		idle: {
			on: {
				UPDATE_CURRENT_SESSION: "fetchingCurrentSession"
			}
		},
		fetchingCurrentSession: {
			entry: ["GET_CURRENT_SESSION"],
			on: {
				SUCCESS: "hasCurrentSession",
				ERROR: "idle"
			},
			exit: ["UPDATE_CURRENT_SESSION"]
		},
		hasCurrentSession: {
			on: {
				UPDATE_CURRENT_SESSION: "fetchingCurrentSession"
			}
		}
	}
});

export default dashboardMachine;
