import sessionMachine from "../fsm/sessionMachine";
import transition from "../transition";

import router from "../../router";

const state = {
  sessionData: {}
};
const mutations = {
  updateSessionData(state, data) {
    state.sessionData = data;
  }
};
const actions = {
  SESSION_TRANSITION: (context, event) => {
    transition(sessionMachine, context, event);
  },
  DISPLAY_SESSION: async ({ dispatch }, { params }) => {},
  CREATE_SESSION: async ({ commit }) => {
    const token = localStorage.getItem("token");
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const query = {
      query: `
        mutation createSession($date: Date!) {
          createSession(sessionDate: $date) {
            _id
            createdAt
            title
            sessionDate
          }
        }
      `,
      variables: {
        date: formattedDate
      }
    };
    try {
      const res = await fetch(process.env.VUE_APP_API, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: token
        },
        body: JSON.stringify(query)
      });
      const data = await res.json();
      if (data.errors) {
        const error = {
          message: data.errors[0].message,
          statusCode: data.errors[0].extensions.exception.statusCode
        };
        throw error;
      }
      commit("updateSessionData", data.data.createSession);
      router.push("/new-session");
    } catch (error) {
      console.log(error);
    }
  }
};

export default {
  state,
  mutations,
  actions
};
