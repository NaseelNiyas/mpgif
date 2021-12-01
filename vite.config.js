import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), crossOriginIsolation()]
})
