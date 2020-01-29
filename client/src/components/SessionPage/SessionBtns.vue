<template>
	<div class="session__btns">
		<!-- Discard button (editing) -->
		<md-button
			class="app__btn error"
			v-if="sessionState.matches('editing')"
			@click="onDiscard"
			><md-icon aria-hidden="true" focusable="false">cancel</md-icon>
			Discard
		</md-button>
		<!-- Delete button (displaying) -->
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
		<!-- Save button (editing) -->
		<md-button
			class="app__btn action"
			v-if="sessionState.matches('editing')"
			@click="onSave"
		>
			<md-icon aria-hidden="true" focusable="false">check_circle</md-icon>
			Save
		</md-button>
		<!-- Edit button (displayiong) -->
		<md-button
			class="app__btn action"
			v-if="sessionState.matches('displaying')"
			@click="onEdit"
		>
			<md-icon aria-hidden="true" focusable="false">edit</md-icon>
			Edit</md-button
		>
	</div>
</template>

<script>
export default {
	computed: {
		sessionState() {
			return this.$sessionMachine.current;
		},
		sessionData() {
			return this.$sessionMachine.context.sessionData;
		}
	},
	methods: {
		onDiscard() {
			this.$sessionMachine.send({
				type: this.sessionData._id ? "DISPLAY" : "BACK_TO_DASHBOARD",
				params: { sessionId: this.sessionData._id }
			});
		},
		onDelete() {
			this.$sessionMachine.send({
				type: "DELETE",
				params: { sessionId: this.sessionData._id }
			});
		},
		onSave() {
			this.$sessionMachine.send({
				type: "SAVE",
				params: { sessionData: this.sessionData }
			});
		},
		onEdit() {
			this.$sessionMachine.send({
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