import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion } from './Accordion'

const items = [
  { question: 'Primeira?', answer: 'Resposta um.' },
  { question: 'Segunda?', answer: 'Resposta dois.' },
]

describe('Accordion', () => {
  it('starts expanded, as in the Figma layout', () => {
    render(<Accordion items={items} />)
    for (const button of screen.getAllByRole('button')) expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses an expanded item and sets aria-expanded to false', async () => {
    render(<Accordion items={items} />)
    const first = screen.getByRole('button', { name: 'Primeira?' })
    await userEvent.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Resposta um.').closest('[role=region]')).toHaveAttribute('hidden')
    expect(screen.getByRole('button', { name: 'Segunda?' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('expands a collapsed item again and sets aria-expanded to true', async () => {
    render(<Accordion items={items} />)
    const first = screen.getByRole('button', { name: 'Primeira?' })
    await userEvent.click(first)
    await userEvent.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Resposta um.')).toBeVisible()
  })

  it('toggles from the keyboard', async () => {
    render(<Accordion items={items} />)
    const first = screen.getByRole('button', { name: 'Primeira?' })
    first.focus()
    await userEvent.keyboard('{Enter}')
    expect(first).toHaveAttribute('aria-expanded', 'false')
    await userEvent.keyboard(' ')
    expect(first).toHaveAttribute('aria-expanded', 'true')
  })
})
