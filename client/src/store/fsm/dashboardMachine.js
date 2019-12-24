import { Machine } from "xstate";

const dashboardMachine = Machine({
	id: "Dashboard",
	initial: "idle",
	states: {
		idle: {
			on: {
				SESSION: "routing.session",
				AUTH: "routing.auth"
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
				search: {}
			},
			on: {
				MOUNTED: "idle"
			}
		}
	}
});

export default dashboardMachine;
