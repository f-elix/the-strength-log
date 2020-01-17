<template>
	<div class="session__btns">
		<md-button
			class="app__btn error-light"
			v-if="sessionState.matches('editing')"
			@click.native="
				SESSION_TRANSITION({
					type: sessionData.newSession ? 'DELETE' : 'DISCARD',
					params: { sessionId: sessionData._id }
				})
			"
			>Discard</md-button
		>
		<md-button
			class="app__btn error"
			v-if="sessionState.matches('displaying')"
			@click.native="
				SESSION_TRANSITION({
					type: 'DELETE',
					params: { sessionId: sessionData._id }
				})
			"
			>Delete</md-button
		>
		<md-button
			class="app__btn action-light"
			v-if="sessionState.matches('editing')"
			@click.native="
				SESSION_TRANSITION({
					type: 'SAVE',
					params: { sessionData }
				})
			"
		>
			Save Session</md-button
		>
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
			Edit Session</md-button
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