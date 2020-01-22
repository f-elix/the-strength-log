import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

// Modules
import dashboard from "./modules/dashboard";
import auth from "./modules/auth";
import session from "./modules/session";
import search from "./modules/search";
import editExercise from "./modules/editExercise";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loading: false
	},
	getters: {},
	mutations: {
		showLoading(state) {
			state.loading = true;
		},
		hideLoading(state) {
			state.loading = false;
		}
	},
	actions: {
		ROUTE_DASHBOARD: () => {
			router.push("/dashboard");
		},
		ROUTE_SESSION: (_, { params }) => {
			if (router.currentRoute.path !== "/session/" + params.sessionData._id) {
				router.push("/session/" + params.sessionData._id);
			}
		},
		ROUTE_NEW_SESSION: () => {
			router.push("/session");
		},
		ROUTE_SEARCH: () => {
			router.push("/search-results");
		},
		ROUTE_AUTH: () => {
			router.push("/");
		},
		SHOW_LOADING: ({ commit }) => {
			commit("showLoading");
		},
		HIDE_LOADING: ({ commit }) => {
			commit("hideLoading");
		}
	},
	modules: {
		dashboard,
		auth,
		session,
		search,
		editExercise
	}
});
