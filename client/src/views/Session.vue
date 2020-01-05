<template>
	<div class="session-container">
		<!-- Session header -->
		<div class="session-header">
			<!-- Button container -->
			<div
				class="btn-ctn btn-ctn--header"
				v-if="state.matches('displaying')"
			>
				<!-- back to menu btn -->
				<md-button
					class="app__btn--small plain menu-btn"
					@click.native="
						SESSION_TRANSITION({
							type: 'BACK_TO_DASHBOARD',
							params: { sessionData }
						})
					"
				>
					Back to menu
				</md-button>
				<!-- back to search btn -->
				<md-button
					class="app__btn--small plain-light back-to-search-btn"
					v-if="searchState.matches('success')"
					@click.native="
						SESSION_TRANSITION({ type: 'BACK_TO_SEARCH' })
					"
				>
					Back to results
				</md-button>
			</div>
			<!-- Date -->
			<div class="date" v-if="state.matches('displaying')">
				{{ sessionData.sessionDate }}
			</div>
			<!-- Title -->
			<h1 class="title" v-if="state.matches('displaying')">
				{{ sessionData.title }}
			</h1>
			<!-- Bodyweigth -->
			<p
				class="bodyweigth"
				v-if="state.matches('displaying') && sessionData.bodyweigth"
			>
				Bodyweigth: {{ sessionData.bodyweigth }}
			</p>
			<!-- Title input -->
			<form-group
				class="title-input"
				id="title"
				name="title"
				type="text"
				labelText="Session Title"
				v-model="sessionData.title"
				autofocus="true"
				autoselect="true"
				v-if="state.matches('editing')"
			></form-group>
			<!-- Date input -->
			<form-group
				class="date-input"
				id="date"
				name="date"
				type="date"
				labelText="Session Date"
				v-model="sessionData.sessionDate"
				v-if="state.matches('editing')"
			></form-group>
			<!-- Bodyweigth input -->
			<form-group
				class="bodyweigth-input"
				id="bodyweigth"
				name="bodyweigth"
				type="text"
				labelText="Bodyweigth"
				v-model="sessionData.bodyweigth"
				v-if="state.matches('editing')"
			></form-group>
		</div>
		<!-- Session exercise list -->
		<exercise-list></exercise-list>
		<!-- Session notes editing-->
		<app-text-area
			class="session__notes--editing"
			name="notes"
			id="notes"
			cols="30"
			rows="4"
			labelText="Notes"
			v-if="state.matches('editing')"
			v-model="sessionData.notes"
		></app-text-area>
		<!-- Session notes displaying -->
		<div v-if="state.matches('displaying') && sessionData.notes">
			<h2>Notes:</h2>
			<p class="session__notes--displaying">
				{{ sessionData.notes }}
			</p>
		</div>
		<!-- Session btns -->
		<div class="btn-ctn btn-ctn--footer">
			<md-button
				class="app__btn error-light"
				v-if="state.matches('editing')"
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
				v-if="state.matches('displaying')"
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
				v-if="state.matches('editing')"
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
				v-if="state.matches('displaying')"
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
	</div>
</template>

<script>
// Vuex
import { mapActions, mapState } from "vuex";

// Components
import ExerciseList from "../components/SessionPage/ExerciseList";
import AppBtn from "../components/utils/AppBtn";
import FormGroup from "../components/utils/forms/FormGroup";
import AppTextArea from "../components/utils/forms/AppTextArea";

export default {
	components: {
		ExerciseList,
		AppBtn,
		FormGroup,
		AppTextArea
	},
	data() {
		return {
			sessionTitle: "Session Title"
		};
	},
	computed: {
		...mapState({
			state: state => state.session.currentState,
			searchState: state => state.search.currentState,
			sessionData: state => state.session.sessionData
		})
	},
	methods: {
		...mapActions(["SESSION_TRANSITION"])
	}
};
</script>

<style scoped>
.session-container {
	width: 100%;
	max-width: 32rem;
	min-height: 100vh;
	margin: 0 auto;
	padding: 1.5rem 0;
	display: flex;
	flex-direction: column;
}

.session-header {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	padding: 0.75rem;
}

.btn-ctn {
	display: flex;
}

.btn-ctn * + * {
	margin-left: 0.75rem;
}

.back-to-search-btn {
	margin-top: 0;
	margin-bottom: 0;
	margin-right: 0;
}

.menu-btn {
	margin: 0;
}

.date {
	flex-basis: 30%;
	font-weight: bold;
	text-align: center;
}

.title {
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 0;
}

.bodyweigth {
	flex-basis: 100%;
	text-align: center;
	margin: 0;
}

.bodyweigth-input,
.date-input {
	flex-basis: 48%;
}

.title-input {
	flex-basis: 100%;
}

.session__notes--editing {
	margin: auto 0.75rem 0.75rem;
}

.session__notes--displaying {
	margin: 0;
}

.btn-ctn--footer {
	padding: 0.75rem;
}
</style>
