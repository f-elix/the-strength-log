<template>
	<p
		:class="{
			'error-message--form': from === 'form',
			'error-message--server': from === 'server'
		}"
	>
		<slot />
	</p>
</template>

<script>
export default {
	props: {
		from: {
			type: String,
			default: "form"
		}
	}
};
</script>

<style scoped>
.error-message--form {
	margin: -1.25rem 0 2.25rem;
	color: var(--color-error);
}

.error-message--server {
	margin: 1.5rem auto;
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
	color: var(--color-error);
}
</style>