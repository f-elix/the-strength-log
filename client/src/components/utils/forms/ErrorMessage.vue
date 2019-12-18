<template>
  <p
    :class="{
      'error-message--form': from === 'form',
      'error-message--server': from === 'server'
    }"
  >
    <slot />
  </p>
</template>

<script>
export default {
  props: {
    from: {
      type: String,
      default: "form"
    }
  }
};
</script>

<style scoped>
.error-message--form {
  margin: -3rem 0 3rem;
  color: var(--color-red);
}

.error-message--server {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-red);
}
</style>