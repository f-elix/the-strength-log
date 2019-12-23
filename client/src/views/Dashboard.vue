<template>
  <div class="container">
    <div class="dashboard-ctn">
      <!-- Main menu -->
      <button @click="AUTH_TRANSITION({ type: 'LOGOUT' })" class="logout-btn">
        Logout
      </button>
      <h1 class="text-center log-title">{{ user.name }}'s Log</h1>
      <p class="text-center">Started {{ user.createdAt }}</p>
      <!-- Create session btn -->
      <app-btn
        color="dark-blue"
        class="app-btn"
        @click.native="SESSION_TRANSITION({ type: 'CREATE' })"
        >Create Session</app-btn
      >
      <!-- View current week btn -->
      <app-btn class="app-btn" @click.native="getCurrentWeek"
        >View Current Week</app-btn
      >
      <!-- Search by date form -->
      <form class="form" @submit.prevent="">
        <h2 class="form__title">Search sessions by dates</h2>
        <div class="form__inputs--sbd">
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
      <!-- Search by session name form -->
      <form class="form" @submit.prevent="">
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
    </div>
  </div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import AppBtn from "../components/utils/AppBtn";
import FormGroup from "../components/utils/forms/FormGroup";

export default {
  components: {
    AppBtn,
    FormGroup
  },
  data() {
    return {
      fromDate: "",
      toDate: "",
      sessionName: "",
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
    ...mapState({
      user: state => state.auth.userData
    }),
    currentWeekDates() {
      let date = new Date();
      const monday = date.setDate(date.getDate() + (7 - 1 + date.getDay() - 7));
      date = new Date();
      const sunday = date.setDate(date.getDate() + (7 - date.getDay()));
      return {
        monday: new Date(monday).toISOString().split("T")[0],
        sunday: new Date(sunday).toISOString().split("T")[0]
      };
    }
  },
  methods: {
    ...mapActions([
      "AUTH_TRANSITION",
      "SESSION_TRANSITION",
      "SEARCH_TRANSITION"
    ]),
    getCurrentWeek() {
      const query = this.fromToQuery;
      query.variables = {
        fromDate: this.currentWeekDates.monday,
        toDate: this.currentWeekDates.sunday
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
.container {
  min-height: 100vh;
  padding: 1.5rem;
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dashboard-ctn {
  width: 100%;
  max-width: 32rem;
}

.logout-btn {
  display: block;
  border: 2px solid var(--color-primary);
}

.log-title {
  margin: 0;
}

.app-btn {
  margin: 1.5rem auto;
}

.hr {
  height: 3px;
  background-color: var(--color-darkgrey);
  border: none;
}

.form {
  margin: 1.5rem auto;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 3px 1px var(--color-primary);
}

.form__title {
  margin: 1.5rem 0 3rem;
}

.form__inputs--sbd {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
