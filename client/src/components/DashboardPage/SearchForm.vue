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
			<search-by-date-form v-if="searchType === 'date'" />
			<search-by-period-form v-if="searchType === 'time period'" />
			<search-by-name-form v-if="searchType === 'session name'" />
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
	border-radius: 5px;
	box-shadow: var(--default-box-shadow);
	background-color: var(--color-lightgrey);
}

.form__title {
	margin: 0 0 1.5rem 0;
	padding: 1.5rem 0;
	display: flex;
	justify-content: center;
	border-top-right-radius: var(--default-radius);
	border-top-left-radius: var(--default-radius);
	text-align: center;
	background-color: var(--color-primary);
	color: var(--color-secondary);
}

.form__title--title {
	margin-right: 0.75rem;
	color: var(--color-yellow);
}

.form__title--select {
	align-self: center;
	padding: 0.25rem 0.75rem;
	border: 3px solid var(--color-secondary);
	font-size: 1.25rem;
	background-color: inherit;
	color: inherit;
	outline: none;
}

.form__inputs {
	padding: 1.5rem 0.75rem;
}

.form__inputs /deep/ input {
	background-color: var(--color-lightgrey);
}
</style>