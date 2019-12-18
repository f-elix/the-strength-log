<template>
  <transition appear>
    <div class="dimmer">
      <div class="donut"></div>
    </div>
  </transition>
</template>

<style scoped>
.dimmer {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: var(--color-dimmer);
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: block;
  border: 8px solid var(--color-lightgrey);
  border-left-color: var(--color-primary);
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  animation: donut-spin 1.2s linear infinite;
}

/* Vue transition */
.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 0.4s linear;
}
</style>
