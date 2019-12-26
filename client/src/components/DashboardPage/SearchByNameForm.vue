<template>
  <form class="form" @submit.prevent="searchByName">
    <h2 class="form__title">Search sessions by name</h2>
    <form-group
      type="search"
      name="sessionName"
      id="sessionName"
      v-model="sessionName"
      labelText="Session Name"
    ></form-group>
    <app-btn class="app-btn" type="Submit">Search</app-btn>
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
      sessionName: null,
      titleQuery: {
        query: `
          query getByTitle($title: String!) {
            getSessionsByTitle(title: $title) {
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
    searchByName() {
      const query = this.titleQuery;
      query.variables = {
        title: this.sessionName
      };
      this.SEARCH_TRANSITION({
        type: "SEARCH",
        params: { query, queryName: "getSessionsByTitle" }
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
</style>