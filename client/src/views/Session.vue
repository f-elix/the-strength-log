<template>
  <div class="session-container">
    <div class="session-header">
      <div class="date">{{ sessionDate }}</div>
      <h1 class="title">{{ sessionTitle }}</h1>
    </div>
    <exercise-list :exercises="current.context.exerciseList"></exercise-list>
    <new-exercise v-if="current.matches('editing')"></new-exercise>
    <div class="btn-ctn">
      <app-btn isDarkBlue>Save Session</app-btn>
      <app-btn isRed>Discard</app-btn>
    </div>
  </div>
</template>

<script>
// Components
import ExerciseList from "../components/SessionPage/ExerciseList";
import NewExercise from "../components/SessionPage/NewExercise";
import AppBtn from "../components/utils/AppBtn";

export default {
  components: {
    ExerciseList,
    NewExercise,
    AppBtn
  },
  data() {
    return {
      sessionTitle: "Session Title"
    };
  },
  computed: {
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  color: #111;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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
