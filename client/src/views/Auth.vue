<template>
	<div class="container">
		<!-- Logo -->
		<img src="/img/icons/icon.svg" alt="" width="144" height="144" />
		<!-- Title -->
		<h1 class="text-center">The Strength Log</h1>
		<h2 class="text-center">
			Log your training, <br />
			Get the Results.
		</h2>
		<!-- Install btn -->
		<md-button
			class="app__btn--small plain"
			id="installPWA"
			@click.prevent="showInstallPrompt()"
		>
			<md-icon>cloud_download</md-icon>
			Install
		</md-button>
		<!-- Forms -->
		<error-message v-if="error" from="server">{{
			error.message
		}}</error-message>
		<login-box />
	</div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import LoginBox from "../components/AuthPage/LoginBox";
import ErrorMessage from "../components/utils/forms/ErrorMessage";

// js
import initializePwa from "../assets/pwa";

export default {
	components: {
		LoginBox,
		ErrorMessage
	},
	data() {
		return {
			showInstallPrompt: null
		};
	},
	computed: {
		...mapState({
			state: state => state.auth.currentState,
			error: state => state.auth.error
		})
	},
	methods: {
		...mapActions(["AUTH_TRANSITION"])
	},
	mounted() {
		this.AUTH_TRANSITION({ type: "LOADED" });
		// Initializes the PWA code - checks if the app is installed,
		// etc.
		(async () => {
			this.showInstallPrompt = await initializePwa();
		})();
	}
};
</script>

<style scoped>
.container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0.75rem;
}
</style>
