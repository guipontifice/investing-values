import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  devServer: {
    hot: true
  },
  server: {
    proxy: {
      '/api/stocks': 'http://localhost:3000',
      }
  }

})
