<template>
	<ul class="list__displaying">
		<exercise-displaying
			v-for="exercise in exercises"
			:key="exercise.id"
			:exercise="exercise"
		/>
	</ul>
</template>

<script>
// Vuex
import { mapState } from "vuex";

// Components
import ExerciseDisplaying from "./ExerciseDisplaying";

export default {
	components: {
		ExerciseDisplaying
	},
	computed: {
		...mapState({
			exercises: state => state.session.sessionData.exercises
		})
	}
};
</script>

<style scoped>
.list__displaying {
	grid-column: 1 / 5;
	margin: 0;
}
</style>