<template>
  <div class="results">
    <ul>
      <li v-for="session in sessions" :key="session._id">
        <div
          class="session"
          @click="SESSION_TRANSITION({ type: 'DISPLAY', params: { session } })"
          @keypress.enter="
            SESSION_TRANSITION({ type: 'DISPLAY', params: { session } })
          "
        >
          <div class="session-info">
            <span>{{ session.sessionDate }}</span>
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
    ...mapActions(["SESSION_TRANSITION"])
  }
};
</script>

<style scoped>
.results ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.results ul li + li {
  margin-top: 1.5rem;
}

.session {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.session-info {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1.5rem 0.75rem;
  background-color: var(--color-secondary);
  border-radius: var(--default-radius);
  box-shadow: 0 2px 3px 1px var(--color-primary);
  font-weight: bold;
  font-size: 1.5rem;
}

.session-info:hover {
  background-color: var(--color-darkgrey);
}

.session-info:active {
  box-shadow: inset 0 1px 3px 1px var(--color-primary);
}
</style>