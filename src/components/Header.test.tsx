import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>,
  )

describe('Header', () => {
  it('lists the four pages and marks the current one with aria-current', () => {
    renderAt('/projetos')
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    for (const label of ['Início', 'Produção', 'Projetos', 'Contato'])
      expect(nav).toHaveTextContent(label)
    expect(screen.getByRole('link', { name: 'Projetos' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Início' })).not.toHaveAttribute('aria-current')
  })

  it('marks Início only on the home route', () => {
    renderAt('/')
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page')
  })

  it('links the menu items to the normalized routes', () => {
    renderAt('/')
    expect(screen.getByRole('link', { name: 'Produção' })).toHaveAttribute('href', '/producao')
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '/contato')
  })

  it('toggles the mobile menu with aria-expanded', async () => {
    renderAt('/')
    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(screen.getByRole('button', { name: 'Fechar menu' }))
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('has a quote button that opens WhatsApp in a new tab', () => {
    renderAt('/')
    const cta = screen.getByRole('link', { name: /Solicitar orçamento/ })
    expect(cta.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/5591981365656\?text=/)
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
