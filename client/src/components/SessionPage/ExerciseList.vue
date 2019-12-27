<template>
  <div class="exercise-list">
    <div class="list__ctn" v-if="exercises.length">
      <!-- List header -->
      <div class="list__header">
        <div class="list__header--exercise">Exercise</div>
        <div class="list__header--sets">Set(s)</div>
        <div class="list__header--reps">Rep(s)/<br />Time</div>
        <div class="list__header--weigth">Weigth</div>
      </div>
      <!-- List exercises (display) -->
      <div
        class="list__row"
        v-for="exercise in exercises"
        :key="exercise.id"
        v-if="state.matches('displaying')"
      >
        <div class="list__exercise-name">{{ exercise.name }}</div>
        <div class="list__set" v-for="set in exercise.sets" :key="set.id">
          <div>{{ set.setQty }}</div>
          <div>{{ set.repsOrTime }}</div>
          <div>{{ set.weight }}</div>
        </div>
      </div>
      <!-- List exercises (editing) -->
      <div
        class="list__row--editing"
        v-for="exercise in exercises"
        :key="exercise.id"
        v-if="state.matches('editing')"
      >
        <app-input
          class="list__input list__input--name"
          type="text"
          v-model="exercise.name"
          :id="`exercise${exercise.id}`"
          :name="`exercise${exercise.id}`"
          autofocus="true"
        ></app-input>
        <div
          class="list__set--editing"
          :class="{
            'list__set--additional':
              Number(set.id.toString().split('')[1]) !== 1
          }"
          v-for="set in exercise.sets"
          :key="set.id"
        >
          <!-- Delete set btn -->
          <app-btn
            aria-roledescription="Delete set"
            type="button"
            class="delete-set-btn"
            v-if="Number(set.id.toString().split('')[1]) !== 1"
            @click.native="
              DELETE_SET({ exerciseId: exercise.id, setId: set.id })
            "
            @keypress.enter.native="
              DELETE_SET({ exerciseId: exercise.id, setId: set.id })
            "
          ></app-btn>
          <app-input
            class="list__input"
            type="number"
            v-model="set.setQty"
            :id="`setQty${set.id}`"
            :name="`setQty${set.id}`"
          ></app-input>
          <app-input
            class="list__input"
            type="text"
            v-model="set.repsOrTime"
            :id="`repsOrTime${set.id}`"
            :name="`repsOrTime${set.id}`"
          ></app-input>
          <app-input
            class="list__input"
            type="text"
            v-model="set.weight"
            :id="`weight${set.id}`"
            :name="`weight${set.id}`"
          ></app-input>
        </div>
        <!-- Remove exercise btn -->
        <app-btn
          type="button"
          color="red"
          class="remove-exercise-btn"
          @click.native="REMOVE_EXERCISE(exercise.id)"
          @keypress.enter.native="REMOVE_EXERCISE(exercise.id)"
          >Remove Exercise</app-btn
        >
        <!-- Add set btn -->
        <app-btn
          type="button"
          class="add-set-btn"
          color="dark-blue"
          @click.native="ADD_SET(exercise)"
          @keypress.enter.native="ADD_SET(exercise)"
          >Add Set</app-btn
        >
      </div>
    </div>
    <!-- Add exercise btn -->
    <app-btn
      type="button"
      class="add-exercise-btn"
      @click.native="ADD_EXERCISE"
      @keypres.enter.native="ADD_EXERCISE"
      v-if="state.matches('editing')"
      >Add Exercise</app-btn
    >
  </div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import AppInput from "../utils/forms/AppInput";
import AppBtn from "../utils/AppBtn";

export default {
  components: {
    AppBtn,
    AppInput
  },
  computed: {
    ...mapState({
      state: state => state.session.currentState,
      exercises: state => state.session.sessionData.exercises
    })
  },
  methods: {
    ...mapActions(["ADD_EXERCISE", "REMOVE_EXERCISE", "ADD_SET", "DELETE_SET"])
  }
};
</script>

<style scoped>
.list__ctn,
.list__header,
.list__row,
.list__row--editing {
  display: grid;
  grid-template-columns: 1fr repeat(3, 20%);
}

.list__ctn {
  grid-template-rows: 2.25rem repeat(autofit, 1.5rem);
}

.list__header {
  grid-column: 1 / 5;
  grid-row: 1 / 2;
  align-items: center;
  padding: 0.25rem;
  background-color: #111;
  color: #f8f8f8;
  font-weight: bold;
}

.list__header--exercise {
  grid-column: 1 / 2;
}

.list__header--sets {
  grid-column: 2 / 3;
}

.list__header--reps {
  grid-column: 3 / 4;
}

.list__header--weigth {
  grid-column: 4 / 5;
}

.list__row,
.list__row--editing {
  grid-column: 1 / 5;
}

.list__row {
  padding: 0.25rem;
  background-color: var(--color-secondary);
}

.list__row:nth-of-type(even) {
  background-color: var(--color-lightgrey);
}

.list__row--exercise {
  grid-column: 1 / 2;
}

.list__row--editing {
  grid-gap: 0.25rem;
}

.list__exercise-name {
  padding-right: 0.75rem;
}

.list__set,
.list__set--editing {
  display: grid;
  grid-column: 2 / 5;
  grid-template-columns: repeat(3, 1fr);
}

.list__set--editing {
  grid-gap: 0.25rem;
}

.list__set--additional {
  grid-column: 1 / 5;
  grid-template-columns: 1fr repeat(3, 20%);
}

.list__input {
  transition: all 0.1s linear;
  margin-bottom: 0;
}

.list__input:focus {
  background-color: var(--color-lightblue);
}

.add-set-btn {
  grid-column: 2 / 5;
}

.remove-exercise-btn {
  grid-column: 1 / 2;
}

.add-set-btn,
.remove-exercise-btn {
  font-size: 1rem;
  padding: 0;
}

.delete-set-btn {
  position: relative;
  grid-column: 1 / 2;
  max-width: 1.5rem;
  margin-left: auto;
  padding: 0 1.5rem;
  border: none;
}

.delete-set-btn::before,
.delete-set-btn::after {
  content: "";
  position: absolute;
  height: 3px;
  width: 60%;
  top: 47.5%;
  left: 20%;
  background-color: var(--color-red);
}

.delete-set-btn::before {
  transform: rotate(45deg);
}

.delete-set-btn::after {
  transform: rotate(-45deg);
}

.add-exercise-btn {
  margin: 1.5rem auto;
  width: 90%;
}
</style>