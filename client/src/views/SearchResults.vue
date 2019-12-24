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
    <div class="results">
      <ul>
        <li v-for="session in sessions" :key="session._id">
          <p>{{ session.sessionDate }}</p>
          <div class="day-sessions">
            <div class="session-info">
              <span>{{ session.title }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Vuex
import { mapState, mapActions, mapGetters } from "vuex";

export default {
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

.results ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.results ul li {
  padding: 0.75rem;
  background-color: var(--color-lightgrey);
  border-radius: var(--default-radius);
  font-weight: bold;
  cursor: pointer;
}

.results ul li + li {
  margin-top: 1.5rem;
}

.day-sessions {
  display: flex;
  flex-direction: column;
  height: 6rem;
}

.session-info {
  flex-basis: 50%;
  flex-grow: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.75rem;
  background-color: var(--color-secondary);
  border-radius: var(--default-radius);
  box-shadow: 0 1px 3px 1px var(--color-primary);
}

.session-info:hover {
  background-color: var(--color-darkgrey);
}

.session-info:active {
  box-shadow: inset 0 1px 3px 1px var(--color-primary);
}
</style>