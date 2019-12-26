<template>
  <div class="session-container">
    <!-- Session header -->
    <div class="session-header">
      <!-- Button container -->
      <div
        class="btn-ctn btn-ctn--header"
        :class="{ 'btn-ctn--margin': state.matches('editing') }"
      >
        <app-btn
          color="dark"
          class="menu-btn"
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
        >
          Back to menu
        </app-btn>
        <app-btn
          class="back-to-search-btn"
          v-if="searchState.matches('success') && state.matches('displaying')"
          @click.native="backToSearch"
          @keypress.enter.native="backToSearch"
        >
          Back to results
        </app-btn>
      </div>
      <form-group
        class="date-input"
        id="date"
        name="date"
        type="date"
        labelText="Session Date"
        v-model="sessionData.sessionDate"
        v-if="state.matches('editing')"
      ></form-group>
      <form-group
        class="title-input"
        id="title"
        name="title"
        type="text"
        labelText="Session Title"
        v-model="sessionData.title"
        v-if="state.matches('editing')"
      ></form-group>
      <div class="date" v-if="state.matches('displaying')">
        {{ sessionData.sessionDate }}
      </div>
      <h1 class="title" v-if="state.matches('displaying')">
        {{ sessionData.title }}
      </h1>
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
    <div class="btn-ctn btn-ctn--footer">
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

.session-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
}

.btn-ctn {
  display: flex;
}

.btn-ctn * + * {
  margin-left: 1.5rem;
}

.btn-ctn--header {
  flex-basis: 60%;
}

.btn-ctn--margin {
  margin-bottom: 4.5rem;
}

.menu-btn,
.back-to-search-btn {
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 0;
  max-width: 50%;
}

.date {
  font-weight: bold;
  flex-basis: 40%;
  text-align: center;
}

.title {
  margin-left: auto;
  margin-right: auto;
}

.title-input {
  flex-basis: 100%;
}

.date-input {
  max-width: 35%;
}

.session-notes {
  margin: auto 0.75rem 0.75rem;
}

.btn-ctn--footer {
  padding: 0.75rem;
}
</style>
