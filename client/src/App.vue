<template>
	<div id="app">
		<offline v-if="!online" />
		<update-banner />
		<transition name="page-transition">
			<router-view v-if="online"> </router-view>
		</transition>
	</div>
</template>

<script>
// components
import Offline from "./views/Offline";
import UpdateBanner from "./components/utils/UpdateBanner";

export default {
	name: "app",
	components: {
		Offline,
		UpdateBanner
	},
	data() {
		return {
			online: navigator.onLine
		};
	},
	created() {
		window.addEventListener("offline", () => {
			this.online = false;
		});
		window.addEventListener("online", () => {
			this.online = true;
		});
	}
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
