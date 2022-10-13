import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	root: "./ui-src",
  assetsInclude: ['**/*.png', '**/*.svg'],
	plugins: [
		reactRefresh(),
		viteSingleFile(),
		svgr(),
  ],
	build: {
		target: "esnext",
		assetsInlineLimit: 100000000,
		chunkSizeWarningLimit: 100000000,
		cssCodeSplit: false,
		brotliSize: false,
		outDir: "../dist",
		rollupOptions: {
			inlineDynamicImports: true,
			output: {
				manualChunks: () => "everything.js",
				assetFileNames: ({ name }) => {
					if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
						return "assets/images/[name]-[hash][extname]";
					}

					if (/\.css$/.test(name ?? "")) {
						return "assets/css/[name]-[hash][extname]";
					}

					if (/\.woff?2$/.test(name ?? "")) {
						return "assets/woff/[name]-[hash][extname]";
					}

					// default value
					// ref: https://rollupjs.org/guide/en/#outputassetfilenames
					return "assets/[name]-[hash][extname]";
				},
			},
		},
	},
});
