<template>
	<button class="btn" :class="colorClass" :type="type">
		<slot />
	</button>
</template>

<script>
export default {
	computed: {
		colorClass() {
			return "btn-" + this.color;
		}
	},
	props: {
		color: {
			type: String
		},
		type: {
			type: String,
			default: "button"
		}
	}
};
</script>

<style scoped>
.btn {
	display: block;
	width: 100%;
	padding: 0.75rem;
	border-radius: var(--default-radius);
	border: 3px solid var(--color-primary);
	color: var(--color-primary);
	font-size: 1.5rem;
	position: relative;
	overflow: hidden;
}

.btn::after {
	content: "";
	position: absolute;
	left: 50%;
	top: 50%;
	width: 48rem;
	height: 48rem;
	border-radius: 50%;
	background-color: var(--color-primary);
	opacity: 0.2;
	/* transform: translateY(100%); */
	transform: translate(-50%, -50%) scale(0);
	transition: transform 0.2s ease-in;
}

.btn:active {
	outline: none;
	transform: translateY(1px);
	/* box-shadow: inset 1px 1px 4px var(--color-primary); */
}

.btn:active::after {
	/* transform: translateY(0); */
	transform: translate(-50%, -50%) scale(1);
}

.btn-dark,
.btn-dark-blue,
.btn-red,
.btn-green {
	color: var(--color-secondary);
}

.btn-dark {
	background-color: var(--color-primary);
}

.btn-dark-blue {
	background-color: var(--color-darkblue);
}

.btn-red {
	background-color: var(--color-red);
}

.btn-green {
	background-color: var(--color-green);
}
</style>
