import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PAGES } from '../lib/seo'
import { renderRoute } from '../test-utils'

describe('routing', () => {
  it('navigates between pages from the menu without reloading', async () => {
    renderRoute('/')
    const nav = () => screen.getByRole('navigation', { name: 'Principal' })
    await userEvent.click(nav().querySelector('a[href="/producao"]')!)
    expect(await screen.findByRole('heading', { level: 1, name: /Do tecido à peça/ })).toBeInTheDocument()
    await userEvent.click(nav().querySelector('a[href="/projetos"]')!)
    expect(await screen.findByRole('heading', { level: 1, name: /Ideias diferentes/ })).toBeInTheDocument()
    await userEvent.click(nav().querySelector('a[href="/contato"]')!)
    expect(await screen.findByRole('heading', { level: 1, name: /Vamos dar forma/ })).toBeInTheDocument()
  })

  it('shows header and footer on every route', () => {
    for (const path of ['/', '/producao', '/projetos', '/contato']) {
      const { unmount } = renderRoute(path)
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      unmount()
    }
  })

  it('renders the privacy page', () => {
    renderRoute('/privacidade')
    expect(screen.getByRole('heading', { level: 1, name: 'Política de privacidade' })).toBeInTheDocument()
  })

  it('marks the 404 page as noindex with its own title', async () => {
    renderRoute('/404')
    await waitFor(() => expect(document.title).toBe('Página não encontrada | Perfect Silk'))
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })

  it('renders a 404 with a link back home for unknown routes', () => {
    renderRoute('/nao-existe')
    expect(screen.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar para a página inicial' })).toHaveAttribute('href', '/')
  })

  it.each([
    ['/', PAGES.home],
    ['/producao', PAGES.producao],
    ['/projetos', PAGES.projetos],
    ['/contato', PAGES.contato],
  ])('sets title, description and canonical for %s', async (path, page) => {
    renderRoute(path)
    await waitFor(() => expect(document.title).toBe(page.title))
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', page.description)
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', expect.stringMatching(new RegExp(`${path === '/' ? '/' : path}$`)))
  })

  it('adds JSON-LD on indexable pages and noindex on privacy', async () => {
    const { unmount } = renderRoute('/')
    await waitFor(() => expect(document.querySelector('script[type="application/ld+json"]')).not.toBeNull())
    const data = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!)
    expect(data['@type']).toBe('LocalBusiness')
    unmount()
    renderRoute('/privacidade')
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex'))
  })
})
