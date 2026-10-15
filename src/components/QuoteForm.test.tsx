import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuoteForm } from './QuoteForm'

async function fill(values: Partial<Record<string, string>>) {
  const map: Record<string, RegExp> = {
    name: /Nome e empresa/,
    contact: /E-mail ou WhatsApp/,
    product: /Produto desejado/,
    quantity: /Quantidade de peças/,
    details: /Conte sobre/,
  }
  for (const [key, value] of Object.entries(values))
    if (value) await userEvent.type(screen.getByLabelText(map[key]), value)
}

const valid = {
  name: 'Maria Souza',
  contact: '91999990000',
  product: 'Camisetas',
  quantity: '40',
  details: 'Arte pronta',
}

describe('QuoteForm', () => {
  let open: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    open = vi.spyOn(window, 'open').mockImplementation(() => null)
  })
  afterEach(() => open.mockRestore())

  it('gives every field a visible label', () => {
    render(<QuoteForm />)
    for (const label of [/Nome e empresa/, /E-mail ou WhatsApp/, /Produto desejado/, /Quantidade de peças/, /Data desejada/, /Conte sobre/])
      expect(screen.getByLabelText(label)).toBeInTheDocument()
  })

  it('opens WhatsApp with the filled values when valid', async () => {
    render(<QuoteForm />)
    await fill(valid)
    await userEvent.click(screen.getByRole('button', { name: /Solicitar orçamento/ }))
    expect(open).toHaveBeenCalledTimes(1)
    const [url, target, features] = open.mock.calls[0] as [string, string, string]
    expect(url).toMatch(/^https:\/\/wa\.me\/5591981365656\?text=/)
    const text = decodeURIComponent(url.split('text=')[1])
    for (const value of ['Maria Souza', '91999990000', 'Camisetas', '40', 'Arte pronta']) expect(text).toContain(value)
    expect(target).toBe('_blank')
    expect(features).toContain('noopener')
  })

  it('shows errors and does not open WhatsApp when required fields are empty', async () => {
    render(<QuoteForm />)
    await userEvent.click(screen.getByRole('button', { name: /Solicitar orçamento/ }))
    expect(open).not.toHaveBeenCalled()
    expect(screen.getAllByRole('alert')).toHaveLength(4)
    expect(screen.getByLabelText(/Nome e empresa/)).toHaveAttribute('aria-invalid', 'true')
  })

  it('rejects fewer than 20 pieces with the minimum message', async () => {
    render(<QuoteForm />)
    await fill({ ...valid, quantity: '19' })
    await userEvent.click(screen.getByRole('button', { name: /Solicitar orçamento/ }))
    expect(screen.getByText('O pedido mínimo é de 20 peças.')).toBeInTheDocument()
    expect(open).not.toHaveBeenCalled()
  })

  it('rejects a non numeric quantity', async () => {
    render(<QuoteForm />)
    await fill({ ...valid, quantity: 'vinte' })
    await userEvent.click(screen.getByRole('button', { name: /Solicitar orçamento/ }))
    expect(screen.getByText('Informe a quantidade usando apenas números.')).toBeInTheDocument()
    expect(open).not.toHaveBeenCalled()
  })

  it('announces the WhatsApp redirect', () => {
    render(<QuoteForm />)
    expect(screen.getByText(/você será direcionado ao WhatsApp da Perfect Silk/)).toBeInTheDocument()
  })
})
