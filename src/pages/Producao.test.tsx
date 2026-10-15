import { screen, within } from '@testing-library/react'
import { renderRoute } from '../test-utils'

describe('Produção page', () => {
  beforeEach(() => {
    renderRoute('/producao')
  })

  it('renders the four sections in order', () => {
    const titles = Array.from(document.querySelectorAll('main section')).map(
      (section) => document.getElementById(section.getAttribute('aria-labelledby')!)!.textContent,
    )
    expect(titles).toEqual([
      'Do tecido à peça. Da ideia à estampa.',
      'Um processo completo. Um projeto com a sua identidade.',
      'A técnica acompanha a necessidade do projeto.',
      'O que ajuda a preparar seu orçamento?',
    ])
  })

  it('has a single h1', () => {
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('lists the four production steps and both techniques', () => {
    for (const name of ['Briefing e definição', 'Corte e confecção', 'Personalização', 'Acabamento e entrega', 'Serigrafia', 'Sublimação'])
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
  })

  it('has WhatsApp quote buttons', () => {
    const links = screen.getAllByRole('link', { name: /Conversar sobre meu projeto|Solicitar orientação/ })
    expect(links).toHaveLength(2)
    for (const link of links) expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/5591981365656\?text=/)
  })

  it('marks Produção as the current page in the menu', () => {
    expect(within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', { name: 'Produção' })).toHaveAttribute('aria-current', 'page')
  })
})
