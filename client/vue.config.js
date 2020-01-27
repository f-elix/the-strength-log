module.exports = {
	pwa: {
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swDest: "service-worker.js",
			swSrc: "src/assets/sw-base.js",
			exclude: ["_redirects"]
		},
		name: "The Strength Log",
		themeColor: "#121212",
		msTileColor: "#121212",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "black"
	}
};
