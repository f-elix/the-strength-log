<template>
	<div class="search-ctn">
		<md-button
			class="app__btn--small plain"
			@click.native="SEARCH_TRANSITION({ type: 'DISCARD' })"
		>
			Back to menu
		</md-button>
		<!-- Search header -->
		<div class="search-header">
			<div v-if="currentQuery === 'getSessionsFromTo'">
				<p>All sessions</p>
				<div class="search-header__dates">
					<p>
						From<br /><span class="search-header__param">{{
							searchParams.dates.fromDate
						}}</span>
					</p>
					<p>
						To<br /><span class="search-header__param">{{
							searchParams.dates.toDate
						}}</span>
					</p>
				</div>
			</div>
			<div v-if="currentQuery === 'getSessionsByTitle'">
				<p>
					All sessions with title containing
					<span>"{{ searchParams.sessionName }}"</span>
				</p>
			</div>
		</div>
		<!-- Search results -->
		<h2 v-if="!sessions.length" class="no-results-text">
			No results found.
		</h2>
		<search-result></search-result>
	</div>
</template>

<script>
// Vuex
import { mapState, mapActions, mapGetters } from "vuex";

// Components
import SearchResult from "../components/SearchPage/SearchResult";
import AppBtn from "../components/utils/AppBtn";

export default {
	components: {
		SearchResult,
		AppBtn
	},
	computed: {
		...mapState({
			sessions: state => state.search.sessions,
			searchParams: state => state.search.searchParams,
			currentQuery: state => state.search.currentQuery
		}),
		...mapGetters(["currentWeekDates"])
	},
	methods: {
		...mapActions(["SEARCH_TRANSITION"])
	}
};
</script>

<style scoped>
.search-ctn {
	width: 100%;
	max-width: 32rem;
	margin: 0 auto;
	padding: 0.75rem;
}

.menu-btn {
	font-size: 1rem;
	font-weight: bold;
	padding: 0.5rem 0;
	max-width: 25%;
}

.search-header {
	margin: 1.5rem auto;
	padding: 0 1.5rem;
	text-align: center;
	font-weight: bold;
	font-size: 1.25rem;
}

.search-header * {
	margin: 0;
}

.search-header__dates {
	display: flex;
	justify-content: space-evenly;
	color: var(--color-lightblue);
}

.search-header__param {
	color: var(--color-primary);
}

.no-results-text {
	margin-top: 20rem;
	text-align: center;
	font-size: 2.25rem;
	color: var(--color-darkgrey);
}
</style>