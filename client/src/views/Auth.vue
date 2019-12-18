<template>
  <div class="container">
    <!-- Loader -->
    <app-loader v-if="state.matches('fetching')"></app-loader>
    <!-- Title -->
    <h1 class="text-center">The Strength Log</h1>
    <h2 class="text-center">
      Log your training, <br />
      Get the Results.
    </h2>
    <!-- Forms -->
    <error-message v-if="error" from="server">{{
      error.message
    }}</error-message>
    <login-box />
  </div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import AppLoader from "../components/utils/AppLoader";
import LoginBox from "../components/AuthPage/LoginBox";
import ErrorMessage from "../components/utils/forms/ErrorMessage";

export default {
  components: {
    AppLoader,
    LoginBox,
    ErrorMessage
  },
  computed: {
    ...mapState({
      state: state => state.auth.currentState,
      error: state => state.auth.error
    })
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
}
</style>
