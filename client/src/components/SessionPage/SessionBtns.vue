<template>
	<div class="session__btns">
		<md-button
			class="app__btn error"
			v-if="sessionState.matches('editing')"
			@click="onDiscard"
			><md-icon aria-hidden="true" focusable="false">cancel</md-icon>
			Discard
		</md-button>
		<md-button
			class="app__btn error"
			v-if="sessionState.matches('displaying')"
			@click="onDelete"
		>
			<md-icon aria-hidden="true" focusable="false"
				>delete_forever</md-icon
			>
			Delete</md-button
		>
		<md-button
			class="app__btn action"
			v-if="sessionState.matches('editing')"
			@click="onSave"
		>
			<md-icon aria-hidden="true" focusable="false">check_circle</md-icon>
			Save
		</md-button>
		<md-button
			class="app__btn action"
			v-if="sessionState.matches('displaying')"
			@click="onEdit"
		>
			<md-icon aria-hidden="true" focusable="false">edit</md-icon> Edit
			Session</md-button
		>
	</div>
</template>

<script>
// fsm
import { sessionMachine } from "@/fsm/session";

export default {
	computed: {
		sessionState() {
			return sessionMachine.current;
		},
		sessionData() {
			return sessionMachine.context.sessionData;
		}
	},
	methods: {
		onDiscard() {
			sessionMachine.send({
				type: this.sessionData._id ? "DISPLAY" : "BACK_TO_DASHBOARD",
				params: { sessionId: this.sessionData._id }
			});
		},
		onDelete() {
			sessionMachine.send({
				type: "DELETE",
				params: { sessionId: this.sessionData._id }
			});
		},
		onSave() {
			sessionMachine.send({
				type: "SAVE",
				params: { sessionData: this.sessionData }
			});
		},
		onEdit() {
			sessionMachine.send({
				type: "EDIT",
				params: { sessionData: this.sessionData }
			});
		}
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