<template>
	<form @submit.prevent="searchByPeriod" class="input-ctn">
		<!-- From date -->
		<form-group
			type="date"
			labelText="From"
			name="fromDate"
			id="fromDate"
			:isInvalid="!isDatesValid"
			v-model="fromDate"
		></form-group>
		<!-- To date -->
		<form-group
			type="date"
			labelText="To"
			name="toDate"
			id="toDate"
			:isInvalid="!isDatesValid"
			v-model="toDate"
		></form-group>
		<transition name="error">
			<error-message v-if="!isDatesValid" class="text-center"
				>The second date must be later than the first</error-message
			>
		</transition>
		<md-button class="app__btn info-light width-90" type="submit"
			>Search</md-button
		>
	</form>
</template>

<script>
// Vuex
import { mapActions } from "vuex";

// Components
import SearchForm from "./SearchForm";
import FormGroup from "../utils/forms/FormGroup";
import AppBtn from "../utils/AppBtn";
import ErrorMessage from "../utils/forms/ErrorMessage";

export default {
	components: {
		SearchForm,
		FormGroup,
		AppBtn,
		ErrorMessage
	},
	data() {
		return {
			fromDate: null,
			toDate: null,
			fromToQuery: {
				query: `
          query searchByPeriod($fromDate: Date!, $toDate: Date!) {
            getSessionsFromTo(fromDate: $fromDate, toDate: $toDate) {
              _id
              title
              sessionDate
            }
          }
        `
			}
		};
	},
	computed: {
		isDatesValid() {
			if (this.fromDate && this.toDate) {
				return this.fromDate < this.toDate;
			} else {
				return true;
			}
		}
	},
	methods: {
		...mapActions(["SEARCH_TRANSITION"]),
		searchByPeriod() {
			if (!this.isDatesValid) {
				return;
			}
			const query = this.fromToQuery;
			query.variables = {
				fromDate: this.fromDate,
				toDate: this.toDate
			};
			this.SEARCH_TRANSITION({
				type: "SEARCH",
				params: { query, queryName: "getSessionsFromTo" }
			});
		}
	}
};
</script>

<style scoped>
.input-ctn {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.width-90 {
	width: 90%;
}

/* Vue transitions */
.error-enter,
.error-leave-to {
	opacity: 0;
	transform: translateY(10px);
}

.error-enter-active,
.error-leave-active {
	transition: all 0.2s;
}
</style>