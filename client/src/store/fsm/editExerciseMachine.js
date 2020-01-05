import { Machine } from "xstate";

const editExerciseMachine = Machine({
	id: "EditExerciseMachine",
	initial: "editing",
	states: {
		editing: {
			on: {
				ADD_EXERCISE: {
					actions: ["ADD_EXERCISE"]
				},
				DELETE_EXERCISE: {
					actions: ["DELETE_EXERCISE"]
				},
				ADD_MOVEMENT: {
					actions: ["ADD_MOVEMENT"]
				},
				DELETE_MOVEMENT: {
					actions: ["DELETE_MOVEMENT"]
				},
				ADD_SET: {
					actions: ["ADD_SET"]
				},
				DELETE_SET: {
					actions: ["DELETE_SET"]
				},
				DRAG: "dragging"
			}
		},
		dragging: {
			on: {
				DROP: "editing"
			}
		}
	}
});

export default editExerciseMachine;
