<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)" novalidate>
      <!-- Email -->
      <validation-provider
        v-slot="{ errors, failed }"
        name="Email"
        rules="required|email"
        mode="eager"
      >
        <form-group
          labelText="E-mail"
          type="email"
          name="loginEmail"
          id="loginEmail"
          :isInvalid="failed"
          v-model="email"
        ></form-group>
        <transition name="error"
          ><error-message v-if="failed">{{
            errors[0]
          }}</error-message></transition
        >
      </validation-provider>
      <!-- Password -->
      <validation-provider
        v-slot="{ errors, failed }"
        name="Password"
        rules="required|min:6"
        mode="eager"
      >
        <form-group
          labelText="Password"
          type="password"
          name="loginPassword"
          id="loginPassword"
          :isInvalid="failed"
          v-model="password"
        ></form-group>
        <transition name="error"
          ><error-message v-if="failed">{{
            errors[0]
          }}</error-message></transition
        >
      </validation-provider>
      <app-btn type="submit">Login</app-btn>
    </form>
  </validation-observer>
</template>

<script>
// Vuex
import { mapActions, mapMutations } from "vuex";

// Components
import AppBtn from "../utils/AppBtn";
import FormGroup from "../utils/forms/FormGroup";
import ErrorMessage from "../utils/forms/ErrorMessage";

// Vee-validate
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

extend("email", {
  ...email,
  message: "Please provide a valid email."
});
extend("required", {
  ...required,
  message: "{_field_} is required."
});
extend("min", {
  ...min,
  message: "Password must have at least {length} characters.",
  params: ["length"]
});

export default {
  components: {
    AppBtn,
    FormGroup,
    ErrorMessage,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations(["updateAuthQuery"]),
    ...mapActions(["AUTH_TRANSITION"]),
    onSubmit() {
      const authQuery = {
        query: `
          mutation loginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
              token
            }
          }
        `,
        variables: {
          email: this.email,
          password: this.password
        }
      };
      this.AUTH_TRANSITION({
        type: "LOGIN",
        params: { authQuery, queryName: "loginUser" }
      });
    }
  }
};
</script>

<style scoped>
.error-enter,
.error-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.error-enter-active,
.error-leave-active {
  transition: all 0.2s;
}
</style>