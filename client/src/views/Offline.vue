<template>
	<section class="offline" v-if="!online">
		<!-- Logo -->
		<img src="/img/icons/icon.svg" alt="" width="144" height="144" />
		<!-- Title -->
		<h1 class="text-center">The Strength Log</h1>
		<!-- Offline message -->
		<p>
			Looks like you're <strong>offline</strong>!<br />
			Please re-establish an internet connection to continue.
		</p>
	</section>
</template>

<script>
export default {};
</script>

<style scoped>
.offline {
	margin-top: 12rem;
	text-align: center;
}

.offline img {
	display: block;
	margin: 3rem auto;
}

.offline h1 {
	font-size: 2.25rem;
}

.offline p {
	font-size: 1.5rem;
}

.offline p strong {
	color: var(--color-error);
}
</style>