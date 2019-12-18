<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// Vuex
import { mapActions } from "vuex";

export default {
  name: "app",
  methods: {
    ...mapActions(["AUTH_TRANSITION"])
  },
  created() {
    this.AUTH_TRANSITION("LOADED");
  }
};
</script>

<style></style>
