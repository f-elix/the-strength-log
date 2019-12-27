<template>
  <div class="form-group">
    <app-input
      class="form-group__input"
      :placeholder="inputPlaceholder"
      :id="id"
      :name="id"
      :type="type"
      :isInvalid="isInvalid"
      :readonly="readonly"
      :autofocus="autofocus"
      v-model="inputValue"
    ></app-input>
    <label class="form-group__label" :for="id">{{ labelText }}</label>
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
      default: null
    },
    autofocus: {
      type: String,
      default: ""
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
.form-group__label,
.form-group__input {
  display: block;
}

.form-group__label {
  transform: translate(0, -5.5rem);
}

/* The following code is not supported in Edge */
@supports (not (-ms-ime-align: auto)) {
  .form-group__label {
    color: var(--color-darkgrey);
    transform: translate(0.25rem, -3.5rem);
    transition: all 0.2s ease-out;
  }

  .form-group__input:focus + .form-group__label,
  .form-group__input:not(:placeholder-shown) + .form-group__label {
    color: var(--color-primary);
    font-weight: bold;
    transform: translate(0, -5.25rem);
  }
}
</style>