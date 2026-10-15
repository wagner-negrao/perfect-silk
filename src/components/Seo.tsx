import { Head } from 'vite-react-ssg'
import { canonicalUrl, organizationJsonLd, SITE_NOINDEX, type PageMeta } from '../lib/seo'

export function Seo({ page }: { page: PageMeta }) {
  const url = canonicalUrl(page.path)
  return (
    <Head>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={url} />
      {(page.noindex || SITE_NOINDEX) && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Perfect Silk" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      {!page.noindex && !SITE_NOINDEX && (
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      )}
    </Head>
  )
}
