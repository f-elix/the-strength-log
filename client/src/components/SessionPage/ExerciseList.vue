<template>
	<div class="exercise-list">
		<transition name="exercise">
			<div class="list__ctn" v-if="exercises && exercises.length">
				<!-- List header -->
				<div class="list__header">
					<div class="list__header--exercise">Exercise</div>
					<div class="list__header--sets">Set(s)</div>
					<div class="list__header--reps">Rep(s)/<br />Time</div>
					<div class="list__header--weigth">Weigth</div>
				</div>
				<!-- Exercises list (displaying) -->
				<list-displaying v-if="sessionState.matches('displaying')" />
				<!-- Exercises list (editing) -->
				<list-editing v-if="sessionState.matches('editing')" />
			</div>
		</transition>
		<!-- Add exercise btn -->
		<md-button
			class="app__btn action"
			@click.native="EDIT_TRANSITION({ type: 'ADD_EXERCISE' })"
			v-if="sessionState.matches('editing')"
			>Add Exercise</md-button
		>
	</div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import ListDisplaying from "./ListDisplaying";
import ListEditing from "./ListEditing";
import AppInput from "../utils/forms/AppInput";
import AppBtn from "../utils/AppBtn";

export default {
	components: {
		ListDisplaying,
		ListEditing,
		AppBtn,
		AppInput
	},
	computed: {
		...mapState({
			sessionState: state => state.session.currentState,
			exerciseState: state => state.editExercise.currentState,
			exercises: state => state.session.sessionData.exercises
		})
	},
	methods: {
		...mapActions(["EDIT_TRANSITION"])
	}
};
</script>

<style scoped>
.list__ctn,
.list__header {
	display: grid;
	grid-template-columns: 1fr repeat(3, 20%);
}

.list__ctn {
	grid-template-rows: 2.25rem repeat(autofit, 1.5rem);
	background-color: var(--color-darkgrey);
}

.list__header {
	grid-column: 1 / 5;
	grid-row: 1 / 2;
	align-items: center;
	padding: 0.25rem;
	color: var(--color-primary);
	background-color: var(--color-black);
	font-weight: bold;
	font-size: 1.25rem;
}

.list__header--exercise {
	grid-column: 1 / 2;
}

.list__header--sets {
	grid-column: 2 / 3;
}

.list__header--reps {
	grid-column: 3 / 4;
}

.list__header--weigth {
	grid-column: 4 / 5;
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