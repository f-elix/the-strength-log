/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
	register(`${process.env.BASE_URL}service-worker.js`, {
		ready() {
			console.log(
				"App is being served from cache by a service worker.\n" +
					"For more details, visit https://goo.gl/AFskqB"
			);
		},
		registered() {
			console.log("Service worker has been registered.");
		},
		cached() {
			console.log("Content has been cached for offline use.");
		},
		updatefound() {
			console.log("New content is downloading.");
		},
		updated(registration) {
			console.log("New content is available; please refresh.");
			const updateBanner = document.getElementById("update-banner");
			const updateButton = document.getElementById("update-button");
			const dismissButton = document.getElementById("dismiss-button");

			updateBanner.style.display = "block";
			updateButton.addEventListener("click", () => {
				registration.waiting.postMessage({ type: "SKIP_WAITING" });
				window.location.reload();
			});
			dismissButton.addEventListener("click", () => {
				updateBanner.style.display = "none";
			});
		},
		offline() {
			console.log("No internet connection found. App is running in offline mode.");
		},
		error(error) {
			console.error("Error during service worker registration:", error);
		}
	});
}
