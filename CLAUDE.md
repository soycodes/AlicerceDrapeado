# CLAUDE.md — Contexto do Projeto

> Documento de mapa do projeto para sessões futuras do Claude. Leia isto antes de explorar o código — ele indica exatamente quais arquivos abrir para cada tipo de alteração, evitando reanálise completa do repositório.

## Visão Geral do Projeto

Site institucional (marketing) de uma construtora, com múltiplos idiomas, portfólio de projetos, seções de serviços/diferenciais e um formulário de contato que envia e-mail via um backend externo (não incluído neste repositório).

É um site 100% estático do ponto de vista de conteúdo (dados de projetos e textos hardcoded/JSON), sem CMS nem banco de dados no frontend. A única integração dinâmica é o envio do formulário de contato para uma API externa.

**Branding consolidado (histórico: projeto foi renomeado de "Edifica Construtora"):**
O site já foi 100% migrado para a identidade **Alicerce Drapeado** (Portugal). Todos os pontos abaixo estão consistentes no código atual:
- Nome: "Alicerce Drapeado" — em `index.html` (title, meta tags, JSON-LD), `Header.jsx`, `Footer.jsx`, `ContatoSection.jsx`, `SobrePage.jsx` e nos 4 arquivos de `src/locales/`.
- Endereço: Rua do Alto Alentejo, nº 183, 1ºDto, 2870-301 Montijo, Setúbal, Portugal.
- Telefone: `+351 926 502 295`.
- E-mail: `contato@alicercedrapeado.com`.
- Domínio: `https://www.alicercedrapeado.com` — usado em `index.html`, `vite.config.js` (`BASE`) e `useSEO.jsx` (`BASE_URL`).
- `package.json` ainda mantém `name: "construtora-frontend"` (nome de pacote npm, não é branding visível ao usuário — não foi alterado).
- Único resíduo textual remanescente: `projetosData.js` (portfólio de obras) ainda lista projetos localizados em São Paulo/SP (Alphaville, Cajamar, Santo André, Campinas). São dados fictícios de case studies, não a identidade da empresa — não foram reescritos para não inventar novos projetos/localizações em Portugal sem informação real. Avisar o usuário se ele quiser um portfólio consistente com a nova sede.
- `localStorage` agora usa a chave `alicerce_drapeado_lang` (antes era `edifica_lang`).

## Stack Tecnológica

- **React 18** (`react`, `react-dom`) com **Vite** como bundler/dev server (`vite ^8`, `@vitejs/plugin-react`).
- **React Router v6** (`react-router-dom`) — rotas client-side com prefixo de idioma.
- **i18next / react-i18next** — internacionalização (pt-br, pt, es, en).
- **Tailwind CSS 3** + PostCSS/Autoprefixer — estilização via classes utilitárias e camada `@layer components` customizada.
- **Framer Motion** — animações de entrada/scroll e transições de menu.
- **react-hook-form** — validação e estado do formulário de contato.
- **DOMPurify** — sanitização client-side dos campos do formulário antes do envio.
- **react-helmet-async** — tags de `<head>` (SEO, hreflang, Open Graph).
- **react-intersection-observer** — trigger de animações ao entrar na viewport.
- **lucide-react** — ícones.
- **vite-plugin-sitemap** — geração de sitemap com rotas localizadas no build.
- **resend** (dependência listada no frontend, mas usada de fato no backend — ver seção Pontos de Atenção) — envio de e-mail transacional.
- Não há framework de testes configurado (nenhum script `test` em `package.json`, nenhum arquivo de teste encontrado).

## Arquitetura

Repositório com um único pacote: `frontend/` (SPA React). **Não existe backend neste repositório** — o backend (API de contato) é um serviço separado, referenciado apenas via variável de ambiente `VITE_API_URL` e comentários em `.env`. Se o usuário pedir para alterar a lógica de envio de e-mail, backend, rate limiting no servidor, etc., esse código não está neste projeto e precisa ser localizado/criado separadamente.

Fluxo de alto nível:
1. `index.html` carrega `src/main.jsx`.
2. `main.jsx` importa `i18n.js` (inicializa i18next) antes de renderizar `App.jsx`, envolvido por `HelmetProvider`.
3. `App.jsx` define as rotas via `react-router-dom`, todas prefixadas por `/:lang` (pt | en | es | pt-br). A raiz `/` redireciona para o idioma detectado.
4. Cada rota renderiza uma página (`src/pages/*.jsx`) dentro do `Layout` (`Header` + conteúdo + `Footer` + `BackToTop`).
5. Páginas compõem "sections" (`src/components/sections/*.jsx`), que consomem textos via `useTranslation()` (i18next) e, quando aplicável, dados estáticos de `src/services/*.js`.
6. SEO por página é definido chamando `<SEOHead titleKey=... descKey=... pagePath=... />` (hook `src/hooks/useSEO.jsx`), que gera `<title>`, meta description, canonical e tags `hreflang` para os 4 idiomas.

## Estrutura de Diretórios

```
AlicerceDrapeado/
├── CLAUDE.md
├── .gitignore
└── frontend/                      # SPA React (único pacote do repo)
    ├── index.html                 # HTML raiz, meta tags SEO, JSON-LD, fontes
    ├── vite.config.js             # Config Vite: plugin React, sitemap, aliases, code-splitting
    ├── tailwind.config.js         # Tema Tailwind: cores da marca, fontes, animações
    ├── postcss.config.js
    ├── package.json
    ├── vercel.json                # Rewrite p/ SPA fallback (serve index.html em qualquer rota) — hospedagem: Vercel
    ├── .env                       # Variáveis locais (NÃO versionado; ver .gitignore). Não há mais .env.example no repo.
    ├── public/                    # Assets estáticos servidos como estão (favicon etc.)
    ├── dist/                      # Build de produção (gerado, não editar manualmente)
    └── src/
        ├── main.jsx                # Entry point React
        ├── App.jsx                 # Definição de rotas (react-router-dom)
        ├── i18n.js                 # Config i18next, detecção/troca de idioma, util de rota
        ├── styles/globals.css      # Tailwind base + camada de componentes (.btn-primary, .section-title, etc.)
        ├── img/                    # SVGs de logo (variações)
        ├── locales/                # Dicionários de tradução: pt-br.json, pt.json, es.json, en.json
        ├── hooks/
        │   └── useSEO.jsx          # Componente <SEOHead> (Helmet: title, description, hreflang, OG)
        ├── services/
        │   ├── contactService.js   # Chamada fetch ao backend (POST /api/contact)
        │   └── projetosData.js     # Dados estáticos do portfólio de projetos
        ├── components/
        │   ├── layout/
        │   │   ├── Layout.jsx      # Wrapper: Header + main + Footer + BackToTop
        │   │   ├── Header.jsx      # Navbar, menu mobile, troca de idioma, CTA
        │   │   └── Footer.jsx      # Rodapé: links, contato, redes sociais
        │   ├── sections/           # Blocos de conteúdo reutilizados nas páginas
        │   │   ├── HeroSection.jsx
        │   │   ├── SobrePreviewSection.jsx
        │   │   ├── ServicosSection.jsx
        │   │   ├── ProjetosSection.jsx     # Mostra os 3 primeiros itens de projetosData
        │   │   ├── DiferenciaisSection.jsx
        │   │   └── ContatoSection.jsx      # Formulário de contato (react-hook-form + DOMPurify)
        │   └── ui/
        │       ├── AnimatedSection.jsx     # Wrapper de animação on-scroll (framer-motion + IO)
        │       ├── LanguageSwitcher.jsx    # Dropdown de idioma
        │       ├── BackToTop.jsx
        │       ├── ScrollToTop.jsx         # Reseta scroll ao navegar de rota
        │       └── LoadingSpinner.jsx      # Fallback do React.Suspense
        └── pages/
            ├── HomePage.jsx        # Compõe todas as sections em sequência
            ├── SobrePage.jsx
            ├── ServicosPage.jsx
            ├── ProjetosPage.jsx    # Lista completa do portfólio (usa projetosData + categorias)
            ├── ContatoPage.jsx     # Hero + <ContatoSection>
            └── NotFoundPage.jsx    # Rota "*"
```

`node_modules/`, `dist/` e arquivos de lock (`package-lock.json`) existem mas não foram analisados em detalhe — apenas `package.json` foi usado para mapear dependências.

## Principais Módulos

- **`src/App.jsx`** — roteamento. Toda rota (exceto 404) exige prefixo `:lang`; um componente `LanguageRoute` valida o idioma da URL e sincroniza o i18next; idioma inválido redireciona para `DEFAULT_LANGUAGE`.
- **`src/i18n.js`** — fonte da verdade sobre idiomas suportados (`SUPPORTED_LANGUAGES`), idioma padrão (`DEFAULT_LANGUAGE = 'pt'`, Português de Portugal), detecção de idioma (URL > localStorage `alicerce_drapeado_lang` > idioma do navegador > fallback) e função `changeLanguage()` usada pelo `LanguageSwitcher`.
- **`src/hooks/useSEO.jsx`** — componente `<SEOHead>` chamado em toda página para definir title/description (via chaves i18n), canonical e hreflang para os 4 idiomas. `BASE_URL = 'https://www.alicercedrapeado.com'` está hardcoded aqui.
- **`src/services/contactService.js`** — única integração com um sistema externo. Monta a URL a partir de `VITE_API_URL`, faz `POST {API_BASE}/api/contact`, e implementa um rate-limit client-side simples (1 envio por minuto, via `sessionStorage`).
- **`src/components/sections/ContatoSection.jsx`** — formulário de contato: validação via `react-hook-form` (campos nome, email, telefone, localização do imóvel, tipo de imóvel, serviço desejado e mensagem), honeypot anti-spam (campo oculto `website`), sanitização com `DOMPurify` antes de enviar, estados `idle | loading | success | error`. Os campos `tipoImovel`/`servico` são `<select>` cujas opções vêm de `contact.form.propertyTypeOptions`/`serviceOptions` nos arquivos de locale.
- **`src/services/projetosData.js`** — array estático `projetos` (portfólio) e `categorias` para filtro. Comentário no próprio arquivo indica que, em produção, isso viria de um CMS/API.
- **`src/components/ui/AnimatedSection.jsx`** — wrapper genérico de animação (`fadeUp`, `fadeIn`, `slideRight`, `slideLeft`, `scaleIn`) usado por quase todas as sections.

## Fluxos Principais

**Navegação e idioma**
`App.jsx` → `LanguageRoute` (valida `:lang`) → `Layout` → página. Troca de idioma acontece via `LanguageSwitcher.jsx` → `changeLanguage()` em `i18n.js`, que atualiza i18next, persiste em `localStorage` e navega para a URL com o novo prefixo.

**Renderização de página**
Página (`src/pages/*.jsx`) → `<SEOHead>` (head/SEO) + uma ou mais `sections/*.jsx` → sections usam `useTranslation()` para texto e, quando precisam de dados, importam de `services/*.js`.

**Envio do formulário de contato**
`ContatoSection.jsx` (`onSubmit`) → sanitiza campos (nome, email, telefone, location, mensagem) com `DOMPurify` (tipoImovel/servico são enviados como vieram do `<select>`, sem sanitização adicional) → `contactService.sendContactForm()` → `fetch POST {VITE_API_URL}/api/contact` → sucesso mostra tela de confirmação; erro exibe mensagem (`err.message` do backend, se houver). Envio bloqueado no client por 60s entre tentativas (sessionStorage) e por honeypot (campo `website` preenchido = ignora silenciosamente).

**Portfólio de projetos**
`ProjetosSection.jsx` (home) mostra os 3 primeiros itens de `projetosData.projetos`. `ProjetosPage.jsx` (rota `/:lang/projetos`) exibe a listagem completa com filtro por categoria (`all | residential | commercial | industrial`, mapeado internamente para os valores `categoria` do array `projetos`) e um modal/detalhe ao selecionar um item (`selected` state).

## Banco de Dados

Não existe banco de dados neste repositório. Todo conteúdo é estático (JSON de tradução, array JS de projetos) ou vem de um backend externo não incluído no projeto.

## APIs e Integrações

- **Backend de contato (externo, fora deste repo)** — único endpoint conhecido: `POST {VITE_API_URL}/api/contact`, chamado em `src/services/contactService.js`. Contrato inferido do código: recebe `{ nome, email, telefone, location, tipoImovel, servico, mensagem }`, responde erro com JSON `{ message }` quando `!response.ok`.
- Variáveis relacionadas ao backend aparecem documentadas em `.env` (porta, CORS, Resend, destinatário de e-mail, rate limit), mas o código-fonte do backend **não está neste repositório** — provavelmente um serviço Node separado usando Resend para envio de e-mail. Confirmar localização real com o usuário antes de tentar editá-lo.
- **Imagens do portfólio** — hotlinked de `images.unsplash.com` (URLs diretas em `projetosData.js`), não hospedadas localmente.
- **Google Fonts** — carregadas via `<link>` em `index.html` (Cormorant Garamond, DM Sans).

## Autenticação e Autorização

Não há autenticação/autorização no frontend. É um site público sem login, área restrita ou controle de acesso.

## Regras de Negócio

- Idiomas suportados: `pt` (Portugal, padrão), `en`, `es`, `pt-br`. Qualquer rota com idioma inválido redireciona para `/pt`.
- Formulário de contato: nome (2–100 caracteres), telefone (regex `^[\d\s()\-+]{8,20}$`), email (regex simples + máx. 254 caracteres), localização do imóvel (10–200 caracteres), tipo de imóvel e serviço (selects obrigatórios), mensagem (10–2000 caracteres) — todos obrigatórios.
- Anti-spam client-side: honeypot (campo `website` invisível) e limite de 1 envio por minuto por sessão do navegador (`sessionStorage`).
- Home mostra apenas os 3 primeiros projetos de `projetosData.js` como destaque (`slice(0, 3)`); a listagem completa fica em `ProjetosPage`.
- SEO: toda página deve declarar `titleKey`/`descKey`/`pagePath` via `<SEOHead>` para manter hreflang e canonical corretos nos 4 idiomas.

## Arquivos Importantes (por tipo de alteração)

- **Mudar textos/traduções** → `src/locales/{pt-br,pt,es,en}.json` (uma chave por idioma, manter as 4 sincronizadas).
- **Mudar rotas/páginas novas** → `src/App.jsx` (registrar rota) + criar arquivo em `src/pages/`.
- **Mudar fluxo/regras do formulário de contato** → `src/components/sections/ContatoSection.jsx` (UI/validação) e `src/services/contactService.js` (chamada à API).
- **Mudar dados do portfólio** → `src/services/projetosData.js`.
- **Mudar header/navegação/footer** → `src/components/layout/Header.jsx`, `Footer.jsx`, `Layout.jsx`.
- **Mudar idiomas suportados ou lógica de detecção** → `src/i18n.js`.
- **Mudar SEO (title, meta, hreflang, OG)** → `src/hooks/useSEO.jsx` (lógica) e/ou `index.html` (tags estáticas, JSON-LD) e `vite.config.js` (sitemap/rotas para SEO de build).
- **Mudar cores/tipografia/tema visual** → `tailwind.config.js` (paleta `brand`/`gold`/`dark`/`light`, fontes) e `src/styles/globals.css` (classes utilitárias reutilizáveis como `.btn-primary`, `.section-title`).
- **Mudar variáveis de ambiente/URL da API** → `frontend/.env` (local, não versionado; não há mais `.env.example` no repositório).
- **Mudar animações genéricas de scroll** → `src/components/ui/AnimatedSection.jsx`.

## Convenções de Código

- Componentes funcionais React com hooks; sem classes.
- Nomes de componentes/arquivos em PascalCase (`.jsx`); serviços/utilitários em camelCase (`.js`).
- Textos de UI sempre via `t('chave')` do `react-i18next` — evitar strings hardcoded em componentes (comentário explícito em `i18n.js` reforça essa convenção).
- Estilização exclusivamente via classes utilitárias Tailwind; classes compostas reaproveitáveis ficam em `@layer components` de `globals.css` (ex.: `.btn-primary`, `.btn-outline`, `.section-title`, `.container-site`).
- Rotas internas sempre constroem o path com prefixo de idioma manualmente (`` `/${lang}/...` ``), lendo `lang` via `useParams()` (default `'pt-br'` em alguns componentes — nem todos os componentes usam o mesmo default; verificar caso a caso).
- Páginas carregadas via `React.lazy` em `App.jsx` para code-splitting; qualquer página nova deve seguir o mesmo padrão de import dinâmico.
- Comentários de cabeçalho em JSDoc-like descrevendo o propósito do arquivo são comuns em serviços/hooks (`contactService.js`, `i18n.js`, `useSEO.jsx`).
- Alias `@` aponta para `/src` (configurado em `vite.config.js`), embora os arquivos observados usem majoritariamente imports relativos.

## Configuração

Variáveis de ambiente usadas pelo frontend (definidas em `frontend/.env`; não há mais `.env.example` versionado no repositório — se precisar recriar um template para outros devs, gerar um novo a partir das chaves abaixo, sem os valores reais):

- `VITE_API_URL` — URL base do backend de contato (ex.: `http://localhost:3001` em dev). Consumida em `contactService.js` via `import.meta.env.VITE_API_URL`.

O arquivo `.env` local também documenta variáveis que pertencem ao **backend** (não usadas pelo código deste repositório, mas relevantes para quem for configurar o serviço externo): `PORT`, `NODE_ENV`, `ALLOWED_ORIGINS` (CORS), `RESEND_API_KEY`, `MAIL_TO`, `MAIL_FROM`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`. Nenhum valor real de secret foi incluído neste documento; no `.env` local, `RESEND_API_KEY` está como placeholder (`re_xxx...`).

`.gitignore` já exclui `.env`, `.env.local`, `.env.production`, `.env.*.local`, `node_modules/`, `dist/`, `build/` e `coverage/`.

## Comandos

Todos executados dentro de `frontend/`:

- Instalar dependências: `npm install`
- Ambiente de desenvolvimento: `npm run dev` (Vite dev server)
- Build de produção: `npm run build`
- Preview do build: `npm run preview`
- Lint: `npm run lint` (ESLint, `--max-warnings 0`, extensões js/jsx)
- Não há script de teste configurado em `package.json`.

## Pontos de Atenção

- **Portfólio (`projetosData.js`) ainda referencia São Paulo/Brasil** — inconsistente com a sede atual em Montijo/Portugal. Não foi alterado por ser conteúdo de case studies (dados fictícios de obras entregues); reescrever exigiria inventar novos projetos/localizações reais em Portugal, o que não deve ser feito sem informação do usuário.
- **Backend inexistente neste repositório.** `contactService.js` depende de uma API externa (`POST /api/contact`) que não está versionada aqui. Qualquer tarefa envolvendo lógica de servidor, envio de e-mail (Resend), rate limiting real ou CORS precisa ser feita em outro projeto/repositório — sinalizar isso ao usuário se pedirem para "corrigir o envio de e-mail" e o problema não estiver no frontend.
- `frontend/.env` contém um placeholder de `RESEND_API_KEY` mas **não deve ser commitado** (já está no `.gitignore`); cuidado ao criar/editar arquivos de ambiente para não expor chaves reais.
- Imagens do portfólio (`projetosData.js`) apontam para URLs externas do Unsplash — mudanças de domínio/CDN externo podem quebrar o carregamento de imagens sem aviso no código.
- `dist/` é gerado pelo build; não editar manualmente.
- Telefone e endereço estão duplicados em múltiplos arquivos (`Header.jsx`, `Footer.jsx`, `ContatoSection.jsx`, `index.html`) sem uma fonte única de verdade — ao atualizar dados de contato, é preciso alterar em todos esses pontos.
- **Hospedagem: Vercel.** `frontend/vercel.json` tem a regra de rewrite (`/(.*) → /index.html`) necessária para SPA fallback — sem ela, acessar uma rota como `/pt` ou `/pt/sobre` diretamente pela URL (fora de navegação client-side) resulta em 404 do servidor, já que não existe arquivo físico correspondente. No painel da Vercel, o **Root Directory** do projeto deve estar configurado como `frontend` (o `package.json` não está na raiz do repositório).
- `package.json` mantém `name: "construtora-frontend"` — nome de pacote npm interno, não afeta o site; só alterar se o usuário pedir explicitamente.
- Pequena divergência de default: `i18n.js` define `DEFAULT_LANGUAGE = 'pt'`, mas alguns componentes (`Header.jsx`, `Footer.jsx`, `SobrePage.jsx` etc.) usam `useParams()` com fallback hardcoded `'pt-br'` caso a rota não informe `:lang`. Não corrigido automaticamente — avaliar com o usuário se deve unificar para `'pt'`.

## Regras para Alterações

- Ao adicionar uma nova página, sempre: (1) criar o arquivo em `src/pages/`, (2) registrar a rota lazy-loaded em `App.jsx` dentro do padrão `/:lang/...`, (3) adicionar chaves de tradução nos 4 arquivos de `src/locales/`, (4) incluir `<SEOHead>` com `titleKey`/`descKey`/`pagePath` próprios.
- Ao adicionar/alterar textos visíveis ao usuário, sempre atualizar os 4 arquivos de idioma (`pt-br.json`, `pt.json`, `es.json`, `en.json`) para manter paridade — nunca hardcodar texto em componente.
- Preferir reaproveitar classes já definidas em `globals.css` (`.btn-primary`, `.btn-outline`, `.section-title` etc.) e o tema de `tailwind.config.js` em vez de introduzir novas cores/estilos soltos.
- Novas seções de página devem seguir o padrão existente: componente em `src/components/sections/`, animações via `<AnimatedSection>`, textos via `t()`.
- Não commitar `.env` nem valores reais de API keys.
- Branding já está consolidado como "Alicerce Drapeado" (Portugal) em todo o código versionado — novas alterações de nome/endereço/telefone/domínio devem ser propagadas de forma consistente aos mesmos arquivos listados em "Branding consolidado".
