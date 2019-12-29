<template>
	<search-form @submit="searchByName" formTitle="Search log by session name"
		><form-group
			type="search"
			name="sessionName"
			id="sessionName"
			v-model="sessionName"
			labelText="Session Name"
		></form-group
	></search-form>
</template>

<script>
// Vuex
import { mapActions } from "vuex";

// Components
import SearchForm from "./SearchForm";
import FormGroup from "../utils/forms/FormGroup";
import AppBtn from "../utils/AppBtn";

export default {
	components: {
		SearchForm,
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
</style>