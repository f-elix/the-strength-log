<template>
  <form class="form" @submit.prevent="searchByDate">
    <h2 class="form__title">Search sessions by dates</h2>
    <div class="form__inputs">
      <!-- From date -->
      <form-group
        type="date"
        labelText="From"
        name="fromDate"
        id="fromDate"
        :isInvalid="!isDatesValid"
        v-model="fromDate"
      ></form-group>
      <!-- To date -->
      <form-group
        type="date"
        labelText="To"
        name="toDate"
        id="toDate"
        :isInvalid="!isDatesValid"
        v-model="toDate"
      ></form-group>
    </div>
    <transition name="error">
      <error-message v-if="!isDatesValid" class="text-center"
        >The second date must be later than the first</error-message
      >
    </transition>
    <app-btn class="app-btn" type="submit">Search</app-btn>
  </form>
</template>

<script>
// Vuex
import { mapActions } from "vuex";

// Components
import FormGroup from "../utils/forms/FormGroup";
import AppBtn from "../utils/AppBtn";
import ErrorMessage from "../utils/forms/ErrorMessage";

export default {
  components: {
    FormGroup,
    AppBtn,
    ErrorMessage
  },
  data() {
    return {
      fromDate: null,
      toDate: null,
      fromToQuery: {
        query: `
          query getCurrentWeek($fromDate: Date!, $toDate: Date!) {
            getSessionsFromTo(fromDate: $fromDate, toDate: $toDate) {
              _id
              title
              newSession
              sessionDate
              notes
              exercises {
                id
                name
                sets {
                  id
                  setQty
                  repQty
                  weight
                }
              }
            }
          }
        `
      }
    };
  },
  computed: {
    isDatesValid() {
      if (this.fromDate && this.toDate) {
        return this.fromDate < this.toDate;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(["SEARCH_TRANSITION"]),
    searchByDate() {
      if (!this.isValid) {
        return;
      }
      const query = this.fromToQuery;
      query.variables = {
        fromDate: this.fromDate,
        toDate: this.toDate
      };
      this.SEARCH_TRANSITION({
        type: "SEARCH",
        params: { query, queryName: "getSessionsFromTo" }
      });
    }
  }
};
</script>

<style scoped>
.form {
  margin: 1.5rem auto;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 3px 1px var(--color-primary);
}

.form__title {
  margin-bottom: 4.5rem;
  text-align: center;
}

.form__inputs {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

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