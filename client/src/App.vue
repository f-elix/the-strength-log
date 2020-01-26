<template>
	<div id="app">
		<transition name="page-transition">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: "app"
};
</script>

<style scoped>
#app {
	overflow: hidden;
}

.page-transition-enter {
	opacity: 0;
	transform: translateX(1.5rem);
}

.page-transition-enter-active {
	transition: transform 0.2s ease-out, opacity 0.2s linear;
}
</style>
