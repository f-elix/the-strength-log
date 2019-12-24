import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../views/Auth.vue";

import auth from "../store/modules/auth";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "auth",
		component: Auth
	},
	{
		path: "/dashboard",
		name: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
		beforeEnter: (to, from, next) => {
			if (!auth.state.currentState.matches("authenticated")) {
				next("/");
			} else {
				next();
			}
		}
	},
	{
		path: "/session/",
		name: "session",
		component: () => import(/* webpackChunkName: "session" */ "../views/Session.vue"),
		beforeEnter: (to, from, next) => {
			if (!auth.state.currentState.matches("authenticated")) {
				next("/");
			} else {
				next();
			}
		}
	},
	{
		path: "/session/:id",
		name: "session/id",
		component: () => import(/* webpackChunkName: "session" */ "../views/Session.vue"),
		beforeEnter: (to, from, next) => {
			if (!auth.state.currentState.matches("authenticated")) {
				next("/");
			} else {
				next();
			}
		}
	},
	{
		path: "/search-results",
		name: "search results",
		component: () => import(/* webpackChunkName: "search-results" */ "../views/SearchResults.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
