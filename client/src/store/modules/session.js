import sessionMachine from "../fsm/sessionMachine";
import transition from "../transition";

const state = {
	currentState: sessionMachine.initialState,
	sessionData: {}
};
const mutations = {
	updateSessionState(state, nextState) {
		state.currentState = nextState;
	},
	updateSessionData(state, data) {
		state.sessionData = data;
	},
	clearSessionData(state) {
		state.sessionData = {};
	},
	addExercise(state, newExercise) {
		state.sessionData.exercises.push(newExercise);
	},
	deleteExercise(state, exerciseId) {
		state.sessionData.exercises = state.sessionData.exercises.filter(exercise => {
			return exercise.id !== exerciseId;
		});
	},
	addMovement(state, { exerciseIndex, newMovement }) {
		state.sessionData.exercises[exerciseIndex].movements.push(newMovement);
	},
	deleteMovement(state, { exerciseIndex, movementId }) {
		const filteredMovements = state.sessionData.exercises[exerciseIndex].movements.filter(movement => {
			return movement.id !== movementId;
		});
		state.sessionData.exercises[exerciseIndex].movements = filteredMovements;
	},
	addSet(state, { newSet, exerciseIndex, movementIndex }) {
		state.sessionData.exercises[exerciseIndex].movements[movementIndex].sets.push(newSet);
	},
	deleteSet(state, { exerciseIndex, movementIndex, setId }) {
		const filteredSets = state.sessionData.exercises[exerciseIndex].movements[movementIndex].sets.filter(set => {
			return set.id !== setId;
		});
		state.sessionData.exercises[exerciseIndex].movements[movementIndex].sets = filteredSets;
	}
};

const actions = {
	SESSION_TRANSITION: (context, event) => {
		transition(sessionMachine, context, event);
	},
	CREATE_SESSION: async ({ dispatch }) => {
		const token = localStorage.getItem("token");
		const date = new Date();
		const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		const query = {
			query: `
					mutation createSession($date: Date!) {
					createSession(sessionDate: $date) {
						_id
						title
						sessionDate
						newSession
					}
				}
			`,
			variables: {
				date: formattedDate
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
				const error = {
					message: data.errors[0].message,
					statusCode: data.errors[0].extensions.exception.statusCode
				};
				throw error;
			}
			const newSession = data.data.createSession;
			newSession.exercises = [];
			dispatch("SESSION_TRANSITION", { type: "CREATED", params: { newSession } });
		} catch (err) {
			console.log(err);
			dispatch("SESSION_TRANSITION", { type: "ERROR", params: { error: err } });
		}
	},
	EDIT_SESSION: ({ commit }, { params }) => {
		if (params.newSession) {
			commit("updateSessionData", params.newSession);
		}
	},
	GET_SESSION: async ({ dispatch }, { params }) => {
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
				const error = {
					message: data.errors[0].message,
					statusCode: data.errors[0].extensions.exception.statusCode
				};
				throw error;
			}
			const sessionData = data.data.getSessionById;
			dispatch("SESSION_TRANSITION", { type: "SUCCESS", params: { sessionData } });
		} catch (err) {
			console.log(err);
			dispatch("SESSION_TRANSITION", { type: "ERROR", params: { error: err } });
		}
	},
	SAVE_SESSION: async ({ dispatch }, { params }) => {
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
				const error = {
					message: data.errors[0].message,
					statusCode: data.errors[0].extensions.exception.statusCode
				};
				throw error;
			}
			const sessionData = data.data.saveSession;
			dispatch("SESSION_TRANSITION", { type: "SUCCESS", params: { sessionData } });
		} catch (err) {
			console.log(err);
			dispatch("SESSION_TRANSITION", { type: "ERROR", params: { error: err } });
		}
	},
	DELETE_SESSION: async ({ dispatch }, { params }) => {
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
				const error = {
					message: data.errors[0].message,
					statusCode: data.errors[0].extensions.exception.statusCode
				};
				throw error;
			}
			if (data.data.deleteSession) {
				dispatch("SESSION_TRANSITION", { type: "SUCCESS" });
			}
		} catch (err) {
			console.log(err);
			dispatch("SESSION_TRANSITION", { type: "ERROR", params: { error: err } });
		}
	},
	UPDATE_SESSION_DATA: ({ commit }, { params }) => {
		commit("updateSessionData", params.sessionData);
	},
	CLEAR_SESSION_DATA: ({ commit }) => {
		commit("clearSessionData");
	}
};

export default {
	state,
	mutations,
	actions
};
