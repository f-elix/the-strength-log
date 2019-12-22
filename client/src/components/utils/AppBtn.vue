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
  width: 100%;
  padding: 0.75rem;
  border: 3px solid var(--color-primary);
  font-size: 1.5rem;
}

.btn:active {
  outline: none;
  transform: translateY(1px);
}

.btn-dark,
.btn-dark-blue,
.btn-red {
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
