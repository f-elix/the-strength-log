<template>
  <div class="container">
    <div class="dashboard-ctn">
      <!-- Main menu -->
      <div class="dashboard-header">
        <!-- Logout btn -->
        <app-btn
          @click.native="logout"
          @keypress.enter.native="logout"
          color="dark"
          class="logout-btn"
        >
          Logout
        </app-btn>
        <p class="text-center">Started {{ user.createdAt }}</p>
      </div>
      <h1 class="text-center log-title">{{ user.name }}'s Log</h1>
      <!-- New session btn -->
      <app-btn
        color="dark-blue"
        class="app-btn"
        @click.native="createSession"
        @keypress.enter.native="createSession"
        >{{
          sessionState.matches("editing")
            ? "Finish editing session..."
            : "New session"
        }}</app-btn
      >
      <!-- View current week btn -->
      <app-btn class="app-btn" @click.native="getCurrentWeek"
        >View Current Week</app-btn
      >
      <!-- Search by date form -->
      <search-by-date-form />
      <!-- Search by session name form -->
      <search-by-name-form />
    </div>
  </div>
</template>

<script>
// Vuex
import { mapState, mapActions, mapGetters } from "vuex";

// Components
import SearchByDateForm from "../components/DashboardPage/SearchByDateForm";
import SearchByNameForm from "../components/DashboardPage/SearchByNameForm";
import AppBtn from "../components/utils/AppBtn";

export default {
  components: {
    AppBtn,
    SearchByDateForm,
    SearchByNameForm
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: state => state.auth.userData,
      sessionState: state => state.session.currentState
    }),
    ...mapGetters(["currentWeekDates"])
  },
  methods: {
    ...mapActions([
      "AUTH_TRANSITION",
      "SESSION_TRANSITION",
      "SEARCH_TRANSITION",
      "DASHBOARD_TRANSITION"
    ]),
    createSession() {
      this.SESSION_TRANSITION({ type: "CREATE" });
    },
    logout() {
      this.AUTH_TRANSITION({ type: "LOGOUT" });
    },
    getCurrentWeek() {
      const query = {
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
        `,
        variables: {
          fromDate: this.currentWeekDates.monday,
          toDate: this.currentWeekDates.sunday
        }
      };
      this.SEARCH_TRANSITION({
        type: "SEARCH",
        params: { query, queryName: "getSessionsFromTo" }
      });
    }
  },
  mounted() {
    this.DASHBOARD_TRANSITION({ type: "MOUNTED" });
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
}

.dashboard-ctn {
  width: 100%;
  max-width: 32rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  font-weight: bold;
}

.logout-btn {
  max-width: 20%;
  font-size: 1rem;
}

.log-title {
  margin: 0;
}

.app-btn {
  margin: 1.5rem auto;
}
</style>
