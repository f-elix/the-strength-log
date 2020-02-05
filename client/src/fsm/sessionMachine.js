import { Machine, assign } from "xstate";

import router from "../router";

const services = {
	getSession: async (_, event) => {
		const { params } = event;
		const token = localStorage.getItem("token");
		const query = {
			query: `
				query getSessionById($id: ID!) {
					getSessionById(sessionId: $id) {
						_id
						title
						sessionDate
						exercises {
							id
							movements {
								id
								name
								sets {
									id
									setQty
									repsOrTime
									weight
								}
							}
						}
						bodyweigth
						notes
					}
				}
			`,
			variables: {
				id: params.sessionId
			}
		};
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: token
				},
				body: JSON.stringify(query)
			});
			const data = await res.json();
			if (data.errors) {
				const error = new Error();
				error.message = data.errors[0].message;
				error.statusCode = data.errors[0].extensions.exception.statusCode;
				throw error;
			}
			const sessionData = data.data.getSessionById;
			return sessionData;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	getCurrentSession: async () => {
		const token = localStorage.getItem("token");
		const date = new Date();
		const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
		const today = `${date.getFullYear()}-${month}-${date.getDate()}`;
		const query = {
			query: `
					query getCurrentSession($date: Date!) {
						getSessionsByDate(sessionDate: $date) {
							_id
						}
					}
				`,
			variables: {
				date: today
			}
		};
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: token
				},
				body: JSON.stringify(query)
			});
			const data = await res.json();
			if (data.errors) {
				const error = new Error();
				error.message = data.errors[0].message;
				error.statusCode = data.errors[0].extensions.exception.statusCode;
				throw error;
			}
			let currentSession = null;
			const results = data.data.getSessionsByDate;
			if (results.length > 0) {
				currentSession = results[results.length - 1];
			}
			return currentSession;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	saveSession: async (_, event) => {
		const { params } = event;
		const token = localStorage.getItem("token");
		const query = {
			query: `
				mutation saveSession($sessionData: SessionInput!) {
					saveSession(sessionData: $sessionData) {
						_id
						title
						sessionDate
						exercises {
							id
							movements {
								id
								name
								sets {
									id
									setQty
									repsOrTime
									weight
								}
							}
						}
						bodyweigth
						notes
						newSession
					}
				}
			`,
			variables: {
				sessionData: params.sessionData
			}
		};
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: token
				},
				body: JSON.stringify(query)
			});
			const data = await res.json();
			if (data.errors) {
				const error = new Error();
				error.message = data.errors[0].message;
				error.statusCode = data.errors[0].extensions.exception.statusCode;
				throw error;
			}
			const sessionData = data.data.saveSession;
			return sessionData;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	deleteSession: async (_, event) => {
		const { params } = event;
		const token = localStorage.getItem("token");
		const query = {
			query: `
				mutation deleteSession($id: ID!) {
					deleteSession(sessionId: $id)
				}
			`,
			variables: {
				id: params.sessionId
			}
		};
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: token
				},
				body: JSON.stringify(query)
			});
			const data = await res.json();
			if (data.errors) {
				const error = new Error();
				error.message = data.errors[0].message;
				error.statusCode = data.errors[0].extensions.exception.statusCode;
				throw error;
			}
			if (data.data.deleteSession) {
				return;
			} else {
				const error = new Error();
				error.message = "Something went wrong";
				error.statusCode = 500;
				throw error;
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

const actions = {
	routeNewSession: () => {
		router.push("/session").catch(err => console.log(err));
	},
	routeSession: (_, event) => {
		const id = event.data ? event.data._id : event.params.sessionId;
		router.push("/session/" + id).catch(err => console.log(err));
	},
	routeDashboard: () => {
		router.push("/dashboard").catch(err => console.log(err));
	},
	routeSearch: () => {
		router.push("/search-results").catch(err => console.log(err));
	},
	createSession: assign({
		sessionData: () => {
			const date = new Date();
			const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
			const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
			const formattedDate = `${date.getFullYear()}-${month}-${day}`;
			const newSession = {
				title: "New Session",
				sessionDate: formattedDate,
				exercises: [],
				newSession: true
			};
			return newSession;
		}
	}),
	updateSessionData: assign({ sessionData: (_, event) => event.data }),
	clearSessionData: assign({ sessionData: {} }),
	updateCurrentSession: assign({
		currentSession: (context, event) => {
			if (event.type.includes("savingSession") && !event.data.newSession) {
				return context.currentSession;
			} else {
				return event.data;
			}
		}
	}),
	updateExercises: assign({
		sessionData: (context, event) => {
			const sessionData = context.sessionData;
			sessionData.exercises = event.params.exercises;
			return sessionData;
		}
	}),
	addExercise: assign({
		sessionData: context => {
			const sessionData = context.sessionData;
			const exercises = sessionData.exercises;
			const exerciseId = exercises.length > 0 ? exercises[exercises.length - 1].id + 1 : 1;
			const movementId = Number(`${exerciseId}1`);
			const setId = Number(`${movementId}1`);
			const newExercise = {
				id: exerciseId,
				movements: [
					{
						id: movementId,
						name: "",
						sets: [
							{
								id: setId,
								setQty: 1,
								repsOrTime: "1",
								weight: ""
							}
						]
					}
				]
			};
			sessionData.exercises.push(newExercise);
			return sessionData;
		}
	}),
	deleteExercise: assign({
		sessionData: (context, event) => {
			const sessionData = context.sessionData;
			const filteredExercises = sessionData.exercises.filter(exercise => {
				return exercise.id !== event.params.exerciseId;
			});
			sessionData.exercises = filteredExercises;
			return sessionData;
		}
	}),
	addMovement: assign({
		sessionData: (context, event) => {
			const sessionData = context.sessionData;
			const exercise = event.params.exercise;
			const movementSubId =
				Number(exercise.movements[exercise.movements.length - 1].id.toString().split("")[1]) + 1;
			const movementId = Number(`${exercise.id}${movementSubId}`);
			const setId = Number(`${movementId}1`);
			const newMovement = {
				id: movementId,
				name: "",
				sets: [
					{
						id: setId,
						setQty: 1,
						repsOrTime: "1",
						weight: ""
					}
				]
			};
			const exerciseIndex = context.sessionData.exercises.indexOf(exercise);
			sessionData.exercises[exerciseIndex].movements.push(newMovement);
			return sessionData;
		}
	}),
	deleteMovement: assign({
		sessionData: (context, event) => {
			const sessionData = context.sessionData;
			const { exercise, movement } = event.params;
			const exerciseIndex = context.sessionData.exercises.indexOf(exercise);
			const movementId = movement.id;
			const filteredMovements = sessionData.exercises[exerciseIndex].movements.filter(movement => {
				return movement.id !== movementId;
			});
			sessionData.exercises[exerciseIndex].movements = filteredMovements;
			return sessionData;
		}
	}),
	addSet: assign({
		sessionData: (context, event) => {
			const sessionData = context.sessionData;
			const { exercise, movement } = event.params;
			const setSubId = Number(movement.sets[movement.sets.length - 1].id.toString().split("")[2]) + 1;
			const id = Number(`${movement.id}${setSubId}`);
			const newSet = {
				id,
				setQty: 1,
				repsOrTime: "1",
				weight: ""
			};
			const movementIndex = exercise.movements.indexOf(movement);
			const exerciseIndex = sessionData.exercises.indexOf(exercise);
			sessionData.exercises[exerciseIndex].movements[movementIndex].sets.push(newSet);
			return sessionData;
		}
	}),
	deleteSet: assign({
		sessionData: (context, event) => {
			const sessionData = context.sessionData;
			const { movement, exercise, setId } = event.params;
			const movementIndex = exercise.movements.indexOf(movement);
			const exerciseIndex = sessionData.exercises.indexOf(exercise);
			const filteredSets = sessionData.exercises[exerciseIndex].movements[movementIndex].sets.filter(set => {
				return set.id !== setId;
			});
			sessionData.exercises[exerciseIndex].movements[movementIndex].sets = filteredSets;
			return sessionData;
		}
	})
};

export const sessionMachine = Machine(
	{
		id: "session",
		context: {
			sessionData: {},
			currentSession: null
		},
		initial: "init",
		states: {
			init: {
				id: "init",
				invoke: {
					src: "getCurrentSession",
					onDone: {
						target: "idle",
						actions: ["updateCurrentSession"]
					},
					onError: "idle"
				}
			},
			idle: {
				id: "idle",
				on: {
					DISPLAY: {
						target: "loading.fetchingSession",
						actions: ["routeSession"]
					},
					CREATE: {
						target: "editing",
						actions: ["createSession", "routeNewSession"]
					}
				}
			},
			loading: {
				id: "loading",
				states: {
					fetchingSession: {
						invoke: {
							src: "getSession",
							onDone: {
								target: "#displaying",
								actions: ["updateSessionData"]
							},
							onError: {
								target: "#idle",
								actions: ["routeSearch"]
							}
						}
					},
					savingSession: {
						invoke: {
							src: "saveSession",
							onDone: {
								target: "#displaying",
								actions: ["updateSessionData", "updateCurrentSession"]
							},
							onError: "#editing"
						}
					},
					deletingSession: {
						invoke: {
							src: "deleteSession",
							onDone: {
								target: "#init",
								actions: ["routeDashboard"]
							},
							onError: "#displaying"
						}
					}
				}
			},
			displaying: {
				id: "displaying",
				on: {
					EDIT: "editing",
					DISPLAY: "loading.fetchingSession",
					DELETE: "loading.deletingSession",
					BACK_TO_DASHBOARD: {
						target: "idle",
						actions: ["clearSessionData", "routeDashboard"]
					},
					BACK_TO_SEARCH: {
						target: "idle",
						actions: ["clearSessionData", "routeSearch"]
					}
				}
			},
			editing: {
				id: "editing",
				initial: "idle",
				states: {
					idle: {
						on: {
							SAVE: "#loading.savingSession",
							DISPLAY: "#loading.fetchingSession",
							DELETE: "#loading.deletingSession",
							BACK_TO_DASHBOARD: {
								target: "#idle",
								actions: ["clearSessionData", "routeDashboard"]
							},
							ADD_EXERCISE: {
								actions: ["addExercise"]
							},
							DELETE_EXERCISE: {
								actions: ["deleteExercise"]
							},
							ADD_MOVEMENT: {
								actions: ["addMovement"]
							},
							DELETE_MOVEMENT: {
								actions: ["deleteMovement"]
							},
							ADD_SET: {
								actions: ["addSet"]
							},
							DELETE_SET: {
								actions: ["deleteSet"]
							},
							DRAG: "dragging"
						}
					},
					dragging: {
						on: {
							DROP: "idle",
							UPDATE_EXERCISES: {
								actions: ["updateExercises"]
							}
						}
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
