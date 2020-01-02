<template>
	<form @submit.prevent="searchByName">
		<form-group
			type="search"
			name="sessionName"
			id="sessionName"
			v-model="sessionName"
			labelText="Session Name"
		></form-group>
		<app-btn class="app-btn" type="submit">Search</app-btn>
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
          query searchByTitle($title: String!) {
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
.app-btn {
	width: 90%;
	margin: 0 1.5rem;
	background-color: var(--color-secondary);
}
</style>