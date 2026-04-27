# AlicerceDrapeado — v2.0

Site institucional multilíngue com React + Vite (frontend) e Node.js + Express + **Resend** (backend).

---

## 🆕 O que há de novo na v2

| Feature | Detalhe |
|---------|---------|
| **Resend** | Substituiu Nodemailer — API moderna, confiável, sem SMTP |
| **i18n completo** | 4 idiomas: pt-BR 🇧🇷, pt 🇵🇹, es 🇪🇸, en 🇺🇸 |
| **Rotas por idioma** | `/pt-br/`, `/pt/`, `/es/`, `/en/` |
| **hreflang** | Tags SEO para todos os idiomas em cada página |
| **Language switcher** | Dropdown elegante no header |
| **Persistência** | Idioma salvo em localStorage |
| **Detecção automática** | URL → localStorage → browser → fallback |
| **Sitemap multi-lang** | Gerado automaticamente no build |

---

## 📁 Estrutura

```
construtora/
├── frontend/
│   └── src/
│       ├── locales/
│       │   ├── pt-br.json   ← Português Brasil
│       │   ├── pt.json      ← Português Portugal
│       │   ├── es.json      ← Español
│       │   └── en.json      ← English
│       ├── i18n.js          ← Configuração centralizada
│       ├── components/
│       │   └── ui/
│       │       └── LanguageSwitcher.jsx
│       └── ...
└── backend/
    └── src/
        └── services/
            └── mailer.js    ← Resend SDK
```

---

## 🚀 Instalação

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# → http://localhost:5173  (redireciona para /pt-br)
```

### Backend
```bash
cd backend
npm install
cp .env.example .env    # editar com sua RESEND_API_KEY
npm run dev
# → http://localhost:3001
```

---

## 📧 Configurar Resend (envio de e-mail)

1. Crie conta gratuita em **https://resend.com** (100 e-mails/dia grátis)
2. No dashboard: **API Keys → Create API Key**
3. Copie a chave (começa com `re_`)
4. No `backend/.env`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MAIL_TO=seu@email.com.br
MAIL_FROM=Alicerce Drapeado Construtora <noreply@seudominio.com>
```

> **Domínio personalizado**: Em produção, verifique seu domínio em Resend → Domains.
> Em testes, use `MAIL_FROM=onboarding@resend.dev` (domínio já verificado pelo Resend).

---

## 🌍 Sistema i18n — Como funciona

### Rotas
| URL | Idioma |
|-----|--------|
| `/` | → redirect automático |
| `/pt-br` | Português Brasil |
| `/pt` | Português Portugal |
| `/es` | Español |
| `/en` | English |

### Detecção de idioma (ordem de prioridade)
1. **URL path** — `/en/sobre` → inglês
2. **localStorage** — idioma escolhido anteriormente
3. **Browser language** — `navigator.language`
4. **Fallback** — `pt-br`

### Adicionar novo idioma
1. Crie `src/locales/de.json` copiando `en.json`
2. Traduza os valores
3. Em `i18n.js`, adicione em `SUPPORTED_LANGUAGES` e em `resources`
4. As rotas e o sitemap são gerados automaticamente

### Adicionar nova chave de tradução
1. Adicione a chave nos 4 arquivos `.json`
2. Use nos componentes: `const { t } = useTranslation(); t('sua.chave')`

---

## 🔒 Segurança implementada

### Resend vs SMTP
| Critério | SMTP (Nodemailer) | Resend |
|----------|-------------------|--------|
| Credenciais | Usuário + senha | API key rotacionável |
| Autenticação | PLAIN/LOGIN | Bearer token |
| TLS | Configuração manual | Sempre ativo |
| Rate limit | Depende do provedor | Embutido |
| Logs | Nenhum | Dashboard com histórico |
| Bounce handling | Manual | Automático |

### Camadas de segurança do formulário
- **Honeypot** — campo invisível que bots preenchem
- **CSRF** — header `X-Requested-With` obrigatório
- **Rate limit** — 5 envios / 15 min por IP (backend) + sessionStorage (frontend)
- **Validação dupla** — react-hook-form (client) + express-validator (server)
- **Sanitização** — DOMPurify (frontend) + regex strip (backend)
- **Escape HTML** — todas as variáveis no template do e-mail são escapadas
- **Helmet** — security headers no Express
- **CORS restrito** — apenas origens permitidas

---

## 🔍 SEO multilingue

Cada página renderiza automaticamente:
```html
<html lang="pt-BR">
<link rel="canonical" href="https://www.alicercedrapeado.com/pt-br/sobre" />
<link rel="alternate" hreflang="pt-BR" href=".../pt-br/sobre" />
<link rel="alternate" hreflang="pt-PT" href=".../pt/sobre" />
<link rel="alternate" hreflang="es"    href=".../es/sobre" />
<link rel="alternate" hreflang="en"    href=".../en/sobre" />
<link rel="alternate" hreflang="x-default" href=".../pt-br/sobre" />
```

---

## 🚢 Deploy

### Frontend (Vercel)
```bash
cd frontend && npm run build
# Deploy pasta dist/
# Configure: Vite → Output dir: dist
```

### Backend (Railway / Render)
```bash
# Variáveis de ambiente no painel:
RESEND_API_KEY=re_xxx
MAIL_TO=seu@email.com
MAIL_FROM=Alicerce Drapeado <noreply@seudominio.com>
ALLOWED_ORIGINS=https://www.alicercedrapeado.com
NODE_ENV=production
```

### Nginx (VPS)
```nginx
# Redirecionar / para /pt-br
location = / {
  return 302 /pt-br;
}
```
