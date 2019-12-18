<template>
  <div class="form-group">
    <app-input
      class="app-input"
      :placeholder="inputPlaceholder"
      :id="id"
      :name="id"
      :type="type"
      :isInvalid="isInvalid"
      v-model="inputValue"
    ></app-input>
    <label class="app-label" :for="id">{{ labelText }}</label>
  </div>
</template>

<script>
import AppInput from "./AppInput";

export default {
  components: {
    AppInput
  },
  props: {
    inputPlaceholder: {
      type: String,
      default: " "
    },
    id: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    readonly: {
      type: Boolean,
      default: false
    },
    labelText: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null
    },
    isInvalid: {
      type: Boolean
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(inputValue) {
        this.$emit("input", inputValue);
      }
    }
  }
};
</script>

<style scoped>
.app-label,
.app-input {
  display: block;
}

.app-label {
  transform: translate(0, -5.5rem);
}

/* The following code is not supported in Edge */
@supports (not (-ms-ime-align: auto)) {
  .app-label {
    color: var(--color-darkgrey);
    transform: translate(0.25rem, -3.5rem);
    transition: all 0.2s ease-out;
  }

  .app-input:focus + .app-label,
  .app-input:not(:placeholder-shown) + .app-label {
    color: var(--color-primary);
    font-weight: bold;
    transform: translate(0, -5.25rem);
  }
}
</style>