<template>
  <div id="app">
    <!-- Loader -->
    <app-loader v-if="loading"></app-loader>
    <router-view />
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
  },
  methods: {
    ...mapActions(["AUTH_TRANSITION"])
  },
  created() {
    this.AUTH_TRANSITION({ type: "LOADED" });
  }
};
</script>

<style></style>
