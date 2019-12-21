<template>
  <div class="new-exercise">
    <form @submit.prevent="addExercise">
      <!-- Exercise name -->
      <form-group
        labelText="Exercise Name"
        type="text"
        id="exerciseName"
        name="exerciseName"
        v-model="exercise.name"
      ></form-group>
      <!-- Display sets list -->
      <transition name="sets-list-ctn" appear>
        <div class="sets-list" v-if="exercise.sets.length > 0">
          <div class="sets-list__header">
            <div>Set(s)</div>
            <div>Rep(s)</div>
            <div>Weigth</div>
          </div>
          <ul>
            <transition-group name="sets-list" mode="out-in">
              <li v-for="set in exercise.sets" :key="set.id">
                <div class="sets-list__set">
                  <div>{{ set.qty }}</div>
                  <div>{{ set.reps }}</div>
                  <div>{{ set.weigth }}</div>
                </div>
                <button
                  class="sets-list__delete-btn"
                  aria-roledescription="Delete set"
                  @click="deleteSet(set.id)"
                  @keypress.enter="deleteSet(set.id)"
                  type="button"
                ></button>
              </li>
            </transition-group>
          </ul>
        </div>
      </transition>
      <!-- Set forms -->
      <div class="new-exercise__sets">
        <div class="set-form">
          <form-group
            type="number"
            id="qty"
            name="qty"
            labelText="Set(s)"
            v-model="qty"
          ></form-group>
          <form-group
            type="text"
            id="reps"
            name="reps"
            labelText="Rep(s)"
            v-model="reps"
          ></form-group>
          <form-group
            type="text"
            id="weigth"
            name="weigth"
            labelText="Weigth"
            v-model="weigth"
          ></form-group>
        </div>
        <div class="btn-ctn">
          <app-btn
            isDark
            class="add-btn"
            @click.native="addSet"
            @keypress.enter="addSet"
            >Add Set</app-btn
          >
          <app-btn class="add-btn" type="submit">Add Exercise</app-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// Components
import FormGroup from "../utils/forms/FormGroup";
import AppBtn from "../utils/AppBtn";

export default {
  components: {
    FormGroup,
    AppBtn
  },
  data() {
    return {
      exercise: {
        name: "",
        sets: []
      },
      qty: 1,
      reps: 1,
      weigth: ""
    };
  },
  methods: {
    addSet() {
      const id =
        this.exercise.sets.length > 0
          ? this.exercise.sets[this.exercise.sets.length - 1].id + 1
          : 1;
      const newSet = {
        id: id,
        qty: this.qty,
        reps: this.reps,
        weigth: this.weigth
      };
      this.exercise.sets.push(newSet);
      this.resetSetForms();
    },
    deleteSet(setId) {
      const sets = this.exercise.sets.filter(set => {
        return set.id != setId;
      });
      this.exercise.sets = sets;
    },
    resetSetForms() {
      this.qty = 1;
      this.reps = 1;
      this.weigth = "";
    }
  }
};
</script>

<style scoped>
.new-exercise {
  margin-top: 3rem;
  padding: 0.75rem;
}

.sets-list {
  margin-bottom: 3rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-lightgrey);
  box-shadow: 0 3px 4px var(--color-primary);
  font-size: 1.5rem;
}

.sets-list__header {
  max-width: 85%;
  text-decoration: underline;
}

.sets-list__set {
  flex-basis: 85%;
}

.sets-list__delete-btn {
  position: relative;
  width: 2.25rem;
}

.sets-list__delete-btn::before,
.sets-list__delete-btn::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  top: 50%;
  left: 0;
  background-color: var(--color-red);
}

.sets-list__delete-btn::before {
  transform: rotate(45deg);
}

.sets-list__delete-btn::after {
  transform: rotate(-45deg);
}

.sets-list ul {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0;
}

.sets-list ul li + li {
  padding-top: 1.5rem;
}

.sets-list__header,
.sets-list ul li,
.sets-list__set,
.set-form {
  display: flex;
  justify-content: space-between;
}

.sets-list__header div,
.sets-list__set div,
.set-form > * {
  flex-basis: 20%;
}

.btn-ctn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 7.5rem;
}

.add-btn {
  font-weight: bold;
  font-size: 1rem;
}

.add-btn:first-of-type {
  padding: 0.25rem;
}

/* Vue transitions */
.sets-list-ctn-enter {
  opacity: 0;
  transform: translateY(-3rem);
}

.sets-list-ctn-enter-active,
.sets-list-ctn-leave-active {
  transition: opacity 0.2s, transform 0.2s ease-out;
}

.sets-list-ctn-leave-to {
  opacity: 0;
  transform: translateY(3rem);
}

.sets-list-enter {
  opacity: 0;
  transform: translateY(3rem);
}

.sets-list-enter-active,
.sets-list-leave-active {
  transition: opacity 0.2s, transform 0.2s ease-out;
}

.sets-list-leave-to {
  opacity: 0;
  transform: translateX(-6rem);
}
</style>