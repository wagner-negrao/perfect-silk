import { screen } from '@testing-library/react'
import { renderRoute } from '../test-utils'

describe('Projetos page', () => {
  beforeEach(() => {
    renderRoute('/projetos')
  })

  it('renders the three sections in order', () => {
    const titles = Array.from(document.querySelectorAll('main section')).map(
      (section) => document.getElementById(section.getAttribute('aria-labelledby')!)!.textContent,
    )
    expect(titles).toEqual([
      'Ideias diferentes. Uma identidade em cada peça.',
      'Do uniforme ao brinde.',
      'O próximo projeto pode levar a sua marca.',
    ])
  })

  it('has a single h1', () => {
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('shows all nine gallery products with alt text on every image', () => {
    const gallery = document.querySelectorAll('main section:nth-of-type(2) li')
    expect(gallery).toHaveLength(9)
    const images = Array.from(document.querySelectorAll('main img'))
    expect(images.length).toBeGreaterThanOrEqual(10)
    for (const img of images) expect(img.getAttribute('alt')).toBeTruthy()
  })

  it('has a WhatsApp quote button', () => {
    expect(screen.getByRole('link', { name: /Quero personalizar meu projeto/ })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/5591981365656?text='),
    )
  })
})
