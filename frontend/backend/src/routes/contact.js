/**
 * routes/contact.js
 * POST /api/contact — valida e envia e-mail de contato.
 */

import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { sendContactEmail } from '../services/mailer.js'
import { sanitizeInput } from '../utils/sanitize.js'

export const contactRouter = Router()

// ─── Validation rules ─────────────────────────────────────────────
const contactValidation = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório.')
    .isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres.')
    .matches(/^[\p{L}\p{M}\s\-'.]+$/u).withMessage('Nome contém caracteres inválidos.'),

  body('email')
    .trim()
    .notEmpty().withMessage('E-mail é obrigatório.')
    .isEmail().withMessage('E-mail inválido.')
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage('E-mail muito longo.'),

  body('telefone')
    .trim()
    .notEmpty().withMessage('Telefone é obrigatório.')
    .matches(/^[\d\s()\-+]{8,20}$/).withMessage('Telefone inválido.'),

  body('mensagem')
    .trim()
    .notEmpty().withMessage('Mensagem é obrigatória.')
    .isLength({ min: 10, max: 2000 }).withMessage('Mensagem deve ter entre 10 e 2000 caracteres.'),
]

// ─── Honeypot check middleware ────────────────────────────────────
const honeypotCheck = (req, res, next) => {
  // If the hidden "website" field is filled, it's a bot — silently accept (don't let bots know they were caught)
  if (req.body.website) {
    return res.status(200).json({ message: 'Mensagem recebida com sucesso!' })
  }
  next()
}

// ─── CSRF check: require custom header sent only by our frontend ──
const csrfCheck = (req, res, next) => {
  const requested = req.headers['x-requested-with']
  if (requested !== 'XMLHttpRequest') {
    return res.status(403).json({ message: 'Acesso negado.' })
  }
  next()
}

// ─── POST /api/contact ────────────────────────────────────────────
contactRouter.post(
  '/contact',
  csrfCheck,
  honeypotCheck,
  contactValidation,
  async (req, res) => {
    // Return validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0].msg,
        errors: errors.array(),
      })
    }

    // Sanitize data before sending
    const data = {
      nome:     sanitizeInput(req.body.nome),
      email:    sanitizeInput(req.body.email),
      telefone: sanitizeInput(req.body.telefone),
      mensagem: sanitizeInput(req.body.mensagem),
    }

    try {
      await sendContactEmail(data)
      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' })
    } catch (err) {
      console.error('[MAILER ERROR]', err)
      return res.status(500).json({
        message: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
      })
    }
  },
)
