import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
	root: "src",
	server: {
		open: true, // Opens the browser automatically
	},
	plugins: [viteSingleFile()],
	build: {
		assetsInlineLimit: Infinity, // optional but helps
		outDir: "../dist",
		emptyOutDir: true,
	}
});
