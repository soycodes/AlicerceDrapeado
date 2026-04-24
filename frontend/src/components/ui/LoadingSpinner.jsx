import { useTranslation } from 'react-i18next'

export default function LoadingSpinner() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-100" role="status" aria-label={t('loading')}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-dark-900/20 border-t-gold-500 rounded-full animate-spin" />
        <span className="font-body text-xs tracking-widest uppercase text-dark-500">{t('loading')}</span>
      </div>
    </div>
  )
}
