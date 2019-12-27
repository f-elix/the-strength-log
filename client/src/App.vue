<template>
  <div id="app">
    <!-- Loader -->
    <app-loader v-if="loading"></app-loader>
    <transition name="page-transition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import AppLoader from "./components/utils/AppLoader";

export default {
  name: "app",
  components: {
    AppLoader
  },
  computed: {
    ...mapState({
      loading: state => state.auth.loading
    })
  }
};
</script>

<style scoped>
.page-transition-enter {
  opacity: 0;
  transform: translateX(1.5rem);
}

.page-transition-enter-active {
  transition: transform 0.2s ease-out, opacity 0.2s linear;
}
</style>
