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
			v-if="deferredPrompt"
			@click="promptInstall"
		>
			<md-icon focusable="false">save_alt</md-icon>
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

export default {
	components: {
		LoginBox,
		ErrorMessage,
		AppLoader
	},
	data() {
		return {
			deferredPrompt: null
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
	methods: {
		promptInstall() {
			this.deferredPrompt.prompt();
			this.deferredPrompt.userChoice.then(choiceResult => {
				if (choiceResult.outcome === "accepted") {
					console.log(
						"The Strength Log has been successfully installed."
					);
				} else {
					console.log("User dismissed installation.");
				}
			});
			this.deferredPrompt = null;
		}
	},
	created() {
		window.addEventListener("beforeinstallprompt", e => {
			e.preventDefault();
			this.deferredPrompt = e;
			return false;
		});
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
