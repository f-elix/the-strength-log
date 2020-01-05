import editExerciseMachine from "../fsm/editExerciseMachine";
import transition from "../transition";

const state = {
	currentState: editExerciseMachine.initialState
};

const mutations = {
	updateEditExerciseMachineState(state, nextState) {
		state.currentState = nextState;
	}
};

const actions = {
	EDIT_TRANSITION: (context, event) => {
		transition(editExerciseMachine, context, event);
	},
	ADD_EXERCISE: ({ rootState, commit }) => {
		const exerciseId =
			rootState.session.sessionData.exercises.length > 0
				? rootState.session.sessionData.exercises[rootState.session.sessionData.exercises.length - 1].id + 1
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
	DELETE_EXERCISE: ({ commit }, { params }) => {
		commit("deleteExercise", params.exerciseId);
	},
	ADD_MOVEMENT: ({ rootState, commit }, { params }) => {
		const exercise = params.exercise;
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
		const exerciseIndex = rootState.session.sessionData.exercises.indexOf(exercise);
		commit("addMovement", { exerciseIndex, newMovement });
	},
	DELETE_MOVEMENT: ({ rootState, commit }, { params }) => {
		const { exercise, movement } = params;
		const exerciseIndex = rootState.session.sessionData.exercises.indexOf(exercise);
		const movementId = movement.id;
		commit("deleteMovement", { exerciseIndex, movementId });
	},
	ADD_SET: ({ rootState, commit }, { params }) => {
		const { exercise, movement } = params;
		const setSubId = Number(movement.sets[movement.sets.length - 1].id.toString().split("")[2]) + 1;
		const id = Number(`${movement.id}${setSubId}`);
		const newSet = {
			id,
			setQty: 1,
			repsOrTime: "1",
			weight: ""
		};
		const movementIndex = exercise.movements.indexOf(movement);
		const exerciseIndex = rootState.session.sessionData.exercises.indexOf(exercise);
		commit("addSet", { newSet, exerciseIndex, movementIndex });
	},
	DELETE_SET: ({ rootState, commit }, { params }) => {
		const { movement, exercise, setId } = params;
		const movementIndex = exercise.movements.indexOf(movement);
		const exerciseIndex = rootState.session.sessionData.exercises.indexOf(exercise);
		commit("deleteSet", { exerciseIndex, movementIndex, setId });
	}
};

export default {
	state,
	mutations,
	actions
};
