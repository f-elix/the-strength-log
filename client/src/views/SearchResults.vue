<template>
	<div class="search-ctn">
		<md-button class="app__btn--small plain" @click="onBackToMenu">
			Back to menu
		</md-button>
		<!-- Spinner -->
		<spinner v-show="searchState.matches('fetching')" class="spinner" />
		<!-- Not found message -->
		<transition name="loaded">
			<h2 v-if="searchState.matches('error')" class="no-results-text">
				No results found.
			</h2>
		</transition>
		<transition-group name="loaded">
			<!-- Search header -->
			<div
				v-if="searchState.matches('success')"
				class="search-header"
				key="header"
			>
				<div v-if="currentQuery === 'getSessionsByDate'">
					<p>
						All sessions on <span>{{ searchParams.date }}</span>
					</p>
				</div>
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
			<search-result
				v-if="searchState.matches('success')"
				key="results"
			/>
		</transition-group>
	</div>
</template>

<script>
// fsm
import { searchMachine } from "../fsm/search";

// Components
import SearchResult from "../components/SearchPage/SearchResult";
import Spinner from "../components/utils/Spinner";

export default {
	components: {
		SearchResult,
		Spinner
	},
	computed: {
		searchState() {
			return searchMachine.current;
		},
		sessions() {
			return searchMachine.context.sessions;
		},
		searchParams() {
			return searchMachine.context.searchParams;
		},
		currentQuery() {
			return searchMachine.context.currentQuery;
		}
	},
	methods: {
		onBackToMenu() {
			searchMachine.send({ type: "BACK_TO_MENU" });
		}
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
	color: var(--color-greyedout);
}

.search-header__param {
	color: var(--color-primary);
}

.spinner {
	display: block;
	margin: 12rem auto 0;
}

.no-results-text {
	margin-top: 20rem;
	text-align: center;
	font-size: 2.25rem;
	color: var(--color-greyedout);
}
</style>