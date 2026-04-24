import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'
import { sendContactForm } from '../../services/contactService'
import AnimatedSection from '../ui/AnimatedSection'

export default function ContatoSection() {
  const { t } = useTranslation()
  const [status, setStatus]           = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onBlur' })

  const contactInfo = [
    { icon: MapPin, label: t('contact.address'), value: 'Av. Paulista, 1000 — São Paulo, SP' },
    { icon: Phone,  label: t('contact.phone'),   value: '(11) 9999-0000', href: 'tel:+551199990000' },
    { icon: Mail,   label: t('contact.email'),   value: 'contato@construtoraedifica.com.br', href: 'mailto:contato@construtoraedifica.com.br' },
    { icon: Clock,  label: t('contact.hours'),   value: t('contact.hoursValue') },
  ]

  const onSubmit = async (data) => {
    if (data.website) return
    setStatus('loading')
    setErrorMessage('')

    const sanitized = {
      nome:     DOMPurify.sanitize(data.nome.trim()),
      email:    DOMPurify.sanitize(data.email.trim()),
      telefone: DOMPurify.sanitize(data.telefone.trim()),
      mensagem: DOMPurify.sanitize(data.mensagem.trim()),
    }

    try {
      await sendContactForm(sanitized)
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'Erro. Tente novamente.')
    }
  }

  return (
    <section className="py-24 md:py-36 bg-dark-900 overflow-hidden" aria-label={t('contact.label')}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: info */}
          <AnimatedSection animation="slideRight">
            <div className="section-label text-gold-400">{t('contact.label')}</div>
            <h2 className="section-title-light mt-4 mb-8">
              {t('contact.title1')}<br />
              <em className="not-italic text-gold-400">{t('contact.title2')}</em>
            </h2>
            <p className="font-body text-white/50 text-base leading-relaxed mb-12">{t('contact.subtitle')}</p>

            <address className="not-italic space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold-500" />
                  </div>
                  <div>
                    <span className="font-body text-[10px] text-white/30 tracking-widest uppercase block mb-1">{label}</span>
                    {href
                      ? <a href={href} className="font-body text-white/70 text-sm hover:text-gold-400 transition-colors">{value}</a>
                      : <span className="font-body text-white/70 text-sm">{value}</span>
                    }
                  </div>
                </div>
              ))}
            </address>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection animation="slideLeft" delay={0.15}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-6 py-20 text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle size={36} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl text-white mb-3">{t('contact.form.successTitle')}</h3>
                    <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{t('contact.form.successDesc')}</p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="btn-outline-light text-xs py-3 px-6">
                    {t('contact.form.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10" aria-label={t('contact.label')}>

                  {/* Honeypot */}
                  <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                    <input type="text" autoComplete="off" tabIndex={-1} {...register('website')} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Nome */}
                    <div>
                      <label className="font-body text-[10px] text-white/40 tracking-widest uppercase block mb-2" htmlFor="nome">
                        {t('contact.form.name')} *
                      </label>
                      <input id="nome" type="text" autoComplete="name"
                        className={`input-field-light ${errors.nome ? 'border-red-400' : ''}`}
                        placeholder={t('contact.form.namePlaceholder')}
                        {...register('nome', {
                          required: t('contact.form.errors.nameRequired'),
                          minLength: { value: 2, message: t('contact.form.errors.nameMin') },
                          maxLength: { value: 100, message: t('contact.form.errors.nameMax') },
                        })} />
                      {errors.nome && (
                        <p className="font-body text-xs text-red-400 mt-2 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.nome.message}
                        </p>
                      )}
                    </div>

                    {/* Telefone */}
                    <div>
                      <label className="font-body text-[10px] text-white/40 tracking-widest uppercase block mb-2" htmlFor="telefone">
                        {t('contact.form.phoneField')} *
                      </label>
                      <input id="telefone" type="tel" autoComplete="tel"
                        className={`input-field-light ${errors.telefone ? 'border-red-400' : ''}`}
                        placeholder={t('contact.form.phonePlaceholder')}
                        {...register('telefone', {
                          required: t('contact.form.errors.phoneRequired'),
                          pattern: { value: /^[\d\s()\-+]{8,20}$/, message: t('contact.form.errors.phoneInvalid') },
                        })} />
                      {errors.telefone && (
                        <p className="font-body text-xs text-red-400 mt-2 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.telefone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-body text-[10px] text-white/40 tracking-widest uppercase block mb-2" htmlFor="email">
                      {t('contact.form.emailField')} *
                    </label>
                    <input id="email" type="email" autoComplete="email"
                      className={`input-field-light ${errors.email ? 'border-red-400' : ''}`}
                      placeholder={t('contact.form.emailPlaceholder')}
                      {...register('email', {
                        required: t('contact.form.errors.emailRequired'),
                        pattern: { value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/, message: t('contact.form.errors.emailInvalid') },
                        maxLength: { value: 254, message: t('contact.form.errors.emailMax') },
                      })} />
                    {errors.email && (
                      <p className="font-body text-xs text-red-400 mt-2 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="font-body text-[10px] text-white/40 tracking-widest uppercase block mb-2" htmlFor="mensagem">
                      {t('contact.form.message')} *
                    </label>
                    <textarea id="mensagem" rows={5}
                      className={`input-field-light resize-none ${errors.mensagem ? 'border-red-400' : ''}`}
                      placeholder={t('contact.form.messagePlaceholder')}
                      {...register('mensagem', {
                        required: t('contact.form.errors.messageRequired'),
                        minLength: { value: 10, message: t('contact.form.errors.messageMin') },
                        maxLength: { value: 2000, message: t('contact.form.errors.messageMax') },
                      })} />
                    {errors.mensagem && (
                      <p className="font-body text-xs text-red-400 mt-2 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.mensagem.message}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 font-body text-sm">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <button type="submit" disabled={status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'loading'
                      ? <><Loader2 size={16} className="animate-spin" /> {t('contact.form.sending')}</>
                      : <><Send size={16} /> {t('contact.form.submit')}</>
                    }
                  </button>

                  <p className="font-body text-[11px] text-white/25 text-center leading-relaxed">
                    {t('contact.form.privacy')}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
