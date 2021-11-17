import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA } from "vite-plugin-pwa"
import { resolve } from "path"

export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			base: "/",
			includeAssets: ["img/**/*.*", "fonts/**/*.*"],
			manifest: {
				"name": "Complect App",
				"short_name": "Complect",
				"start_url": "/",
				"display": "standalone",
				"background_color": "#fff",
				"theme_color": "#fff"
			}
		})
	],
	server: {
		port: 5001,
		host: "0.0.0.0",
		hmr: {
			host: "localhost",
			port: 81,
		}
	},
	build: {
		chunkSizeWarningLimit: 100,
		manifest: true,
	},
	resolve: {
		alias: {
			"~": resolve(__dirname, "src")
		}
	}
})