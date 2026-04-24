/**
 * server.js — Entry point do backend Edifica Construtora
 * Express + Nodemailer com segurança, rate limiting e validação.
 */

import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { contactRouter } from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 3001

// ─── Security headers ──────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'"],
    },
  },
}))

// ─── CORS ──────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.) in dev
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Requested-With'],
  credentials: true,
}))

// ─── Body parsing ──────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })) // Prevent large payload attacks

// ─── Global rate limiting ──────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '5'),
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Muitas requisições. Tente novamente mais tarde.' },
})
app.use('/api', globalLimiter)

// ─── Health check ──────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }))

// ─── Routes ────────────────────────────────────────────────────────
app.use('/api', contactRouter)

// ─── 404 ───────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ message: 'Rota não encontrada.' }))

// ─── Global error handler ──────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message)
  res.status(500).json({ message: 'Erro interno do servidor.' })
})

// ─── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Backend Edifica rodando em http://localhost:${PORT}`)
  console.log(`   Ambiente: ${process.env.NODE_ENV || 'development'}`)
  console.log(`   SMTP: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`)
})
