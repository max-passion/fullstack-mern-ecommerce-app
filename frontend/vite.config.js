import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  server: mode === 'development'
    ? {
        proxy: {
          '/api': 'http://localhost:5000',
        },
      }
    : undefined,
}))
