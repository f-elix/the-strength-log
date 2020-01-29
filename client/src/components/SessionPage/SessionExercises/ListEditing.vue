<template>
	<draggable
		class="list--editing"
		tag="ul"
		v-model="exercises"
		v-bind="dragOptions"
		@start="onDrag"
		@end="onDrop"
	>
		<transition-group
			class="list--editing"
			tag="div"
			:name="
				!sessionState.matches('editing.dragging') ? 'exercise' : null
			"
			mode="out-in"
		>
			<exercise-editing
				v-for="exercise in exercises"
				:key="exercise.id"
				:exercise="exercise"
			/>
		</transition-group>
	</draggable>
</template>

<script>
// Components
import ExerciseEditing from "./ExerciseEditing";
import draggable from "vuedraggable";

export default {
	components: {
		ExerciseEditing,
		draggable
	},
	computed: {
		sessionState() {
			return this.$sessionMachine.current;
		},
		exercises: {
			get() {
				return this.$sessionMachine.context.sessionData.exercises;
			},
			set(value) {
				this.$sessionMachine.send({
					type: "UPDATE_EXERCISES",
					params: { exercises: value }
				});
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
		onDrag() {
			this.$sessionMachine.send({ type: "DRAG" });
		},
		onDrop() {
			this.$sessionMachine.send({ type: "DROP" });
		}
	}
};
</script>

<style scoped>
.list--editing {
	margin: 0;
}

.ghost {
	opacity: 0.4;
}

.dragging {
	opacity: 1;
	border-color: var(--color-primary);
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