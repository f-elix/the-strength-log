<template>
  <div class="textarea-ctn">
    <label :for="id" class="textarea-label">{{ labelText }}</label>
    <textarea
      class="textarea"
      :name="name"
      :id="id"
      :cols="cols"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="textValue"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    id: {
      type: String
    },
    cols: {
      type: String,
      default: "30"
    },
    rows: {
      type: String,
      default: "5"
    },
    labelText: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    value: {
      type: String
    }
  },
  computed: {
    textValue: {
      get() {
        return this.value;
      },
      set(textValue) {
        this.$emit("input", textValue);
      }
    }
  }
};
</script>

<style scoped>
.textarea-ctn {
  display: flex;
  flex-direction: column;
}

.textarea-label {
  font-weight: bold;
  font-size: 1.5rem;
}

.textarea {
  padding: 0.5rem;
  font-size: 1.5rem;
  border-radius: var(--default-radius);
  border: 2px solid var(--color-primary);
  background-color: var(--color-secondary);
  transition: all 0.1s linear;
}

.textarea:focus {
  outline: none;
  background-color: var(--color-lightblue);
}
</style>