import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), eslint(), svgr()],

  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
