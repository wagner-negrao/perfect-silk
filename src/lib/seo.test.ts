import config from '../../site.config.json'
import { canonicalUrl, INDEXABLE_PATHS, organizationJsonLd, PAGES, SITE_URL } from './seo'

describe('page metadata', () => {
  it.each([
    ['home', 'Perfect Silk | Confecção, Serigrafia e Sublimação'],
    ['producao', 'Produção própria, serigrafia e sublimação | Perfect Silk'],
    ['projetos', 'Projetos e produtos personalizados | Perfect Silk'],
    ['contato', 'Orçamento de produtos personalizados | Perfect Silk'],
  ] as const)('%s has the title defined in the spec', (key, title) => {
    expect(PAGES[key].title).toBe(title)
  })

  it('gives every page its own description and canonical URL', () => {
    const pages = Object.values(PAGES)
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length)
    expect(new Set(pages.map((p) => canonicalUrl(p.path))).size).toBe(pages.length)
  })

  it('lists exactly the 4 indexable routes for the sitemap', () => {
    expect(INDEXABLE_PATHS).toEqual(['/', '/producao', '/projetos', '/contato'])
    expect(config.indexablePaths).toEqual(INDEXABLE_PATHS)
  })

  it('builds canonical URLs on the site origin', () => {
    expect(canonicalUrl('/contato')).toBe(`${SITE_URL}/contato`)
  })

  it('keeps privacy page out of the index', () => {
    expect(PAGES.privacidade.noindex).toBe(true)
  })
})

describe('organization JSON-LD', () => {
  it('only carries confirmed contact data', () => {
    expect(organizationJsonLd.telephone).toBe('+55 91 98136-5656')
    expect(organizationJsonLd.email).toBe('sldossantosservicos@gmail.com')
    expect(organizationJsonLd.address.addressLocality).toBe('Ananindeua')
    expect(organizationJsonLd).not.toHaveProperty('aggregateRating')
  })
})
