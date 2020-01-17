<template>
	<li class="list__row--editing">
		<!-- Movements -->
		<div
			class="list__movement--editing"
			v-for="movement in exercise.movements"
			:key="movement.id"
		>
			<form class="list__form">
				<div class="list__name-input-ctn">
					<!-- Delete movement btn -->
					<md-button
						class="md-icon-button delete-btn"
						v-if="Number(movement.id.toString().split('')[1]) > 1"
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
						<md-icon class="md-accent">delete_forever</md-icon>
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
							Number(set.id.toString().split('')[2]) > 1
					}"
					v-for="set in movement.sets"
					:key="set.id"
				>
					<!-- Delete set btn -->
					<md-button
						class="md-icon-button delete-btn"
						v-if="Number(set.id.toString().split('')[2]) > 1"
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
						<md-icon class="md-accent">delete_forever</md-icon>
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
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// Components
import AppInput from "../../utils/forms/AppInput";
import AppBtn from "../../utils/AppBtn";

export default {
	components: {
		AppInput,
		AppBtn
	},
	methods: {
		...mapActions(["EDIT_TRANSITION"])
	},
	props: {
		exercise: {
			type: Object
		}
	}
};
</script>

<style scoped>
.list__row--editing {
	border: var(--default-border) transparent;
	box-shadow: var(--default-box-shadow);
}

.list__row--editing,
.list__movement--editing,
.list__form {
	grid-column: 1 / 5;
}

.list__movement--editing,
.list__form {
	display: grid;
	grid-template-columns: 1fr repeat(3, 20%);
}

.list__form {
	grid-gap: 0.25rem;
}

.list__name-input-ctn {
	grid-column: 1 / 2;
	display: flex;
}

.list__set--editing {
	display: grid;
	grid-column: 2 / 5;
	grid-template-columns: repeat(3, 1fr);
}

.list__set--editing,
.list__movement--editing {
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
	background-color: transparent;
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
	background-color: var(--color-greyedout);
	cursor: grab;
}

.list__handle:active {
	cursor: grabbing;
}
</style>