import router from "../../router";

const state = {
	loading: false
};
const mutations = {
	showLoading(state) {
		state.loading = true;
	},
	hideLoading(state) {
		state.loading = false;
	}
};
const actions = {
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
};

export default {
	state,
	mutations,
	actions
};
