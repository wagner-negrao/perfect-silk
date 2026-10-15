import { copyFile, readFile, writeFile } from 'node:fs/promises'
import { buildRobots, buildSitemap } from './seo-files.mjs'

const config = JSON.parse(await readFile(new URL('../site.config.json', import.meta.url), 'utf8'))
const siteUrl = process.env.SITE_URL ?? config.siteUrl
const dist = new URL('../dist/', import.meta.url)

await writeFile(new URL('sitemap.xml', dist), buildSitemap(siteUrl, config.indexablePaths))
await writeFile(new URL('robots.txt', dist), buildRobots(siteUrl, { noindex: process.env.VITE_SITE_NOINDEX === 'true' }))
// Cloudflare Pages serve dist/404.html para endereços inexistentes
await copyFile(new URL('404/index.html', dist), new URL('404.html', dist))
console.log(`sitemap.xml e robots.txt gerados para ${siteUrl}`)
