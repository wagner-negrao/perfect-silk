import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '../test-utils'

describe('Home page', () => {
  beforeEach(() => {
    renderRoute('/')
  })

  it('renders the sections in the specified order', () => {
    const titles = Array.from(document.querySelectorAll('main section')).map((section) => {
      const id = section.getAttribute('aria-labelledby')!
      return document.getElementById(id)!.textContent
    })
    expect(titles).toEqual([
      'Da confecção à estampa. Sua marca em cada detalhe.',
      'Uma solução para cada ocasião.',
      'Do primeiro corte ao último detalhe.',
      'Sua identidade. Muitas possibilidades.',
      'Uma produção. Todos os detalhes.',
      'Sua marca ganha forma por aqui.',
      'Antes de produzir, vamos esclarecer.',
      'Sua próxima peça começa aqui.',
    ])
  })

  it('has a single h1 with the main promise', () => {
    const h1 = screen.getAllByRole('heading', { level: 1 })
    expect(h1).toHaveLength(1)
    expect(h1[0]).toHaveTextContent('Da confecção à estampa. Sua marca em cada detalhe.')
  })

  it('states the 20 piece minimum in the visible content', () => {
    expect(screen.getAllByText(/20 peças/).length).toBeGreaterThan(0)
  })

  it('has quote buttons pointing to WhatsApp', () => {
    const hero = document.querySelector('section')!
    expect(within(hero).getByRole('link', { name: /Solicitar meu orçamento/ })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/5591981365656?text='),
    )
  })

  it('collapses and expands FAQ answers', async () => {
    const trigger = screen.getByRole('button', { name: 'Posso enviar a arte da minha marca?' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows the project gallery with alt text on every image', () => {
    const images = Array.from(document.querySelectorAll('main img'))
    expect(images.length).toBeGreaterThan(10)
    for (const img of images) expect(img.getAttribute('alt')).toBeTruthy()
  })
})
