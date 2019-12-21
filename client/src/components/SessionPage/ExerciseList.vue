<template>
  <div class="session">
    <div class="exercise-list">
      <div class="exercise-list__header exercise-list__row">
        <span class="row__name">Exercise</span>
        <div class="row__sets">
          <div class="set">
            <span>Set(s)</span>
            <span>Rep(s)</span>
            <span class="weigth">Weigth</span>
          </div>
        </div>
      </div>

      <div
        class="exercise-list__row"
        v-for="exercise in exercises"
        :key="exercise.name"
      >
        <div class="row__name">{{ exercise.name }}</div>
        <div class="row__sets">
          <div class="set" v-for="set in exercise.sets" :key="set.id">
            <span> {{ set.qty }} </span>
            <span> {{ set.reps }} </span>
            <span class="weigth"> {{ set.weigth }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Vuex
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      exercises: state => state.session.sessionData.exercises
    })
  }
};
</script>

<style scoped>
.exercise-list {
  margin-bottom: 1.5rem;
}

.exercise-list__header {
  background-color: #111;
  color: #f8f8f8;
  font-weight: bold;
}

.exercise-list__row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
}

.exercise-list__row:nth-of-type(even) {
  background-color: lightgrey;
}

.exercise-list__row .row__name {
  width: 9rem;
  padding: 0.25rem;
}

.exercise-list__row .row__sets {
  display: flex;
  flex-direction: column;
  flex-basis: 75%;
}

.exercise-list__row .row__sets .set {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.25rem;
}

.exercise-list__row .row__sets .set span {
  width: 30%;
  text-align: center;
}

.exercise-list__row .row__sets .set span.weigth {
  text-align: right;
}
</style>