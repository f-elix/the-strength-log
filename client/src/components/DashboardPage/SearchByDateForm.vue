<template>
	<form @submit.prevent="searchByDate">
		<form-group
			type="date"
			labelText="To"
			name="date"
			id="date"
			v-model="date"
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
			date: null,
			dateQuery: {
				query: `
                    query searchByDate($date: Date!) {
                        getSessionsByDate(sessionDate: $date) {
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
		searchByDate() {
			console.log(this.date);
			const query = this.dateQuery;
			query.variables = {
				date: this.date
			};
			this.SEARCH_TRANSITION({
				type: "SEARCH",
				params: { query, queryName: "getSessionsByDate" }
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