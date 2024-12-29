import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/canvas-screen",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./js"),
		},
	},
  plugins: [react()],
})
