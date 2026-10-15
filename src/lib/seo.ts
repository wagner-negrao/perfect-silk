import config from '../../site.config.json'

export const SITE_URL = config.siteUrl

// Ativado com VITE_SITE_NOINDEX=true no build de teste: bloqueia indexação de todas as páginas
export const SITE_NOINDEX = import.meta.env.VITE_SITE_NOINDEX === 'true'

export interface PageMeta {
  path: string
  title: string
  description: string
  noindex?: boolean
}

export const PAGES: Record<'home' | 'producao' | 'projetos' | 'contato' | 'privacidade', PageMeta> = {
  home: {
    path: '/',
    title: 'Perfect Silk | Confecção, Serigrafia e Sublimação',
    description:
      'Camisetas, uniformes e produtos personalizados para empresas e eventos. Confecção própria, serigrafia e sublimação. Encomendas a partir de 20 peças.',
  },
  producao: {
    path: '/producao',
    title: 'Produção própria, serigrafia e sublimação | Perfect Silk',
    description:
      'Entenda as etapas de confecção e personalização da Perfect Silk, do briefing ao acabamento.',
  },
  projetos: {
    path: '/projetos',
    title: 'Projetos e produtos personalizados | Perfect Silk',
    description:
      'Conheça uniformes, camisetas, bonés, ecobags e brindes personalizados da Perfect Silk.',
  },
  contato: {
    path: '/contato',
    title: 'Orçamento de produtos personalizados | Perfect Silk',
    description:
      'Fale com a Perfect Silk em Ananindeua, PA. Envie os detalhes do seu pedido e solicite orçamento.',
  },
  privacidade: {
    path: '/privacidade',
    title: 'Política de privacidade | Perfect Silk',
    description: 'Política de privacidade da Perfect Silk.',
    noindex: true,
  },
}

export const INDEXABLE_PATHS = Object.values(PAGES)
  .filter((page) => !page.noindex)
  .map((page) => page.path)

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '/' : path}`
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Perfect Silk',
  description: PAGES.home.description,
  url: SITE_URL,
  telephone: '+55 91 98136-5656',
  email: 'sldossantosservicos@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Travessa WE 45-B, nº 371B, Cidade Nova VIII',
    addressLocality: 'Ananindeua',
    addressRegion: 'PA',
    postalCode: '67133-805',
    addressCountry: 'BR',
  },
}
