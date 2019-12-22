<template>
  <div class="session-container">
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
    <!-- Session btns -->
    <div class="btn-ctn">
      <app-btn isDarkBlue>Save Session</app-btn>
      <app-btn isRed>Discard</app-btn>
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

export default {
  components: {
    ExerciseList,
    AppBtn,
    FormGroup
  },
  data() {
    return {
      sessionTitle: "Session Title"
    };
  },
  computed: {
    ...mapState({
      state: state => state.session.currentState,
      sessionData: state => state.session.sessionData
    })
  },
  methods: {
    ...mapActions(["SESSION_TRANSITION"])
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
  max-width: 25%;
}
.btn-ctn {
  margin-top: auto;
  padding: 0.75rem;
}

.btn-ctn button {
  margin-bottom: 1.5rem;
}
</style>
