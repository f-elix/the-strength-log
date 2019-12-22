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
    >
    {{ value }}
    </textarea>
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
      type: Number,
      default: 30
    },
    rows: {
      type: Number,
      default: 5
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
}

.textarea {
  border: 2px solid var(--color-primary);
  background-color: var(--color-secondary);
  transition: all 0.1s linear;
}

.textarea:focus {
  outline: none;
  background-color: var(--color-darkblue);
  color: var(--color-secondary);
}
</style>