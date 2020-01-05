<template>
	<div class="form">
		<div class="form__title">
			<h2 class="form__title--title">Search log by</h2>
			<select
				name="searchType"
				id="searchType"
				class="form__title--select"
				v-model="searchType"
			>
				<option value="date" selected>Date</option>
				<option value="time period">Time Period</option>
				<option value="session name">Session Name</option>
			</select>
		</div>
		<div class="form__inputs">
			<transition name="search-form" mode="out-in">
				<search-by-date-form v-if="searchType === 'date'" />
				<search-by-period-form v-if="searchType === 'time period'" />
				<search-by-name-form v-if="searchType === 'session name'" />
			</transition>
		</div>
	</div>
</template>

<script>
// Vuex
import { mapActions } from "vuex";

// Components
import SearchByDateForm from "./SearchByDateForm";
import SearchByPeriodForm from "./SearchByPeriodForm";
import SearchByNameForm from "./SearchByNameForm";
import AppBtn from "../utils/AppBtn";

export default {
	components: {
		SearchByDateForm,
		SearchByPeriodForm,
		SearchByNameForm,
		AppBtn
	},
	data() {
		return {
			searchType: "date"
		};
	}
};
</script>

<style scoped>
.form {
	margin: 1.5rem auto;
	padding-bottom: 1.5rem;
	border-radius: var(--default-radius);
	background-color: var(--color-darkgrey);
	box-shadow: var(--default-box-shadow);
	overflow: hidden;
}

.form__title {
	margin: 0 0 1.5rem 0;
	padding: 1.5rem 0;
	display: flex;
	justify-content: center;
	border-top-right-radius: var(--default-radius);
	border-top-left-radius: var(--default-radius);
	text-align: center;
	background-color: var(--color-secondary-light);
	color: var(--color-primary);
}

.form__title--title {
	margin-right: 0.75rem;
	color: var(--color-primary);
}

.form__title--select {
	align-self: center;
	padding: 0.25rem 0.75rem;
	border: 3px solid var(--color-primary);
	border-radius: var(--default-radius);
	font-size: 1.25rem;
	background-color: inherit;
	color: inherit;
	outline: none;
	cursor: pointer;
}

.form__inputs {
	padding: 1.5rem 0.75rem;
}

.form__inputs /deep/ input {
	background-color: inherit;
}

/* Vue transitions */
.search-form-enter {
	opacity: 0;
	transform: translateX(-6rem);
}

.search-form-leave-to {
	opacity: 0;
	transform: translateX(6rem);
}

.search-form-enter-active,
.search-form-leave-active {
	transition: opacity 0.15s, transform 0.2s ease;
}
</style>