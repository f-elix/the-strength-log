<template>
	<li class="list__exercise--editing">
		<!-- Remove exercise btn -->
		<md-button
			class="md-icon-button list__remove-exercise-btn"
			aria-label="Remove exercise"
			title="Remove exercise"
			@click="onDeleteExercise"
		>
			<md-icon class="md-accent" focusable="false">delete</md-icon>
		</md-button>
		<!-- Movements -->
		<form
			class="list__form"
			:class="{
				'list__form--first': !(
					Number(movement.id.toString().split('')[1]) > 1
				)
			}"
			v-for="movement in exercise.movements"
			:key="movement.id"
		>
			<!-- Delete movement btn -->
			<md-button
				class="md-icon-button list__movement-btn--delete"
				aria-label="Delete movement"
				title="Delete movement"
				v-if="Number(movement.id.toString().split('')[1]) > 1"
				@click="onDeleteMovement(movement)"
			>
				<md-icon class="md-accent" focusable="false"
					>remove_circle</md-icon
				>
			</md-button>
			<!-- Name input -->
			<form-group
				class="list__input list__movement-input-ctn"
				type="text"
				v-model="movement.name"
				:id="`movement${movement.id}`"
				:name="`movement${movement.id}`"
				:autofocus="true"
				labelText="Movement Name"
			></form-group>
			<!-- Sets -->
			<div
				class="list__set-inputs-ctn"
				v-for="(set, index) in movement.sets"
				:class="{
					'list__set-inputs-ctn--first': !(
						Number(set.id.toString().split('')[2]) > 1
					)
				}"
				:key="set.id"
			>
				<!-- Set qty -->
				<form-group
					class="list__input"
					type="number"
					v-model="set.setQty"
					:id="`setQty${set.id}`"
					:name="`setQty${set.id}`"
					autoselect="true"
					:autofocus="Number(set.id.toString().split('')[2]) > 1"
					labelText="Set Qty"
				></form-group>
				<!-- Reps -->
				<form-group
					class="list__input"
					type="text"
					v-model="set.repsOrTime"
					:id="`repsOrTime${set.id}`"
					:name="`repsOrTime${set.id}`"
					autoselect="true"
					labelText="Reps / Time"
				></form-group>
				<!-- Weight -->
				<form-group
					class="list__input"
					type="text"
					v-model="set.weight"
					:id="`weight${set.id}`"
					:name="`weight${set.id}`"
					labelText="Weight"
				></form-group>
				<!-- Delete set btn -->
				<md-button
					class="md-icon-button"
					aria-label="Delete set"
					title="Delete set"
					v-if="Number(set.id.toString().split('')[2]) > 1"
					@click="onDeleteSet(movement, set)"
				>
					<md-icon class="md-accent" focusable="false"
						>remove_circle_outline</md-icon
					>
				</md-button>
			</div>
			<!-- Add set btn -->
			<md-button
				class="md-icon-button list__set-btn--add"
				aria-label="Add set"
				title="Add set"
				@click="onAddSet(movement)"
			>
				<md-icon focusable="false">add_circle_outline</md-icon>
			</md-button>
		</form>
		<!-- Add movement btn -->
		<md-button
			class="md-icon-button list__movement-btn--add"
			aria-label="Add movement"
			title="Add movement"
			@click="onAddMovement"
		>
			<md-icon focusable="false">add_box</md-icon>
		</md-button>
		<div class="list__handle"></div>
	</li>
</template>

<script>
// Components
import FormGroup from "../../utils/forms/FormGroup";

export default {
	components: {
		FormGroup
	},
	methods: {
		onDeleteExercise() {
			this.$sessionMachine.send({
				type: "DELETE_EXERCISE",
				params: { exerciseId: this.exercise.id }
			});
		},
		onAddMovement() {
			this.$sessionMachine.send({
				type: "ADD_MOVEMENT",
				params: {
					exercise: this.exercise
				}
			});
		},
		onDeleteMovement(movement) {
			this.$sessionMachine.send({
				type: "DELETE_MOVEMENT",
				params: {
					exercise: this.exercise,
					movement
				}
			});
		},
		onAddSet(movement) {
			this.$sessionMachine.send({
				type: "ADD_SET",
				params: { exercise: this.exercise, movement }
			});
		},
		onDeleteSet(movement, set) {
			this.$sessionMachine.send({
				type: "DELETE_SET",
				params: {
					exercise: this.exercise,
					movement,
					setId: set.id
				}
			});
		}
	},
	props: {
		exercise: {
			type: Object
		}
	}
};
</script>

<style scoped>
.list__exercise--editing {
	display: block;
	padding: 0.25rem 0.75rem;
	box-shadow: var(--default-box-shadow);
	background-color: var(--color-fg);
}

.list__exercise--editing + .list__exercise--editing,
.list__form + .list__form {
	margin-top: 0.75rem;
}

.list__remove-exercise-btn {
	display: block;
	margin: 0.25rem 0 0.25rem auto;
}

.list__form {
	padding: 0.25rem 0.75rem;
	background-color: var(--color-fg-light);
	box-shadow: var(--default-box-shadow);
}

.list__form--first {
	padding-top: calc(0.25rem + 40px);
}

.list__input {
	margin-top: 0.75rem;
	transition: all 0.1s linear;
}

.list__input /deep/ input {
	transition: background-color 0.1s linear;
}

.list__input /deep/ input:focus {
	background-color: var(--color-fg);
}

.list__movement-btn--delete {
	display: block;
	margin-left: auto;
}

.list__set-inputs-ctn {
	display: flex;
}

.list__set-inputs-ctn--first {
	padding-right: 40px;
}

.list__set-inputs-ctn * + * {
	margin-left: 0.25rem;
}

.list__set-inputs-ctn button {
	display: block;
	margin: 0 auto;
}

.list__set-btn--add {
	display: block;
	margin: -0.75rem auto 0;
}

.list__movement-btn--add {
	display: block;
	margin: auto;
}

.list__handle {
	width: 6rem;
	height: 8px;
	margin: 0.75rem auto;
	border-radius: var(--default-radius);
	background-color: var(--color-greyedout);
	cursor: grab;
}

.list__handle:active {
	cursor: grabbing;
}
</style>