importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({ prefix: "the-strength-log" });

// Cache Google fonts:
workbox.routing.registerRoute(
	new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
	workbox.strategies.cacheFirst({
		cacheName: "googleapis",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 30,
				maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
			})
		]
	})
);

self.addEventListener("message", event => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		console.log(event.data);
		self.skipWaiting();
	}
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
