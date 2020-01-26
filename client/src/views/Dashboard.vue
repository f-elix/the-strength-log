<template>
	<div class="container">
		<spinner v-if="sessionState.matches('init')" class="spinner" />
		<div v-else class="dashboard-ctn">
			<!-- Main menu -->
			<div class="dashboard-header">
				<!-- Logout btn -->
				<md-button @click="onLogout" class="app__btn--small plain">
					Logout
				</md-button>
				<p class="text-center">Started {{ user.createdAt }}</p>
			</div>
			<h1 class="text-center log-title">{{ user.name }}'s Log</h1>
			<!-- Current session btn -->
			<md-button
				class="app__btn info-light"
				v-if="currentSession"
				@click="onViewCurrentSession"
				>View Current Session</md-button
			>
			<!-- New session btn -->
			<md-button
				class="md-fab md-fab-bottom-right new-session-btn"
				aria-roledescription="Create new session"
				@click="onCreateSession"
			>
				<md-icon>add</md-icon>
			</md-button>
			<!-- View current week btn -->
			<md-button class="app__btn info" @click="getCurrentWeek"
				>View Current Week</md-button
			>
			<!-- View last week btn -->
			<md-button class="app__btn info" @click="getLastWeek"
				>View Last Week</md-button
			>
			<!-- Search form -->
			<search-form />
		</div>
	</div>
</template>

<script>
// fsm
import { authMachine } from "../fsm/auth";
import { searchMachine } from "../fsm/search";
import { sessionMachine } from "../fsm/session";

// Components
import SearchForm from "../components/DashboardPage/SearchForm";
import Spinner from "../components/utils/Spinner";

export default {
	components: {
		SearchForm,
		Spinner
	},
	computed: {
		currentWeekDates() {
			let date = new Date();
			const monday = date.setDate(
				date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
			);
			date = new Date();
			const sunday = date.setDate(
				date.getDate() - date.getDay() + (date.getDay() === 0 ? 0 : 7)
			);
			return {
				monday: new Date(monday).toISOString().split("T")[0],
				sunday: new Date(sunday).toISOString().split("T")[0]
			};
		},
		lastWeekDates() {
			let date = new Date();
			const monday = date.setDate(
				date.getDate() -
					date.getDay() +
					(date.getDay() === 0 ? -6 : 1) -
					7
			);
			date = new Date();
			const sunday = date.setDate(
				date.getDate() -
					date.getDay() +
					(date.getDay() === 0 ? 0 : 7) -
					7
			);
			return {
				monday: new Date(monday).toISOString().split("T")[0],
				sunday: new Date(sunday).toISOString().split("T")[0]
			};
		},
		user() {
			return authMachine.context.userData;
		},
		sessionState() {
			return sessionMachine.current;
		},
		sessionData() {
			return sessionMachine.context.sessionData;
		},
		currentSession() {
			return sessionMachine.context.currentSession;
		}
	},
	methods: {
		onViewCurrentSession() {
			sessionMachine.send({
				type: "DISPLAY",
				params: { sessionId: this.currentSession._id }
			});
		},
		onCreateSession() {
			sessionMachine.send({ type: "CREATE" });
		},
		onLogout() {
			authMachine.send({ type: "LOGOUT" });
		},
		getCurrentWeek() {
			const query = {
				query: `
					query getCurrentWeek($fromDate: Date!, $toDate: Date!) {
						getSessionsFromTo(fromDate: $fromDate, toDate: $toDate) {
							_id
							title
							sessionDate
						}
					}
				`,
				variables: {
					fromDate: this.currentWeekDates.monday,
					toDate: this.currentWeekDates.sunday
				}
			};
			searchMachine.send({
				type: "SEARCH",
				params: { query, queryName: "getSessionsFromTo" }
			});
		},
		getLastWeek() {
			const query = {
				query: `
					query getLastWeek($fromDate: Date!, $toDate: Date!) {
						getSessionsFromTo(fromDate: $fromDate, toDate: $toDate) {
							_id
							title
							sessionDate
						}
					}
				`,
				variables: {
					fromDate: this.lastWeekDates.monday,
					toDate: this.lastWeekDates.sunday
				}
			};
			searchMachine.send({
				type: "SEARCH",
				params: { query, queryName: "getSessionsFromTo" }
			});
		}
	}
};
</script>

<style scoped>
.container {
	min-height: 100vh;
	padding: 1.5rem;
	background-color: var(--color-secondary);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.spinner {
	display: block;
	margin: 18rem auto 0;
}

.dashboard-ctn {
	width: 100%;
	max-width: 32rem;
}

.dashboard-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 3rem;
	font-weight: bold;
}

.log-title {
	margin: 0;
}

.new-session-btn {
	background-color: var(--color-action) !important;
}

.app-btn {
	margin: 1.5rem auto;
}
</style>
