import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { VueStateMachine } from 'vue-xstate-plugin';
import { authMachine } from './fsm/authMachine';
import { searchMachine } from './fsm/searchMachine';
import { sessionMachine } from './fsm/sessionMachine';

// Global styles
import { MdButton, MdIcon } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';
import './css/reset.css';
import './css/utils.css';
import './css/global.css';

Vue.config.productionTip = false;

Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(VueStateMachine, [
	{
		config: authMachine,
		logState: true,
		logContext: true,
		persistState: true
	},
	{
		config: searchMachine,
		logState: true,
		logContext: true,
		persistState: true
	},
	{
		config: sessionMachine,
		logState: true,
		logContext: true,
		persistState: true
	}
]);

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
