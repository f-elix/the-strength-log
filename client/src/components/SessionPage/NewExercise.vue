<template>
  <div class="new-exercise">
    <form>
      <form-group
        labelText="Exercise Name"
        type="text"
        id="exerciseName"
        name="exerciseName"
        v-model="exercise.name"
      ></form-group>
      <div class="new-exercise__sets">
        <div class="set-form" v-for="setForm in setForms" :key="setForm.id">
          <form-group
            type="number"
            :id="`sets${setForm.id}`"
            labelText="Set(s)"
            v-model="exercise.sets.qty"
          ></form-group>
          <form-group
            type="text"
            :id="`reps${setForm.id}`"
            labelText="Rep(s)"
            v-model="exercise.sets.reps"
          ></form-group>
          <form-group
            type="text"
            :id="`weigth${setForm.id}`"
            labelText="Weigth"
            v-model="exercise.sets.weigth"
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
      setForms: [
        {
          id: 1
        }
      ]
    };
  },
  methods: {
    addSet() {
      const newSet = {
        id: this.setForms[this.setForms.length - 1].id + 1
      };
      this.setForms.push(newSet);
    }
  }
};
</script>

<style scoped>
.new-exercise {
  margin-top: 3rem;
  padding: 0.75rem;
}

.set-form {
  display: flex;
  justify-content: space-between;
}

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
</style>