import { Machine } from "xstate";

const dashboardMachine = Machine({
	id: "Dashboard",
	initial: "init",
	states: {
		init: {
			on: {
				MOUNTED: "idle"
			}
		},
		idle: {
			entry: ["HIDE_LOADING"],
			on: {
				SESSION: "routing.session",
				AUTH: "routing.auth",
				SEARCH: "routing.search"
			}
		},
		routing: {
			states: {
				session: {
					entry: ["ROUTE_SESSION"]
				},
				auth: {
					entry: ["ROUTE_AUTH"]
				},
				search: {
					entry: ["ROUTE_SEARCH"]
				}
			},
			on: {
				MOUNTED: "idle"
			}
		}
	}
});

export default dashboardMachine;
