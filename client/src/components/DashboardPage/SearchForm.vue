<template>
	<form class="form" @submit.prevent="onSubmit">
		<h2 class="form__title">{{ formTitle }}</h2>
		<div class="form__inputs">
			<slot />
		</div>
		<app-btn class="app-btn" type="Submit">Search</app-btn>
	</form>
</template>

<script>
// Vuex
import { mapActions } from "vuex";

// Components
import AppBtn from "../utils/AppBtn";

export default {
	components: {
		AppBtn
	},
	props: {
		formTitle: {
			type: String
		}
	},
	methods: {
		onSubmit() {
			this.$emit("submit");
		}
	}
};
</script>

<style scoped>
.form {
	margin: 1.5rem auto;
	padding-bottom: 1.5rem;
	border-radius: 5px;
	box-shadow: var(--default-box-shadow);
	background-color: var(--color-lightgrey);
}

.form__title {
	margin: 0;
	margin-bottom: 1.5rem;
	padding: 1.5rem 0;
	border-top-right-radius: var(--default-radius);
	border-top-left-radius: var(--default-radius);
	text-align: center;
	background-color: var(--color-primary);
	color: var(--color-secondary);
}

.form__inputs {
	width: 100%;
	margin: 4.5rem 0 0.75rem;
	padding: 0 1.5rem;
}

.form__inputs /deep/ input {
	background-color: var(--color-lightgrey);
}

.app-btn {
	width: 90%;
	margin: 0 1.5rem;
	background-color: var(--color-secondary);
}
</style>