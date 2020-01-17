<template>
	<div class="container">
		<div class="dashboard-ctn">
			<!-- Main menu -->
			<div class="dashboard-header">
				<!-- Logout btn -->
				<md-button
					@click.native="AUTH_TRANSITION({ type: 'LOGOUT' })"
					class="app__btn--small plain"
				>
					Logout
				</md-button>
				<p class="text-center">Started {{ user.createdAt }}</p>
			</div>
			<h1 class="text-center log-title">{{ user.name }}'s Log</h1>
			<!-- New session btn -->
			<md-button
				class="md-fab md-fab-bottom-center new-session-btn"
				aria-roledescription="Create new session"
				@click.native="SESSION_TRANSITION({ type: 'CREATE' })"
			>
				<md-icon>add</md-icon>
			</md-button>
			<!-- View current week btn -->
			<md-button class="app__btn info" @click.native="getCurrentWeek"
				>View Current Week</md-button
			>
			<!-- View last week btn -->
			<md-button class="app__btn info" @click.native="getLastWeek"
				>View Last Week</md-button
			>
			<!-- Search form -->
			<search-form />
		</div>
	</div>
</template>

<script>
// Vuex
import { mapState, mapActions, mapGetters } from "vuex";

// Components
import AppBtn from "../components/utils/AppBtn";
import SearchForm from "../components/DashboardPage/SearchForm";

export default {
	components: {
		AppBtn,
		SearchForm
	},
	data() {
		return {};
	},
	computed: {
		...mapState({
			user: state => state.auth.userData,
			sessionState: state => state.session.currentState,
			sessionData: state => state.session.sessionData
		}),
		...mapGetters(["currentWeekDates", "lastWeekDates"])
	},
	methods: {
		...mapActions([
			"AUTH_TRANSITION",
			"SESSION_TRANSITION",
			"SEARCH_TRANSITION",
			"APP_TRANSITION"
		]),
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
			this.SEARCH_TRANSITION({
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
			this.SEARCH_TRANSITION({
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
