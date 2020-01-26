<template>
	<div class="session-container">
		<!-- Button container -->
		<div class="btn-ctn" v-if="sessionState.matches('displaying')">
			<!-- back to menu btn -->
			<md-button
				class="app__btn--small plain menu-btn"
				@click="onBackToMenu"
			>
				Back to menu
			</md-button>
			<!-- back to search btn -->
			<md-button
				class="app__btn--small plain-light back-to-search-btn"
				v-if="searchState.matches('success')"
				@click="onBackToSearch"
			>
				Back to results
			</md-button>
			<!-- Current session btn -->
			<md-button
				class="app__btn--small info-light"
				v-if="currentSession && sessionData._id !== currentSession._id"
				@click="onViewCurrentSession"
				>Current Session</md-button
			>
		</div>
		<!-- Spinner -->
		<spinner v-if="sessionState.matches('loading')" class="spinner" />
		<!-- Session -->
		<transition name="loaded">
			<div>
				<!-- Session Header -->
				<session-header />
				<!-- Session exercise list -->
				<exercise-list />
				<!-- Session notes -->
				<session-notes />
				<!-- Session btns -->
				<session-btns />
			</div>
		</transition>
	</div>
</template>

<script>
// fsm
import { sessionMachine } from "../fsm/session";
import { searchMachine } from "../fsm/search";

// Components
import SessionHeader from "../components/SessionPage/SessionHeader";
import ExerciseList from "../components/SessionPage/SessionExercises/ExerciseList";
import SessionNotes from "../components/SessionPage/SessionNotes";
import SessionBtns from "../components/SessionPage/SessionBtns";
import Spinner from "../components/utils/Spinner";

export default {
	components: {
		SessionHeader,
		ExerciseList,
		SessionNotes,
		SessionBtns,
		Spinner
	},

	computed: {
		sessionState() {
			return sessionMachine.current;
		},
		sessionData() {
			return sessionMachine.context.sessionData;
		},
		currentSession() {
			return sessionMachine.context.currentSession;
		},
		searchState() {
			return searchMachine.current;
		}
	},
	methods: {
		onBackToMenu() {
			sessionMachine.send({ type: "BACK_TO_DASHBOARD" });
		},
		onBackToSearch() {
			sessionMachine.send({ type: "BACK_TO_SEARCH" });
		},
		onViewCurrentSession() {
			sessionMachine.send({
				type: "DISPLAY",
				params: { sessionId: this.currentSession._id }
			});
		}
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

.spinner {
	display: block;
	margin: 18rem auto 0;
}
</style>
