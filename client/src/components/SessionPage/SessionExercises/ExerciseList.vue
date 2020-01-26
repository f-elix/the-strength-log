<template>
	<div>
		<transition name="exercise">
			<list-displaying
				v-if="sessionState.matches('displaying')"
			></list-displaying>
			<list-editing v-if="sessionState.matches('editing')"></list-editing>
		</transition>
		<!-- Add exercise btn -->
		<md-button
			class="app__btn action-light"
			@click="onAddExercise"
			v-if="sessionState.matches('editing')"
		>
			<md-icon aria-hidden="true" focusable="false">add</md-icon>Add
			Exercise</md-button
		>
	</div>
</template>

<script>
// fsm
import { sessionMachine } from "@/fsm/session";

// Components
import ListDisplaying from "./ListDisplaying";
import ListEditing from "./ListEditing";

export default {
	components: {
		ListDisplaying,
		ListEditing
	},
	computed: {
		sessionState() {
			return sessionMachine.current;
		},
		exercises() {
			return sessionMachine.context.sessionData.exercises;
		}
	},
	methods: {
		onAddExercise() {
			sessionMachine.send({ type: "ADD_EXERCISE" });
		}
	}
};
</script>

<style scoped>
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