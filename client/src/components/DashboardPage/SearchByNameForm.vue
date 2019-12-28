<template>
	<form class="form" @submit.prevent="searchByName">
		<h2 class="form__title">Search log by session name</h2>
		<div class="form__inputs">
			<form-group
				class="form__input"
				type="search"
				name="sessionName"
				id="sessionName"
				v-model="sessionName"
				labelText="Session Name"
			></form-group>
		</div>
		<app-btn class="app-btn" type="Submit">Search</app-btn>
	</form>
</template>

<script>
// Vuex
import { mapActions } from "vuex";

// Components
import FormGroup from "../utils/forms/FormGroup";
import AppBtn from "../utils/AppBtn";

export default {
	components: {
		FormGroup,
		AppBtn
	},
	data() {
		return {
			sessionName: null,
			titleQuery: {
				query: `
          query getByTitle($title: String!) {
            getSessionsByTitle(title: $title) {
              _id
              title
              sessionDate
            }
          }
        `
			}
		};
	},
	methods: {
		...mapActions(["SEARCH_TRANSITION"]),
		searchByName() {
			if (!this.sessionName) {
				return;
			}
			const query = this.titleQuery;
			query.variables = {
				title: this.sessionName
			};
			this.SEARCH_TRANSITION({
				type: "SEARCH",
				params: { query, queryName: "getSessionsByTitle" }
			});
		}
	}
};
</script>

<style scoped>
.form {
	margin: 1.5rem auto;
	padding-bottom: 1.5rem;
	border-radius: 5px;
	box-shadow: 0 2px 3px 1px var(--color-primary);
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

.form__input {
	width: 100%;
}

.form__input /deep/ input {
	background-color: var(--color-lightgrey);
}

.app-btn {
	width: 90%;
	margin: 0 1.5rem;
	background-color: var(--color-secondary);
}
</style>