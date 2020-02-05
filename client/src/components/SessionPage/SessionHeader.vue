<template>
	<div class="session-header">
		<!-- Displaying -->
		<div v-if="sessionState.matches('displaying')" class="display-ctn">
			<!-- Title -->
			<h1 class="title">
				{{ sessionData.title }}
			</h1>
			<!-- Date -->
			<p class="date">
				{{ sessionData.sessionDate }}
			</p>
			<!-- Bodyweigth -->
			<p v-if="sessionData.bodyweigth">
				Bodyweigth: {{ sessionData.bodyweigth }}
			</p>
		</div>
		<!-- Editing -->
		<form v-if="sessionState.matches('editing')" class="edit-ctn">
			<!-- Title input -->
			<form-group
				class="title-input"
				id="title"
				name="title"
				type="text"
				labelText="Session Title"
				v-model="sessionData.title"
				:autofocus="true"
				autoselect="true"
			></form-group>
			<!-- Date input -->
			<form-group
				class="date-input"
				id="date"
				name="date"
				type="date"
				labelText="Session Date"
				v-model="sessionData.sessionDate"
			></form-group>
			<!-- Bodyweigth input -->
			<form-group
				class="bodyweigth-input"
				id="bodyweigth"
				name="bodyweigth"
				type="text"
				labelText="Bodyweigth"
				v-model="sessionData.bodyweigth"
			></form-group>
		</form>
	</div>
</template>

<script>
// Components
import FormGroup from "../utils/forms/FormGroup";

export default {
	components: {
		FormGroup
	},
	data() {
		return {
			sessionTitle: "Session Title"
		};
	},
	computed: {
		sessionState() {
			return this.$sessionMachine.current;
		},
		sessionData() {
			return this.$sessionMachine.context.sessionData;
		}
	}
};
</script>

<style scoped>
.session-header {
	margin: 1.5rem auto;
}

.display-ctn {
	width: 100%;
	text-align: center;
}

.title {
	margin: 0;
}

.date {
	font-weight: bold;
}

.edit-ctn {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	padding: 0 0.75rem;
}

.title-input {
	flex-basis: 100%;
}

.date-input,
.bodyweigth-input {
	margin-top: 0.75rem;
}
</style>