import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  
  server: {
    cors: true,
  },
  experimental: {
  renderBuiltUrl(filename, { hostType }) {
    if (hostType === 'js') {
      const asset = filename.replace(/^assets\//, '')

      return {
        runtime: `new URL('./${asset}', import.meta.url).href`,
      }
    }

    return { relative: true }
  },
  },

  build: {
  target: 'esnext',
  cssCodeSplit: false,
  modulePreload: false,
  rollupOptions: {
     output: {
       assetFileNames: 'assets/[name]-[hash][extname]',
       // Important part:
       // Make emitted assets resolve relative to the file importing them.
       experimentalMinChunkSize: undefined,
     },
   },
},
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './ViteExperiment': './src/App.tsx'
      },
      shared: ['react', 'react-dom'],
      
    }),
  ],
})