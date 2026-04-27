/**
 * services/mailer.js — Resend SDK
 * API key lida apenas de variável de ambiente. Nunca exposta ao frontend.
 */
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('[MAILER] RESEND_API_KEY ausente no .env')
}

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

function buildHTML({ nome, email, telefone, mensagem }) {
  const n = escapeHtml(nome), e = escapeHtml(email)
  const t = escapeHtml(telefone), m = escapeHtml(mensagem).replace(/\n/g,'<br/>')
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f2ee;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ee;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;box-shadow:0 4px 40px rgba(0,0,0,0.08);">
  <tr><td style="background:#0c0c0b;padding:36px 48px;">
    <span style="font-family:Georgia,serif;font-size:28px;color:#fff;font-weight:700;">Alicerce Drapeado</span>
    <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#c4922a;vertical-align:top;margin-left:3px;margin-top:6px;"></span>
    <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:3px;text-transform:uppercase;">Construtora</p>
  </td></tr>
  <tr><td style="height:3px;background:linear-gradient(90deg,#c4922a,#d4a853);"></td></tr>
  <tr><td style="padding:48px 48px 24px;">
    <p style="margin:0 0 10px;font-size:11px;color:#c4922a;letter-spacing:3px;text-transform:uppercase;font-weight:600;">── Nova mensagem recebida</p>
    <h1 style="margin:0;font-family:Georgia,serif;font-size:30px;color:#0c0c0b;font-weight:400;">Solicitação de Contato</h1>
  </td></tr>
  <tr><td style="padding:0 48px;"><div style="height:1px;background:#ebe7e0;"></div></td></tr>
  <tr><td style="padding:32px 48px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f0ece4;width:130px;"><span style="font-size:10px;color:#9a8167;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Nome</span></td>
        <td style="padding:14px 0;border-bottom:1px solid #f0ece4;"><span style="font-size:15px;color:#0c0c0b;font-weight:500;">${n}</span></td>
      </tr>
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f0ece4;"><span style="font-size:10px;color:#9a8167;letter-spacing:2px;text-transform:uppercase;font-weight:600;">E-mail</span></td>
        <td style="padding:14px 0;border-bottom:1px solid #f0ece4;"><a href="mailto:${e}" style="font-size:15px;color:#c4922a;text-decoration:none;">${e}</a></td>
      </tr>
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f0ece4;"><span style="font-size:10px;color:#9a8167;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Telefone</span></td>
        <td style="padding:14px 0;border-bottom:1px solid #f0ece4;"><a href="tel:${t}" style="font-size:15px;color:#0c0c0b;text-decoration:none;">${t}</a></td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:0 48px 40px;">
    <p style="margin:0 0 14px;font-size:10px;color:#9a8167;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Mensagem</p>
    <div style="background:#f9f7f4;border-left:3px solid #c4922a;padding:24px;">
      <p style="margin:0;font-size:15px;color:#141412;line-height:1.8;">${m}</p>
    </div>
  </td></tr>
  <tr><td style="padding:0 48px 48px;">
    <a href="mailto:${e}" style="display:inline-block;background:#c4922a;color:#fff;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:16px 32px;text-decoration:none;">Responder Agora</a>
  </td></tr>
  <tr><td style="background:#0c0c0b;padding:28px 48px;text-align:center;">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.7;">
      Mensagem enviada via formulário do site.<br/>
      Alicerce Drapeado &middot; Rua do Alto Alentejo, nº 183, 1ºDto &middot; Montijo, Setúbal &middot;
    </p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`
}

function buildText({ nome, email, telefone, mensagem }) {
  return `Alicerce Drapeado  — Nova mensagem\n${'='.repeat(40)}\nNome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}\n\n--\nAlicerce Drapeado · Montijo, Setúbal`
}

/**
 * @param {{ nome, email, telefone, mensagem }} data - já sanitizados
 */
export async function sendContactEmail(data) {
  if (!process.env.MAIL_TO) throw new Error('[MAILER] MAIL_TO não definido no .env')

  const { data: result, error } = await resend.emails.send({
    from:    process.env.MAIL_FROM || 'Alicerce Drapeado <onboarding@resend.dev>',
    to:      [process.env.MAIL_TO],
    replyTo: data.email,
    subject: `[Alicerce Drapeado] Nova mensagem de ${data.nome}`,
    html:    buildHTML(data),
    text:    buildText(data),
    headers: { 'X-Source': 'alicerce-Drapeado-contact-form' },
  })

  if (error) {
    console.error('[MAILER] Resend error:', JSON.stringify(error))
    throw new Error('Falha no envio via Resend.')
  }

  console.log(`[MAILER] Enviado com sucesso. ID: ${result.id}`)
  return result
}
