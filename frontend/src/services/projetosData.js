/**
 * projetosData.js
 * Static data for the projects portfolio.
 * In production, this would be fetched from a CMS or API.
 */

export const projetos = [
  {
    id: 1,
    titulo: 'Residencial Alto das Pedras',
    categoria: 'Residencial',
    local: 'Alphaville, SP',
    ano: '2023',
    area: '2.400 m²',
    desc: 'Condomínio de alto padrão com 12 unidades, área de lazer completa e acabamentos premium.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80&auto=format&fit=crop',
    tags: ['Residencial', 'Alto padrão', 'Entregue'],
  },
  {
    id: 2,
    titulo: 'Torre Corporativa Faria Lima',
    categoria: 'Comercial',
    local: 'São Paulo, SP',
    ano: '2023',
    area: '18.000 m²',
    desc: 'Edifício de escritórios classe A com certificação LEED Gold, 22 andares e tecnologia de ponta.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop',
    tags: ['Comercial', 'LEED Gold', 'Entregue'],
  },
  {
    id: 3,
    titulo: 'Centro Logístico Anhanguera',
    categoria: 'Industrial',
    local: 'Cajamar, SP',
    ano: '2022',
    area: '45.000 m²',
    desc: 'Galpão logístico de última geração com docks automatizados e área de escritórios integrada.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&auto=format&fit=crop',
    tags: ['Industrial', 'Logística', 'Entregue'],
  },
  {
    id: 4,
    titulo: 'Clínica Saúde Integrada',
    categoria: 'Comercial',
    local: 'Santo André, SP',
    ano: '2022',
    area: '3.200 m²',
    desc: 'Complexo médico multidisciplinar projetado para máximo conforto de pacientes e equipes.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80&auto=format&fit=crop',
    tags: ['Saúde', 'Comercial', 'Entregue'],
  },
  {
    id: 5,
    titulo: 'Residências Jardim Europa',
    categoria: 'Residencial',
    local: 'São Paulo, SP',
    ano: '2021',
    area: '920 m²',
    desc: 'Casas unifamiliares exclusivas em bairro nobre com arquitetura contemporânea e jardins projetados.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80&auto=format&fit=crop',
    tags: ['Residencial', 'Luxo', 'Entregue'],
  },
  {
    id: 6,
    titulo: 'Shopping Outlet Campinas',
    categoria: 'Comercial',
    local: 'Campinas, SP',
    ano: '2021',
    area: '32.000 m²',
    desc: 'Centro comercial de outlet com mais de 150 lojas, praça de alimentação e estacionamento coberto.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80&auto=format&fit=crop',
    tags: ['Comercial', 'Varejo', 'Entregue'],
  },
]

export const categorias = ['Todos', 'Residencial', 'Comercial', 'Industrial']
