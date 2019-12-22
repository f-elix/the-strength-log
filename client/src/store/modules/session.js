import sessionMachine from "../fsm/sessionMachine";
import transition from "../transition";

import router from "../../router";

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
	addExercise(state, newExercise) {
		state.sessionData.exercises.push(newExercise);
	},
	removeExercise(state, exerciseId) {
		state.sessionData.exercises = state.sessionData.exercises.filter(exercise => {
			return exercise.id !== exerciseId;
		});
	},
	addSet(state, { newSet, exerciseId }) {
		const exercise = state.sessionData.exercises.find(exercise => {
			return exercise.id === exerciseId;
		});
		exercise.sets.push(newSet);
	},
	deleteSet(state, { exerciseId, setId }) {
		const exercise = state.sessionData.exercises.find(exercise => {
			return exercise.id === exerciseId;
		});
		exercise.sets = exercise.sets.filter(set => {
			return set.id !== setId;
		});
	}
};
const actions = {
	SESSION_TRANSITION: (context, event) => {
		transition(sessionMachine, context, event);
	},
	DISPLAY_SESSION: async ({ commit }, { params }) => {
		commit("updateSessionData", params.session);
		router.push("/session/" + params.session._id);
	},
	EDIT_SESSION: async ({ commit }, { params }) => {
		if (params.newSession) {
			commit("updateSessionData", params.newSession);
			router.push("/new-session");
			return;
		}
		commit("updateSessionData", params.session);
		router.push("/session/" + session._id);
	},
	SAVE_SESSION: async ({ dispatch }, { params }) => {
		const token = localStorage.getItem("token");
		const query = {
			query: `
				mutation saveSession($sessionData: SessionInput!) {
					saveSession(sessionData: $sessionData) {
						_id
						createdAt
						updatedAt
						title
						sessionDate
						exercises {
							id
							name
							sets {
								id
								setQty
								repQty
								weight
							}
						}
						notes
						creator {
							name
						}
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
			const session = data.data.saveSession;
			dispatch("SESSION_TRANSITION", { type: "SUCCESS", params: { session } });
		} catch (err) {
			console.log(err);
			dispatch("SESSION_TRANSITION", { type: "ERROR", params: { error: err } });
		}
	},
	ADD_EXERCISE: ({ state, commit }) => {
		const id =
			state.sessionData.exercises.length > 0
				? state.sessionData.exercises[state.sessionData.exercises.length - 1].id + 1
				: 1;
		const setId = Number(`${id}1`);
		const newExercise = {
			id,
			name: "",
			sets: [
				{
					id: setId,
					setQty: 1,
					repQty: 1,
					weight: ""
				}
			]
		};
		commit("addExercise", newExercise);
	},
	REMOVE_EXERCISE: ({ commit }, exerciseId) => {
		commit("removeExercise", exerciseId);
	},
	ADD_SET: ({ commit }, exercise) => {
		const id = Number(`${exercise.id}${+exercise.sets[exercise.sets.length - 1].id.toString().split("")[1] + 1}`);
		const newSet = {
			id,
			setQty: 1,
			repQty: 1,
			weight: ""
		};
		const exerciseId = exercise.id;
		commit("addSet", { newSet, exerciseId });
	},
	DELETE_SET: ({ commit }, { exerciseId, setId }) => {
		commit("deleteSet", { exerciseId, setId });
	}
};

export default {
	state,
	mutations,
	actions
};
