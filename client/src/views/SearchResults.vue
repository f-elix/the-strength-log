<template>
  <div class="search-ctn">
    <button
      class="menu-btn"
      @click="SEARCH_TRANSITION({ type: 'DISCARD' })"
      @keypress.enter="SEARCH_TRANSITION({ type: 'DISCARD' })"
    >
      Back to menu
    </button>
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
    <search-result></search-result>
  </div>
</template>

<script>
// Vuex
import { mapState, mapActions, mapGetters } from "vuex";

// Components
import SearchResult from "../components/SearchPage/SearchResult";

export default {
  components: {
    SearchResult
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
  padding: 0 0.75rem;
}

.menu-btn {
  display: block;
  max-width: 25%;
  margin: 1.5rem 0;
  border-radius: var(--default-radius);
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border: 2px solid var(--color-primary);
  font-weight: bold;
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
</style>