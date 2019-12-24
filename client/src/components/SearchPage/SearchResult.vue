<template>
  <div class="results">
    <ul>
      <li v-for="session in sessions" :key="session._id">
        <p>{{ session.sessionDate }}</p>
        <div
          class="day-sessions"
          @click="displaySession(session)"
          @keypress.enter="displaySession(session)"
        >
          <div class="session-info">
            <span>{{ session.title }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      sessions: state => state.search.sessions
    })
  },
  methods: {
    ...mapActions(["SESSION_TRANSITION"]),
    displaySession(session) {
      this.SESSION_TRANSITION({ type: "DISPLAY", params: { session } });
    }
  }
};
</script>

<style scoped>
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