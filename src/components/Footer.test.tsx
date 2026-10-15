import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Footer } from './Footer'

describe('Footer', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
  })

  it('shows the confirmed contact data', () => {
    expect(screen.getByText('(91) 98136-5656')).toBeInTheDocument()
    expect(screen.getByText('sldossantosservicos@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('Travessa WE 45-B, nº 371B')).toBeInTheDocument()
  })

  it('links to the privacy policy', () => {
    expect(screen.getByRole('link', { name: 'Política de privacidade' })).toHaveAttribute('href', '/privacidade')
  })

  it('repeats the four page links', () => {
    const nav = screen.getByRole('navigation', { name: 'Rodapé' })
    expect(nav.querySelectorAll('a')).toHaveLength(4)
  })
})
