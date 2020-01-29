<template>
	<div class="login-box-wrapper">
		<!-- Login form -->
		<div class="form-btn-group">
			<transition
				name="show-form"
				mode="out-in"
				@enter="setHeight"
				@after-enter="setHeightAuto"
				@leave="removeHeight"
			>
				<div
					key="signup"
					v-if="authState.matches('idle.signup')"
					class="form-btn-group__btn js-max-height"
				>
					<p>
						Already have an account?
					</p>

					<md-button class="app__btn info-light" @click="displayLogin"
						>Login Here</md-button
					>
				</div>
				<login-form
					key="login"
					v-if="authState.matches('idle.login')"
					class="form-btn-group__form js-max-height"
				></login-form>
			</transition>
		</div>
		<!-- Signup form -->
		<div class="form-btn-group">
			<transition
				name="show-form"
				mode="out-in"
				@enter="setHeight"
				@after-enter="setHeightAuto"
				@leave="removeHeight"
			>
				<div
					key="login"
					v-if="authState.matches('idle.login')"
					class="form-btn-group__btn js-max-height"
				>
					<p>
						Don't have an account?
					</p>
					<md-button class="app__btn info" @click="displaySignup"
						>Sign Up Here</md-button
					>
				</div>
				<sign-up-form
					key="signup"
					v-if="authState.matches('idle.signup')"
					class="form-btn-group__form js-max-height"
				></sign-up-form>
			</transition>
		</div>
	</div>
</template>

<script>
// Components
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default {
	components: {
		LoginForm,
		SignUpForm
	},
	computed: {
		authState() {
			return this.$authMachine.current;
		}
	},
	methods: {
		displaySignup() {
			this.$authMachine.send("SIGNUP");
		},
		displayLogin() {
			this.$authMachine.send("LOGIN");
		},
		// Height animation
		setHeight() {
			const animatedElements = document.getElementsByClassName(
				"js-max-height"
			);
			Array.from(animatedElements).forEach(element => {
				const width = getComputedStyle(element).width;

				element.style.width = width;
				element.style.position = "absolute";
				element.style.visibility = "hidden";
				element.style.height = "auto";

				const height = getComputedStyle(element).height;

				element.style.width = null;
				element.style.position = null;
				element.style.visibility = null;
				element.style.height = 0;

				// Force repaint to make sure the
				// animation is triggered correctly.
				getComputedStyle(element).height;

				// Trigger the animation.
				// We use `setTimeout` because we need
				// to make sure the browser has finished
				// painting after setting the `height`
				// to `0` in the line above.
				setTimeout(() => {
					element.style.height = height;
				});
			});
		},
		setHeightAuto() {
			const animatedElements = document.getElementsByClassName(
				"js-max-height"
			);
			Array.from(animatedElements).forEach(element => {
				element.style.height = "auto";
			});
		},
		removeHeight() {
			const animatedElements = document.getElementsByClassName(
				"js-max-height"
			);
			Array.from(animatedElements).forEach(element => {
				const height = getComputedStyle(element).height;

				element.style.height = height;

				// Force repaint to make sure the
				// animation is triggered correctly.
				getComputedStyle(element).height;

				setTimeout(() => {
					element.style.height = 0;
				});
			});
		}
	}
};
</script>

<style scoped>
.login-box-wrapper {
	width: 100%;
	max-width: 32rem;
}

.form-btn-group {
	width: 100%;
}

/* Vee-validate wraps forms inside span tags */
.form-btn-group__form {
	display: block;
}

.form-btn-group__btn,
.form-btn-group__form {
	margin: 3rem 0;
}

.form-btn-group__btn p {
	text-align: center;
	font-size: 1.25rem;
	margin: 0;
}

/* Vue transitions */
.show-form-enter,
.show-form-leave-to {
	height: 0;
}

.show-form-enter-active {
	transition: height 0.4s ease-in 0.1s;
	overflow: hidden;
}

.show-form-leave-active {
	transition: height 0.4s ease-out;
	overflow: hidden;
}
</style>