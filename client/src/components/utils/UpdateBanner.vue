<template>
	<div id="update-banner" class="banner">
		<p>
			There's a new version of <strong>The Strength Log</strong>.<br />
			Simply reload the app to access it.
		</p>
		<md-button class="app__btn--small action" id="update-button"
			>Reload</md-button
		>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.banner {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	width: 100%;
	padding: 0.25rem 0;
	text-align: center;
	background-color: var(--color-fg);
}

.banner p {
	font-size: 1.25rem;
}

.banner p strong {
	color: var(--color-info);
}

.banner button {
	margin: 1.5rem auto;
}
</style>