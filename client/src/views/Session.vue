<template>
  <div class="session-container">
    <!-- Button container -->
    <div class="btn-ctn">
      <button
        class="menu-btn"
        @click="
          SESSION_TRANSITION({
            type: 'DISCARD',
            params: { sessionData }
          })
        "
        @keypress.enter="
          SESSION_TRANSITION({
            type: 'DISCARD',
            params: { sessionData }
          })
        "
      >
        Back to menu
      </button>
      <button
        class="back-to-search-btn"
        v-if="searchState.matches('success')"
        @click="backToSearch"
        @keypress.enter="backToSearch"
      >
        Back to results
      </button>
    </div>
    <!-- Session header -->
    <div class="session-header">
      <form-group
        class="title-input"
        id="title"
        name="title"
        type="text"
        labelText="Session Title"
        v-model="sessionData.title"
      ></form-group>
      <form-group
        class="date-input"
        id="date"
        name="date"
        type="date"
        labelText="Session Date"
        v-model="sessionData.sessionDate"
      ></form-group>
    </div>
    <!-- Session exercise list -->
    <exercise-list></exercise-list>
    <!-- Session notes -->
    <app-text-area
      class="session-notes"
      name="notes"
      id="notes"
      cols="30"
      rows="4"
      labelText="Notes:"
      :disabled="state.matches('displaying')"
      v-model="sessionData.notes"
    ></app-text-area>
    <!-- Session btns -->
    <div class="btn-ctn">
      <app-btn
        color="green"
        type="button"
        v-if="state.matches('editing')"
        @click.native="
          SESSION_TRANSITION({ type: 'SAVE', params: { sessionData } })
        "
        @keypress.enter.native="
          SESSION_TRANSITION({ type: 'SAVE', params: { sessionData } })
        "
      >
        Save Session</app-btn
      >
      <app-btn
        color="dark-blue"
        type="button"
        v-if="state.matches('displaying')"
        @click.native="
          SESSION_TRANSITION({ type: 'EDIT', params: { sessionData } })
        "
        @keypress.enter.native="
          SESSION_TRANSITION({ type: 'EDIT', params: { sessionData } })
        "
      >
        Edit Session</app-btn
      >
      <app-btn
        color="red"
        v-if="state.matches('editing')"
        @click.native="
          SESSION_TRANSITION({
            type: 'DISCARD',
            params: { sessionData }
          })
        "
        @keypress.enter.native="
          SESSION_TRANSITION({
            type: 'DISCARD',
            params: { sessionData }
          })
        "
        >Discard</app-btn
      >
      <app-btn
        color="red"
        v-if="state.matches('displaying')"
        @click.native="
          SESSION_TRANSITION({ type: 'DELETE', params: { sessionData } })
        "
        @keypress.enter.native="
          SESSION_TRANSITION({ type: 'DELETE', params: { sessionData } })
        "
        >Delete</app-btn
      >
    </div>
  </div>
</template>

<script>
// Vuex
import { mapActions, mapState } from "vuex";

// Components
import ExerciseList from "../components/SessionPage/ExerciseList";
import AppBtn from "../components/utils/AppBtn";
import FormGroup from "../components/utils/forms/FormGroup";
import AppTextArea from "../components/utils/forms/AppTextArea";

export default {
  components: {
    ExerciseList,
    AppBtn,
    FormGroup,
    AppTextArea
  },
  data() {
    return {
      sessionTitle: "Session Title"
    };
  },
  computed: {
    ...mapState({
      state: state => state.session.currentState,
      searchState: state => state.search.currentState,
      sessionData: state => state.session.sessionData
    })
  },
  methods: {
    ...mapActions(["SESSION_TRANSITION"]),
    backToSearch() {
      this.$router.push("/search-results");
      this.SESSION_TRANSITION({ type: "DISCARD" });
    }
  }
};
</script>

<style scoped>
.session-container {
  width: 100%;
  max-width: 32rem;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  color: #111;
}

.btn-ctn {
  display: flex;
}

.btn-ctn * + * {
  margin-left: 1.5rem;
}

.menu-btn,
.back-to-search-btn {
  border-radius: var(--default-radius);
  border: 2px solid var(--color-primary);
  font-weight: bold;
}

.menu-btn {
  max-width: 25%;
  background-color: var(--color-primary);
  color: var(--color-secondary);
}

.back-to-search-btn {
  max-width: 40%;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.75rem;
}

.session-header .date {
  padding: 0.75rem;
  font-weight: bold;
  border: 2px solid #111;
}

.session-header .title {
  margin: 0;
}

.title-input {
  flex-basis: 60%;
}

.date-input {
  max-width: 35%;
}

.session-notes {
  margin-top: auto;
}

.session-notes__display {
  border: 2px solid var(--color-primary);
}

.btn-ctn {
  padding: 0.75rem 0;
}

.btn-ctn button {
  margin-bottom: 1.5rem;
}
</style>
