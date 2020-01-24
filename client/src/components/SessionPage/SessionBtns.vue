<template>
	<div class="session__btns">
		<md-button
			class="app__btn error"
			v-if="sessionState.matches('editing')"
			@click.native="
				SESSION_TRANSITION({
					type: sessionData.newSession ? 'DELETE' : 'DISPLAY',
					params: { sessionId: sessionData._id }
				})
			"
			><md-icon>cancel</md-icon> Discard
		</md-button>
		<md-button
			class="app__btn error"
			v-if="sessionState.matches('displaying')"
			@click.native="
				SESSION_TRANSITION({
					type: 'DELETE',
					params: { sessionId: sessionData._id }
				})
			"
		>
			<md-icon>delete_forever</md-icon> Delete</md-button
		>
		<md-button
			class="app__btn action"
			v-if="sessionState.matches('editing')"
			@click.native="
				SESSION_TRANSITION({
					type: 'SAVE',
					params: { sessionData }
				})
			"
		>
			<md-icon>check_circle</md-icon> Save
		</md-button>
		<md-button
			class="app__btn action"
			v-if="sessionState.matches('displaying')"
			@click.native="
				SESSION_TRANSITION({
					type: 'EDIT',
					params: { sessionData }
				})
			"
		>
			<md-icon>edit</md-icon> Edit Session</md-button
		>
	</div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

export default {
	computed: {
		...mapState({
			sessionState: state => state.session.currentState,
			sessionData: state => state.session.sessionData
		})
	},
	methods: {
		...mapActions(["SESSION_TRANSITION"])
	}
};
</script>

<style scoped>
.session__btns {
	display: flex;
	padding: 0.75rem;
}

.session__btns * + * {
	margin-left: 0.75rem;
}
</style>