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
      <div class="search-header__dates">
        <span>Monday {{ currentWeekDates.monday }}</span>
        <span>&mdash;</span>
        <span>Sunday {{ currentWeekDates.sunday }}</span>
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
      sessions: state => state.search.sessions
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
}

.search-header__dates {
  display: flex;
  justify-content: space-evenly;
  font-weight: bold;
  font-size: 1.25rem;
}
</style>