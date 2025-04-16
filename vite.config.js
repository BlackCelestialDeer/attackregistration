import { defineConfig } from "vite";

export default defineConfig({
	root: "src",
	server: {
		open: true, // Opens the browser automatically
	},
	build: {
		outDir: "../dist",
		emptyOutDir: true,
	}
});
