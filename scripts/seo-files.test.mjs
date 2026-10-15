import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { buildRobots, buildSitemap } from './seo-files.mjs'

const config = JSON.parse(readFileSync(resolve(process.cwd(), 'site.config.json'), 'utf8'))

describe('sitemap.xml', () => {
  it('lists exactly the four indexable routes', () => {
    const xml = buildSitemap('https://exemplo.com', config.indexablePaths)
    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
    expect(locs).toEqual([
      'https://exemplo.com/',
      'https://exemplo.com/producao',
      'https://exemplo.com/projetos',
      'https://exemplo.com/contato',
    ])
  })
})

describe('robots.txt', () => {
  it('allows crawling and points to the sitemap', () => {
    const robots = buildRobots('https://exemplo.com')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain('Sitemap: https://exemplo.com/sitemap.xml')
  })
})

describe('robots.txt in test mode', () => {
  it('blocks all crawlers when noindex is requested', () => {
    expect(buildRobots('https://exemplo.com', { noindex: true })).toBe('User-agent: *\nDisallow: /\n')
  })
})
