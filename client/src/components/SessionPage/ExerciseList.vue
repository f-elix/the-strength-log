<template>
	<div class="exercise-list">
		<div
			class="list__ctn"
			v-if="exercises.length"
			:class="{ 'border-bottom': state.matches('displaying') }"
		>
			<!-- List header -->
			<div class="list__header">
				<div class="list__header--exercise">Exercise</div>
				<div class="list__header--sets">Set(s)</div>
				<div class="list__header--reps">Rep(s)/<br />Time</div>
				<div class="list__header--weigth">Weigth</div>
			</div>
			<!-- List exercises (display) -->
			<div
				class="list__row"
				v-for="exercise in exercises"
				:key="exercise.id"
				v-if="state.matches('displaying')"
			>
				<div
					class="list__movement"
					v-for="movement in exercise.movements"
					:key="movement.id"
				>
					<div class="list__movement-name">{{ movement.name }}</div>
					<div
						class="list__set"
						v-for="set in movement.sets"
						:key="set.id"
					>
						<div>{{ set.setQty }}</div>
						<div>{{ set.repsOrTime }}</div>
						<div>{{ set.weight }}</div>
					</div>
				</div>
			</div>
			<!-- List exercises (editing) -->
			<div
				class="list__row--editing"
				v-for="exercise in exercises"
				:key="exercise.id"
				v-if="state.matches('editing')"
			>
				<!-- Movements -->
				<div
					class="list__movement"
					v-for="movement in exercise.movements"
					:key="movement.id"
				>
					<form class="list__form">
						<div class="list__name-input-ctn">
							<!-- Delete movement btn -->
							<app-btn
								aria-roledescription="Delete set"
								type="button"
								class="delete-btn"
								v-if="
									Number(
										movement.id.toString().split('')[1]
									) > 1
								"
								@click.native="
									DELETE_MOVEMENT({
										exercise,
										movement
									})
								"
							></app-btn>
							<!-- Name input -->
							<app-input
								class="list__input"
								type="text"
								v-model="movement.name"
								:id="`movement${movement.id}`"
								:name="`movement${movement.id}`"
								autofocus="true"
							></app-input>
						</div>
						<!-- Sets -->
						<div
							class="list__set--editing"
							:class="{
								'list__set--additional':
									Number(set.id.toString().split('')[2]) > 1
							}"
							v-for="set in movement.sets"
							:key="set.id"
						>
							<!-- Delete set btn -->
							<app-btn
								aria-roledescription="Delete set"
								type="button"
								class="delete-btn"
								v-if="
									Number(set.id.toString().split('')[2]) > 1
								"
								@click.native="
									DELETE_SET({
										exercise,
										movement,
										setId: set.id
									})
								"
							></app-btn>
							<!-- Set qty -->
							<app-input
								class="list__input"
								type="number"
								v-model="set.setQty"
								:id="`setQty${set.id}`"
								:name="`setQty${set.id}`"
								autoselect="true"
							></app-input>
							<!-- Reps -->
							<app-input
								class="list__input"
								type="text"
								v-model="set.repsOrTime"
								:id="`repsOrTime${set.id}`"
								:name="`repsOrTime${set.id}`"
								autoselect="true"
							></app-input>
							<!-- Weigth -->
							<app-input
								class="list__input"
								type="text"
								v-model="set.weight"
								:id="`weight${set.id}`"
								:name="`weight${set.id}`"
							></app-input>
						</div>
					</form>
					<!-- Add set btn -->
					<app-btn
						type="button"
						class="add-set-btn"
						color="dark-blue"
						@click.native="ADD_SET({ exercise, movement })"
						>Add Set</app-btn
					>
				</div>
				<div class="exercise-btn-ctn">
					<!-- Remove exercise btn -->
					<app-btn
						type="button"
						color="red"
						class="remove-exercise-btn"
						@click.native="DELETE_EXERCISE(exercise.id)"
						>Remove</app-btn
					>
					<!-- Add movement btn -->
					<app-btn
						type="button"
						class="add-movement-btn"
						color="dark-blue"
						@click.native="ADD_MOVEMENT(exercise)"
						>Add Movement</app-btn
					>
				</div>
			</div>
		</div>
		<!-- Add exercise btn -->
		<app-btn
			type="button"
			class="add-exercise-btn"
			@click.native="ADD_EXERCISE"
			v-if="state.matches('editing')"
			>Add Exercise</app-btn
		>
	</div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import AppInput from "../utils/forms/AppInput";
import AppBtn from "../utils/AppBtn";

export default {
	components: {
		AppBtn,
		AppInput
	},
	computed: {
		...mapState({
			state: state => state.session.currentState,
			exercises: state => state.session.sessionData.exercises
		})
	},
	methods: {
		...mapActions([
			"ADD_EXERCISE",
			"DELETE_EXERCISE",
			"ADD_MOVEMENT",
			"DELETE_MOVEMENT",
			"ADD_SET",
			"DELETE_SET"
		])
	}
};
</script>

<style scoped>
.list__ctn,
.list__header,
.list__row,
.list__movement,
.list__form {
	display: grid;
	grid-template-columns: 1fr repeat(3, 20%);
}

.list__ctn {
	grid-template-rows: 2.25rem repeat(autofit, 1.5rem);
}

.border-bottom {
	border-bottom: 1px solid var(--color-primary);
}

.list__header {
	grid-column: 1 / 5;
	grid-row: 1 / 2;
	align-items: center;
	padding: 0.25rem;
	background-color: #111;
	color: #f8f8f8;
	font-weight: bold;
}

.list__header--exercise {
	grid-column: 1 / 2;
}

.list__header--sets {
	grid-column: 2 / 3;
}

.list__header--reps {
	grid-column: 3 / 4;
}

.list__header--weigth {
	grid-column: 4 / 5;
}

.list__row,
.list__row--editing,
.list__movement,
.list__form {
	grid-column: 1 / 5;
}

.list__row {
	padding: 0.25rem;
	background-color: var(--color-secondary);
}

.list__row:nth-of-type(even) {
	background-color: var(--color-lightgrey);
}

.list__row--exercise {
	grid-column: 1 / 2;
}

.list__movement,
.list__form {
	grid-gap: 0.25rem;
}

.list__movement-name {
	padding-right: 0.75rem;
}

.list__name-input-ctn {
	grid-column: 1 / 2;
	display: flex;
}

.list__set,
.list__set--editing {
	display: grid;
	grid-column: 2 / 5;
	grid-template-columns: repeat(3, 1fr);
}

.list__set--editing {
	grid-gap: 0.25rem;
}

.list__set--additional {
	grid-column: 1 / 5;
	grid-template-columns: 1fr repeat(3, 20%);
}

.list__input {
	margin-bottom: 0;
	padding: 0.75rem 0.25rem;
	transition: all 0.1s linear;
}

.list__input:focus {
	background-color: var(--color-lightblue);
}

.add-set-btn {
	grid-column: 1 / 5;
}

.exercise-btn-ctn {
	grid-column: 1 / 5;
	display: flex;
	justify-content: space-between;
	margin-top: 0.25rem;
}

.add-set-btn,
.remove-exercise-btn,
.add-movement-btn {
	padding: 0.25rem;
	font-size: 1rem;
	font-weight: bold;
}

.remove-exercise-btn,
.add-movement-btn {
	flex-basis: 49%;
}

.delete-btn {
	position: relative;
	grid-column: 1 / 2;
	max-width: 1.5rem;
	margin-left: auto;
	padding: 0 1.5rem;
	border: none;
}

.delete-btn::before,
.delete-btn::after {
	content: "";
	position: absolute;
	height: 3px;
	width: 60%;
	top: 47.5%;
	left: 20%;
	background-color: var(--color-red);
}

.delete-btn::before {
	transform: rotate(45deg);
}

.delete-btn::after {
	transform: rotate(-45deg);
}

.add-exercise-btn {
	margin: 1.5rem auto;
	width: 90%;
}
</style>