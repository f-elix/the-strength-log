<template>
  <form class="form" @submit.prevent="searchByDate">
    <h2 class="form__title">Search sessions by dates</h2>
    <div class="form__inputs">
      <form-group
        type="date"
        labelText="From"
        name="fromDate"
        id="fromDate"
        v-model="fromDate"
      ></form-group>
      <form-group
        type="date"
        labelText="To"
        name="toDate"
        id="toDate"
        v-model="toDate"
      ></form-group>
    </div>
    <app-btn class="app-btn" type="submit">Search</app-btn>
  </form>
</template>

<script>
// Vuex
import { mapActions } from "vuex";

// Components
import FormGroup from "../utils/forms/FormGroup";
import AppBtn from "../utils/AppBtn";

export default {
  components: {
    FormGroup,
    AppBtn
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
  methods: {
    ...mapActions(["SEARCH_TRANSITION"]),
    searchByDate() {
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
  margin: 1.5rem 0 3rem;
}

.form__inputs {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>