<template>
  <div class="search-ctn">
    <!-- Search header -->
    <div class="search-header">
      <div class="search-header__dates">
        <span>Monday 2019-12-23</span>
        <span>&mdash;</span>
        <span>Sunday 2019-12-29</span>
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
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      sessions: state => state.search.sessions
    })
  }
};
</script>

<style scoped>
.serach-ctn {
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 0.75rem;
}

.serach-header {
  margin: 1.5rem auto;
  padding: 0 1.5rem;
  text-align: center;
}

.serach-header__dates {
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