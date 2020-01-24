<template>
	<table class="list">
		<thead>
			<tr class="list__header">
				<th>
					Set(s)
				</th>
				<th>
					Rep(s)
				</th>
				<th>
					Weight
				</th>
			</tr>
		</thead>
		<tbody
			class="exercise"
			v-for="exercise in exercises"
			:key="exercise.id"
		>
			<td colspan="3">
				<table
					v-for="movement in exercise.movements"
					:key="movement.id"
				>
					<tr class="movement__name">
						<td colspan="3">
							{{ movement.name }}
						</td>
					</tr>
					<tr v-for="set in movement.sets" class="set">
						<td>{{ set.setQty }}</td>
						<td>{{ set.repsOrTime }}</td>
						<td>{{ set.weight }}</td>
					</tr>
				</table>
			</td>
		</tbody>
	</table>
</template>

<script>
// Vuex
import { mapState } from "vuex";

export default {
	computed: {
		...mapState({
			exercises: state => state.session.sessionData.exercises
		})
	}
};
</script>

<style scoped>
.list {
	box-shadow: var(--default-box-shadow);
}

.list__header th {
	padding: 0.75rem;
	background-color: var(--color-fg-dark);
}

.exercise {
	background-color: var(--color-fg-light);
}

.exercise:nth-of-type(even) {
	background-color: var(--color-fg);
}

.movement__name td {
	padding: 0.5rem;
	font-weight: bold;
}

.set td {
	width: calc(100% / 3);
	text-align: center;
}
</style>