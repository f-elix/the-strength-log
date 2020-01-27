importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({ prefix: "the-strength-log" });

workbox.routing.registerRoute(
	function(routeData) {
		return routeData.event.request.headers.get("accept").includes("text/html");
	},
	function(args) {
		return caches.match(args.event.request).then(function(response) {
			if (response) {
				return response;
			} else {
				return fetch(args.event.request)
					.then(function(res) {
						return caches.open("dynamic").then(function(cache) {
							cache.put(args.event.request.url, res.clone());
							return res;
						});
					})
					.catch(function(err) {
						return caches.match(workbox.precaching.getCacheKeyForURL("/offline.html")).then(function(res) {
							return res;
						});
					});
			}
		});
	}
);

self.addEventListener("message", event => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
