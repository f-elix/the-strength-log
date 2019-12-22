<template>
  <div class="exercise-list">
    <!-- Add btn -->
    <app-btn
      type="button"
      class="add-exercise-btn"
      @click.native="ADD_EXERCISE"
      @keypres.enter.native="ADD_EXERCISE"
      v-if="state.matches('editing')"
      >Add Exercise</app-btn
    >
    <div class="list__ctn">
      <!-- List header -->
      <div class="list__header">
        <div class="list__header--exercise">Exercise</div>
        <div class="list__header--sets">Set(s)</div>
        <div class="list__header--reps">Rep(s)</div>
        <div class="list__header--weigth">Weigth</div>
      </div>
      <!-- List exercises (display) -->
      <div
        class="list__row"
        v-for="exercise in exercises"
        :key="exercise.id"
        v-if="state.matches('idle')"
      >
        <div>{{ exercise.name }}</div>
        <div class="list__set" v-for="set in exercise.sets" :key="set.id">
          <div>{{ set.qty }}</div>
          <div>{{ set.reps }}</div>
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
          class="list__input"
          type="text"
          v-model="exercise.name"
          :id="`name${exercise.id}`"
          :name="`name${exercise.id}`"
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
          <app-btn
            aria-roledescription="Delete set"
            type="button"
            isRed
            class="delete-set-btn"
            v-if="Number(set.id.toString().split('')[1]) !== 1"
            @click.native="
              DELETE_SET({ exerciseId: exercise.id, setId: set.id })
            "
            @keypress.enter.native="
              DELETE_SET({ exerciseId: exercise.id, setId: set.id })
            "
            >X</app-btn
          >
          <app-input
            class="list__input"
            type="number"
            v-model="set.qty"
            :id="`qty${set.id}`"
            :name="`qty${set.id}`"
          ></app-input>
          <app-input
            class="list__input"
            type="number"
            v-model="set.reps"
            :id="`reps${set.id}`"
            :name="`reps${set.id}`"
          ></app-input>
          <app-input
            class="list__input"
            type="text"
            v-model="set.weight"
            :id="`weight${set.id}`"
            :name="`weight${set.id}`"
          ></app-input>
        </div>

        <app-btn
          type="button"
          class="add-set-btn"
          isDarkBlue
          @click.native="ADD_SET(exercise)"
          @keypress.enter.native="ADD_SET(exercise)"
          >Add Set</app-btn
        >
      </div>
    </div>
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
    ...mapActions(["ADD_EXERCISE", "ADD_SET", "DELETE_SET"])
  }
};
</script>

<style scoped>
.add-exercise-btn {
  margin-bottom: 1.5rem;
}

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
  color: var(--color-secondary);
  background-color: var(--color-darkblue);
}

.add-set-btn {
  grid-column: 1 / 5;
  padding: 0;
}

.delete-set-btn {
  grid-column: 1 / 2;
  max-width: 2rem;
  padding: 0;
  font-size: 1rem;
  border: none;
}
</style>