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
	},
	ADD_EXERCISE: ({ state, commit }) => {
		const exerciseId =
			state.sessionData.exercises.length > 0
				? state.sessionData.exercises[state.sessionData.exercises.length - 1].id + 1
				: 1;
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
		commit("addExercise", newExercise);
	},
	DELETE_EXERCISE: ({ commit }, exerciseId) => {
		commit("deleteExercise", exerciseId);
	},
	ADD_MOVEMENT: ({ state, commit }, exercise) => {
		const movementSubId = Number(exercise.movements[exercise.movements.length - 1].id.toString().split("")[1]) + 1;
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
		const exerciseIndex = state.sessionData.exercises.indexOf(exercise);
		commit("addMovement", { exerciseIndex, newMovement });
	},
	DELETE_MOVEMENT: ({ state, commit }, { exercise, movement }) => {
		const exerciseIndex = state.sessionData.exercises.indexOf(exercise);
		const movementId = movement.id;
		commit("deleteMovement", { exerciseIndex, movementId });
	},
	ADD_SET: ({ state, commit }, { exercise, movement }) => {
		const setSubId = Number(movement.sets[movement.sets.length - 1].id.toString().split("")[2]) + 1;
		console.log(setSubId);
		const id = Number(`${movement.id}${setSubId}`);
		const newSet = {
			id,
			setQty: 1,
			repsOrTime: "1",
			weight: ""
		};
		const movementIndex = exercise.movements.indexOf(movement);
		const exerciseIndex = state.sessionData.exercises.indexOf(exercise);
		commit("addSet", { newSet, exerciseIndex, movementIndex });
	},
	DELETE_SET: ({ state, commit }, { movement, exercise, setId }) => {
		const movementIndex = exercise.movements.indexOf(movement);
		const exerciseIndex = state.sessionData.exercises.indexOf(exercise);
		commit("deleteSet", { exerciseIndex, movementIndex, setId });
	}
};

export default {
	state,
	mutations,
	actions
};
