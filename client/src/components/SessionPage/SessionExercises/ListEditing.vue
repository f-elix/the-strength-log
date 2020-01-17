<template>
	<draggable
		class="list__row--editing"
		tag="ul"
		v-model="exercises"
		v-bind="dragOptions"
		@start="EDIT_TRANSITION({ type: 'DRAG' })"
		@end="drag = EDIT_TRANSITION({ type: 'DROP' })"
	>
		<transition-group
			:name="!exerciseState.matches('dragging') ? 'exercise' : null"
			mode="out-in"
			tag="div"
			class="list__row--editing"
		>
			<exercise-editing
				v-for="exercise in exercises"
				:key="exercise.id"
				:exercise="exercise"
			/>
		</transition-group>
	</draggable>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import ExerciseEditing from "./ExerciseEditing";
import draggable from "vuedraggable";

export default {
	components: {
		ExerciseEditing,
		draggable
	},
	computed: {
		...mapState({
			exerciseState: state => state.editExercise.currentState
		}),
		exercises: {
			get() {
				return this.$store.state.session.sessionData.exercises;
			},
			set(value) {
				this.$store.commit("updateExercises", value);
			}
		},
		dragOptions() {
			return {
				animation: 200,
				handle: ".list__handle",
				ghostClass: "ghost",
				dragClass: "dragging"
			};
		}
	},
	methods: {
		...mapActions(["EDIT_TRANSITION"])
	}
};
</script>

<style scoped>
.list__row--editing {
	grid-column: 1 / 5;
	margin: 0;
}

.ghost {
	opacity: 0.4;
}

.dragging {
	opacity: 1;
	border-color: var(--color-primary);
}

/* Vue transitions */
.exercise-enter {
	opacity: 0;
	transform: translateY(3rem);
}

.exercise-leave-to {
	opacity: 0;
	transform: translateX(10rem);
}

.exercise-enter-active {
	transition: opacity 0.3s, transform 0.3s;
}

.exercise-leave-active {
	position: absolute;
	transition: opacity 0.2s, transform 0.2s;
}

.exercise-move {
	transition: transform 0.4s;
}
</style>