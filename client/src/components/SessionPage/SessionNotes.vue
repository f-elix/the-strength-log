<template>
	<div class="session__notes">
		<!-- Session notes displaying -->
		<div
			v-if="sessionState.matches('displaying') && sessionData.notes"
			class="session__notes--displaying"
		>
			<h2>Notes:</h2>
			<p>
				{{ sessionData.notes }}
			</p>
		</div>
		<!-- Session notes editing -->
		<app-text-area
			class="session__notes--editing"
			name="notes"
			id="notes"
			cols="30"
			rows="4"
			labelText="Notes"
			v-if="sessionState.matches('editing')"
			v-model="sessionData.notes"
		></app-text-area>
	</div>
</template>

<script>
// fsm
import { sessionMachine } from "@/fsm/session";

// Components
import AppTextArea from "../utils/forms/AppTextArea";

export default {
	components: {
		AppTextArea
	},
	computed: {
		sessionState() {
			return sessionMachine.current;
		},
		sessionData() {
			return sessionMachine.context.sessionData;
		}
	}
};
</script>

<style scoped>
.session__notes--editing {
	margin: auto 0.75rem 0.75rem;
}

.session__notes--displaying {
	margin: 0.75rem;
	padding: 0.75rem;
	box-shadow: var(--default-box-shadow);
	background-color: var(--color-fg);
}

.session__notes--displaying h2 {
	margin: 0;
}
</style>