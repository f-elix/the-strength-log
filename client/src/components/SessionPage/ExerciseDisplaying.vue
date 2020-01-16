<template>
	<li class="list__row">
		<div
			class="list__movement"
			v-for="movement in exercise.movements"
			:key="movement.id"
		>
			<div class="list__movement-name">
				{{ movement.name }}
			</div>
			<div class="list__set" v-for="set in movement.sets" :key="set.id">
				<div>{{ set.setQty }}</div>
				<div>{{ set.repsOrTime }}</div>
				<div>{{ set.weight }}</div>
			</div>
		</div>
	</li>
</template>

<script>
// Vuex
import { mapState } from "vuex";

export default {
	computed: {
		...mapState({
			sessionState: state => state.session.currentState
		})
	},
	props: {
		exercise: {
			type: Object
		}
	}
};
</script>

<style scoped>
.list__row,
.list__movement {
	grid-column: 1 / 5;
	display: grid;
	grid-template-columns: 1fr repeat(3, 20%);
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

.list__movement {
	grid-gap: 0.25rem;
}

.list__movement-name {
	padding-right: 0.75rem;
}

.list__set {
	display: grid;
	grid-column: 2 / 5;
	grid-template-columns: repeat(3, 1fr);
}
</style>