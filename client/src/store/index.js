import Vue from "vue";
import Vuex from "vuex";

// Modules
import auth from "./modules/auth";
import dashboard from "./modules/dashboard";
import session from "./modules/session";
import search from "./modules/search";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		dashboard,
		session,
		search
	}
});
