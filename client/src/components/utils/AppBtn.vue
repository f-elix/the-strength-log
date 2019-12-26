<template>
  <button class="btn" :class="colorClass" :type="type">
    <slot />
  </button>
</template>

<script>
export default {
  computed: {
    colorClass() {
      return "btn-" + this.color;
    }
  },
  props: {
    color: {
      type: String
    },
    type: {
      type: String,
      default: "button"
    }
  }
};
</script>

<style scoped>
.btn {
  --shadow-color: var(--color-primary);
  --box-shadow: 0 1px 3px 2px var(--shadow-color);
  display: block;
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--default-radius);
  box-shadow: var(--box-shadow);
  font-size: 1.5rem;
}

.btn:active {
  outline: none;
  transform: translateY(1px);
  box-shadow: inset var(--box-shadow);
}

.btn-dark,
.btn-dark-blue,
.btn-red,
.btn-green {
  box-shadow: none;
  border: 1px solid var(--color-primary);
  color: var(--color-secondary);
}

.btn-dark {
  background-color: var(--color-primary);
}

.btn-dark-blue {
  background-color: var(--color-darkblue);
}

.btn-red {
  background-color: var(--color-red);
}

.btn-green {
  background-color: var(--color-green);
}
</style>
