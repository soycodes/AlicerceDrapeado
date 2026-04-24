/**
 * contactService.js
 * Handles communication with the backend email-sending API.
 * No credentials are stored or exposed on the frontend.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/**
 * Sends the contact form data to the backend.
 * @param {{ nome: string, email: string, telefone: string, mensagem: string }} data
 * @returns {Promise<void>}
 * @throws {Error} with a user-friendly message
 */
export async function sendContactForm(data) {
  // Basic rate-limit protection: store timestamp in sessionStorage
  const lastSent = sessionStorage.getItem('lastContactSent')
  if (lastSent) {
    const elapsed = Date.now() - parseInt(lastSent, 10)
    if (elapsed < 60_000) {
      throw new Error('Por favor, aguarde 1 minuto antes de enviar novamente.')
    }
  }

  const response = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // CSRF protection: custom header (same-origin requests only in browsers)
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(data),
    // Credentials sent only for same-origin (CSRF safeguard)
    credentials: 'same-origin',
  })

  if (!response.ok) {
    let message = 'Erro ao enviar mensagem. Tente novamente.'
    try {
      const json = await response.json()
      if (json?.message) message = json.message
    } catch {
      // Ignore JSON parse errors — keep generic message
    }
    throw new Error(message)
  }

  sessionStorage.setItem('lastContactSent', Date.now().toString())
}
