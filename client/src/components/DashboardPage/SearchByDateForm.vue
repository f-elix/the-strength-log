<template>
  <form class="form" @submit.prevent="searchByDate">
    <h2 class="form__title">Search log by dates</h2>
    <div class="form__inputs">
      <!-- From date -->
      <form-group
        type="date"
        labelText="From"
        name="fromDate"
        id="fromDate"
        :isInvalid="!isDatesValid"
        v-model="fromDate"
        class="form__input"
      ></form-group>
      <!-- To date -->
      <form-group
        type="date"
        labelText="To"
        name="toDate"
        id="toDate"
        :isInvalid="!isDatesValid"
        v-model="toDate"
        class="form__input"
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
                  repsOrTime
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
  padding-bottom: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 3px 1px var(--color-primary);
  background-color: var(--color-lightgrey);
}

.form__title {
  margin: 0;
  margin-bottom: 1.5rem;
  padding: 1.5rem 0;
  border-top-right-radius: var(--default-radius);
  border-top-left-radius: var(--default-radius);
  text-align: center;
  background-color: var(--color-primary);
  color: var(--color-secondary);
}

.form__inputs {
  width: 100%;
  margin: 4.5rem 0 0.75rem;
  display: flex;
  justify-content: space-evenly;
}

.form__input /deep/ input {
  background-color: var(--color-lightgrey);
}

.app-btn {
  width: 90%;
  margin: 0 1.5rem;
  background-color: var(--color-secondary);
}

/* Vue transitions */
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