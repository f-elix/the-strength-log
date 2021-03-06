import { Machine, assign } from "xstate";

import router from "../router";

const services = {
	getSessions: async (_, event) => {
		const { params } = event;
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: token
				},
				body: JSON.stringify(params.query)
			});
			const data = await res.json();
			if (data.errors) {
				const error = new Error();
				error.message = data.errors[0].message;
				error.statusCode = data.errors[0].extensions.exception.statusCode;
				throw error;
			}
			const queryName = params.queryName;
			const sessions = data.data[queryName];
			if (!sessions.length) {
				const error = new Error();
				error.message = "No results found";
				error.statusCode = 404;
				throw error;
			}
			return {
				sessions,
				queryName,
				searchParams: {
					date: params.query.variables.date,
					dates: {
						fromDate: params.query.variables.fromDate,
						toDate: params.query.variables.toDate
					},
					sessionName: params.query.variables.title
				}
			};
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

const actions = {
	routeDashboard: () => {
		router.push("/dashboard").catch(err => console.log(err));
	},
	routeSearch: () => {
		router.push("/search-results").catch(err => console.log(err));
	},
	updateSessions: assign({ sessions: (_, event) => event.data.sessions }),
	updateQuery: assign({ currentQuery: (_, event) => event.data.queryName }),
	updateSearchParams: assign({ searchParams: (_, event) => event.data.searchParams })
};

export const searchMachine = Machine(
	{
		id: "search",
		context: {
			sessions: [],
			searchParams: {
				date: null,
				dates: null,
				sessionName: null
			},
			currentQuery: ""
		},
		initial: "idle",
		states: {
			idle: {
				on: {
					SEARCH: "fetching",
					BACK_TO_MENU: {
						actions: ["routeDashboard"]
					}
				}
			},
			fetching: {
				entry: ["routeSearch"],
				invoke: {
					src: "getSessions",
					onDone: {
						target: "success",
						actions: ["updateSessions", "updateQuery", "updateSearchParams"]
					},
					onError: {
						target: "error"
					}
				},
				on: {
					BACK_TO_MENU: {
						actions: ["routeDashboard"]
					}
				}
			},
			success: {
				on: {
					SEARCH: "fetching",
					BACK_TO_MENU: {
						actions: ["routeDashboard"]
					}
				}
			},
			error: {
				on: {
					SEARCH: "fetching",
					BACK_TO_MENU: {
						actions: ["routeDashboard"]
					}
				}
			}
		}
	},
	{
		services,
		actions
	}
);
