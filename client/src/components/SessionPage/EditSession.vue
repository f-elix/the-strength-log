<template>
  <div class="session-container">
    <div class="session-header">
      <form-group
        id="date"
        name="date"
        type="date"
        labelText="Session Date"
        v-model="sessionData.sessionDate"
      ></form-group>
      <form-group
        id="title"
        name="title"
        type="text"
        labelText="Session Title"
        v-model="sessionData.title"
      ></form-group>
    </div>
    <exercise-list></exercise-list>
    <new-exercise></new-exercise>
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
import ExerciseList from "./ExerciseList";
import NewExercise from "./NewExercise";
import AppBtn from "../utils/AppBtn";
import FormGroup from "../utils/forms/FormGroup";

export default {
  components: {
    ExerciseList,
    NewExercise,
    AppBtn,
    FormGroup
  },
  computed: {
    ...mapState({
      state: state => state.session.currentState,
      sessionData: state => state.session.sessionData
    }),
    sessionDate() {
      const date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
  justify-content: space-between;
  align-items: center;
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

.btn-ctn {
  margin-top: auto;
  padding: 0.75rem;
}

.btn-ctn button {
  margin-bottom: 1.5rem;
}
</style>