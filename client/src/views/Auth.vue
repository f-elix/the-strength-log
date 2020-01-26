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
			<md-icon>save_alt</md-icon>
			Install
		</md-button>
		<!-- Forms -->
		<error-message v-if="authContext.error" from="server">{{
			authContext.error
		}}</error-message>
		<login-box />
		<!-- Loader -->
		<app-loader v-if="authState.matches('loading')" />
	</div>
</template>

<script>
// fsm
import { authMachine } from "../fsm/auth";

// Components
import LoginBox from "../components/AuthPage/LoginBox";
import ErrorMessage from "../components/utils/forms/ErrorMessage";
import AppLoader from "../components/utils/AppLoader";

// js
import initializePwa from "../assets/pwa";

export default {
	components: {
		LoginBox,
		ErrorMessage,
		AppLoader
	},
	data() {
		return {
			showInstallPrompt: null
		};
	},
	computed: {
		authState() {
			return authMachine.current;
		},
		authContext() {
			return authMachine.context;
		}
	},
	mounted() {
		// Initializes the PWA code - checks if the app is installed,
		// etc.
		(async () => {
			this.showInstallPrompt = await initializePwa();
		})();
		authMachine.send({ type: "LOADED" });
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
