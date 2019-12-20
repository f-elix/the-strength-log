import sessionMachine from "../fsm/sessionMachine";
import transition from "../transition";

import router from "../../router";

const state = {};
const mutations = {};
const actions = {
  SESSION_TRANSITION: (context, event) => {
    transition(sessionMachine, context, event);
  },
  CREATE_SESSION: async () => {
    const token = localStorage.getItem("token");
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    console.log(date);
    const query = {
      query: `
        mutation createSession($date: Date!) {
          createSession(sessionDate: $date)
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
      return data.data.createSession;
    } catch (error) {
      console.log(error);
    }
    router.push("/new-session");
  }
};

export default {
  state,
  mutations,
  actions
};
