<template>
	<div class="session-container">
		<!-- Button container -->
		<div class="btn-ctn" v-if="sessionState.matches('displaying')">
			<!-- back to menu btn -->
			<md-button
				class="app__btn--small plain menu-btn"
				@click.native="
					SESSION_TRANSITION({
						type: 'BACK_TO_DASHBOARD',
						params: { sessionData }
					})
				"
			>
				Back to menu
			</md-button>
			<!-- back to search btn -->
			<md-button
				class="app__btn--small plain-light back-to-search-btn"
				v-if="searchState.matches('success')"
				@click.native="SESSION_TRANSITION({ type: 'BACK_TO_SEARCH' })"
			>
				Back to results
			</md-button>
			<!-- Current session btn -->
			<md-button
				class="app__btn--small info-light"
				v-if="
					dashboardState.matches('hasCurrentSession') &&
						sessionData._id !== currentSession._id
				"
				@click="
					SESSION_TRANSITION({
						type: 'DISPLAY',
						params: { sessionId: currentSession._id }
					})
				"
				>Current Session</md-button
			>
		</div>
		<!-- Session Header -->
		<session-header />
		<!-- Session exercise list -->
		<exercise-list />
		<!-- Session notes -->
		<session-notes />
		<!-- Session btns -->
		<session-btns />
	</div>
</template>

<script>
// Vuex
import { mapActions, mapState } from "vuex";

// Components
import SessionHeader from "../components/SessionPage/SessionHeader";
import ExerciseList from "../components/SessionPage/SessionExercises/ExerciseList";
import SessionNotes from "../components/SessionPage/SessionNotes";
import SessionBtns from "../components/SessionPage/SessionBtns";

export default {
	components: {
		SessionHeader,
		ExerciseList,
		SessionNotes,
		SessionBtns
	},

	computed: {
		...mapState({
			sessionState: state => state.session.currentState,
			sessionData: state => state.session.sessionData,
			searchState: state => state.search.currentState,
			dashboardState: state => state.dashboard.currentState,
			currentSession: state => state.dashboard.currentSession
		})
	},
	methods: {
		...mapActions(["SESSION_TRANSITION"])
	}
};
</script>

<style scoped>
.session-container {
	width: 100%;
	max-width: 32rem;
	min-height: 100vh;
	margin: 0 auto;
	padding: 1.5rem 0;
	display: flex;
	flex-direction: column;
}

.btn-ctn {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
