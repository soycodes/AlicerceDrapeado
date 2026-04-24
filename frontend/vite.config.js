import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

const BASE = 'https://www.construtoraedifica.com.br'
const LANGS = ['pt-br', 'pt', 'es', 'en']
const PAGES = ['', '/sobre', '/servicos', '/projetos', '/contato']

// Generate all localised routes for sitemap
const routes = LANGS.flatMap(lang =>
  PAGES.map(page => `/${lang}${page}`)
)

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: BASE,
      routes,
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor:   ['react', 'react-dom', 'react-router-dom'],
          i18n:     ['i18next', 'react-i18next'],
          motion:   ['framer-motion'],
        },
      },
    },
  },
})
