import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Global styles
import { MdButton, MdIcon } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";
import "./css/reset.css";
import "./css/utils.css";
import "./css/global.css";

Vue.config.productionTip = false;

Vue.use(MdButton);
Vue.use(MdIcon);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
