// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // <--- THIS IS THE KEY LINE FOR MAC
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5001',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from Mobile/Network
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001', // 127.0.0.1 is required for Mac M1
        changeOrigin: true,
        secure: false,
      },
    },
  },
})