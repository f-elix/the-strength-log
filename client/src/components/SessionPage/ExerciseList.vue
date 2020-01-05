<template>
	<div class="exercise-list">
		<transition name="exercise">
			<div class="list__ctn" v-if="exercises && exercises.length">
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
					v-if="sessionState.matches('displaying')"
				>
					<div
						class="list__movement"
						v-for="movement in exercise.movements"
						:key="movement.id"
					>
						<div class="list__movement-name">
							{{ movement.name }}
						</div>
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
				<draggable
					v-if="sessionState.matches('editing')"
					class="list__row--editing"
					tag="ul"
					v-model="exercises"
					v-bind="dragOptions"
					@start="EDIT_TRANSITION({ type: 'DRAG' })"
					@end="drag = EDIT_TRANSITION({ type: 'DROP' })"
				>
					<transition-group
						:name="
							!exerciseState.matches('dragging')
								? 'exercise'
								: null
						"
						mode="out-in"
						tag="div"
						class="list__row--editing"
					>
						<li
							class="list__row--editing"
							v-for="exercise in exercises"
							:key="exercise.id"
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
										<md-button
											class="md-icon-button delete-btn"
											v-if="
												Number(
													movement.id
														.toString()
														.split('')[1]
												) > 1
											"
											@click.native="
												EDIT_TRANSITION({
													type: 'DELETE_MOVEMENT',
													params: {
														exercise,
														movement
													}
												})
											"
										>
											<md-icon class="md-accent"
												>delete_forever</md-icon
											>
										</md-button>
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
												Number(
													set.id
														.toString()
														.split('')[2]
												) > 1
										}"
										v-for="set in movement.sets"
										:key="set.id"
									>
										<!-- Delete set btn -->
										<md-button
											class="md-icon-button delete-btn"
											v-if="
												Number(
													set.id
														.toString()
														.split('')[2]
												) > 1
											"
											@click.native="
												EDIT_TRANSITION({
													type: 'DELETE_SET',
													params: {
														exercise,
														movement,
														setId: set.id
													}
												})
											"
										>
											<md-icon class="md-accent"
												>delete_forever</md-icon
											>
										</md-button>
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
								<!-- Add movement btn -->
								<md-button
									class="app__btn info add-movement-btn"
									@click.native="
										EDIT_TRANSITION({
											type: 'ADD_MOVEMENT',
											params: {
												exercise
											}
										})
									"
									>Add Movement</md-button
								>
								<!-- Add set btn -->
								<md-button
									class="app__btn info add-set-btn"
									@click.native="
										EDIT_TRANSITION({
											type: 'ADD_SET',
											params: { exercise, movement }
										})
									"
									>Add Set</md-button
								>
							</div>
							<!-- Remove exercise btn -->
							<md-button
								class="app__btn error-light remove-exercise-btn"
								@click.native="
									EDIT_TRANSITION({
										type: 'DELETE_EXERCISE',
										params: { exerciseId: exercise.id }
									})
								"
								>Remove Exercise</md-button
							>
							<div class="list__handle"></div>
						</li>
					</transition-group>
				</draggable>
			</div>
		</transition>

		<!-- Add exercise btn -->
		<md-button
			class="app__btn action"
			@click.native="EDIT_TRANSITION({ type: 'ADD_EXERCISE' })"
			v-if="sessionState.matches('editing')"
			>Add Exercise</md-button
		>
	</div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import AppInput from "../utils/forms/AppInput";
import AppBtn from "../utils/AppBtn";

import draggable from "vuedraggable";

export default {
	components: {
		AppBtn,
		AppInput,
		draggable
	},
	data() {
		return {
			drag: false
		};
	},
	computed: {
		...mapState({
			sessionState: state => state.session.currentState,
			exerciseState: state => state.editExercise.currentState
		}),
		exercises: {
			get() {
				return this.$store.state.session.sessionData.exercises;
			},
			set(value) {
				this.$store.commit("updateExercises", value);
			}
		},
		dragOptions() {
			return {
				animation: 200,
				handle: ".list__handle",
				ghostClass: "ghost",
				dragClass: "dragging"
			};
		}
	},
	methods: {
		...mapActions(["EDIT_TRANSITION"])
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

.list__header {
	grid-column: 1 / 5;
	grid-row: 1 / 2;
	align-items: center;
	padding: 0.25rem;
	color: var(--color-primary);
	background-color: var(--color-darkgrey);
	font-weight: bold;
	font-size: 1.25rem;
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
	font-weight: bold;
	color: var(--color-secondary);
	background-color: var(--color-greyedout);
}

.list__row:nth-of-type(even) {
	color: var(--color-primary);
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
	background-color: var(--color-lightgrey);
}

.add-set-btn {
	grid-column: 2 / 5;
}

.remove-exercise-btn {
	grid-column: 1 / 5;
}

.add-set-btn,
.remove-exercise-btn,
.add-movement-btn {
	margin: 0.25rem auto;
	height: 3rem;
	font-size: 1.25rem;
}

.delete-btn {
	grid-column: 1 / 2;
	margin-left: auto;
}

.list__handle {
	width: 6rem;
	height: 8px;
	margin: 1.5rem auto;
	border-radius: var(--default-radius);
	background-color: var(--color-lightgrey);
	cursor: grab;
}

.list__handle:active {
	cursor: grabbing;
}

.ghost {
	opacity: 0.4;
}

.dragging {
	opacity: 1;
	border: var(--default-border) var(--color-primary);
}

/* Vue transitions */
.exercise-enter {
	opacity: 0;
	transform: translateY(3rem);
}

.exercise-leave-to {
	opacity: 0;
	transform: translateX(10rem);
}

.exercise-enter-active {
	transition: opacity 0.3s, transform 0.3s;
}

.exercise-leave-active {
	position: absolute;
	transition: opacity 0.2s, transform 0.2s;
}

.exercise-move {
	transition: transform 0.4s;
}
</style>