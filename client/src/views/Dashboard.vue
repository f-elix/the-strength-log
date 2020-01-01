<template>
	<div class="container">
		<div class="dashboard-ctn">
			<!-- Main menu -->
			<div class="dashboard-header">
				<!-- Logout btn -->
				<app-btn
					@click.native="AUTH_TRANSITION({ type: 'LOGOUT' })"
					color="dark"
					class="logout-btn"
				>
					Logout
				</app-btn>
				<p class="text-center">Started {{ user.createdAt }}</p>
			</div>
			<h1 class="text-center log-title">{{ user.name }}'s Log</h1>
			<!-- New session btn -->
			<app-btn
				color="dark-blue"
				class="new-session-btn"
				aria-roledescription="Create new session"
				@click.native="goToSession"
				v-if="!sessionState.matches('editing')"
			>
				<span class="add-icon"></span>
			</app-btn>
			<!-- View current week btn -->
			<app-btn class="app-btn" @click.native="getCurrentWeek"
				>View Current Week</app-btn
			>
			<!-- Search by date form -->
			<search-by-date-form />
			<!-- Search by session name form -->
			<search-by-name-form />
		</div>
	</div>
</template>

<script>
// Vuex
import { mapState, mapActions, mapGetters } from "vuex";

// Components
import AppBtn from "../components/utils/AppBtn";
import SearchByDateForm from "../components/DashboardPage/SearchByDateForm";
import SearchByNameForm from "../components/DashboardPage/SearchByNameForm";

export default {
	components: {
		AppBtn,
		SearchByDateForm,
		SearchByNameForm
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
		...mapGetters(["currentWeekDates"])
	},
	methods: {
		...mapActions([
			"AUTH_TRANSITION",
			"SESSION_TRANSITION",
			"SEARCH_TRANSITION",
			"DASHBOARD_TRANSITION"
		]),
		goToSession() {
			if (this.sessionState.matches("editing")) {
				this.DASHBOARD_TRANSITION({
					type: "SESSION",
					params: { sessionData: this.sessionData }
				});
			} else {
				this.SESSION_TRANSITION({ type: "CREATE" });
			}
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
			this.SEARCH_TRANSITION({
				type: "SEARCH",
				params: { query, queryName: "getSessionsFromTo" }
			});
		}
	},
	mounted() {
		this.DASHBOARD_TRANSITION({ type: "MOUNTED" });
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

.logout-btn {
	max-width: 20%;
	font-size: 1rem;
}

.log-title {
	margin: 0;
}

.new-session-btn {
	position: fixed;
	bottom: 5%;
	right: 5%;
	width: 4.5rem;
	height: 4.5rem;
	border-radius: 50%;
	border: none;
	box-shadow: 2px 4px 8px var(--color-primary);
}

.add-icon {
	position: relative;
	display: block;
	width: 100%;
}

.add-icon::before,
.add-icon::after {
	content: "";
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 60%;
	height: 4px;
	border-radius: var(--default-radius);
	background-color: var(--color-secondary);
}

.add-icon::before {
	transform: translate(-50%, -50%) rotate(90deg);
}

.app-btn {
	margin: 1.5rem auto;
}
</style>
