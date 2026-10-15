import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '../test-utils'

describe('Contato page', () => {
  let open: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    open = vi.spyOn(window, 'open').mockImplementation(() => null)
    renderRoute('/contato')
  })
  afterEach(() => open.mockRestore())

  it('renders the three sections in order', () => {
    const titles = Array.from(document.querySelectorAll('main section')).map(
      (section) => document.getElementById(section.getAttribute('aria-labelledby')!)!.textContent,
    )
    expect(titles).toEqual([
      'Vamos dar forma ao seu próximo projeto.',
      'Solicite seu orçamento',
      'O que acontece depois do contato?',
    ])
  })

  it('has a single h1', () => {
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('shows phone, e-mail and address', () => {
    const main = within(screen.getByRole('main'))
    expect(main.getByRole('link', { name: /\(91\) 98136-5656/ })).toBeInTheDocument()
    expect(main.getByRole('link', { name: 'sldossantosservicos@gmail.com' })).toHaveAttribute('href', 'mailto:sldossantosservicos@gmail.com')
    expect(main.getByText(/Ananindeua \/ PA · CEP 67133-805/)).toBeInTheDocument()
  })

  it('labels every form field', () => {
    for (const label of [/Nome e empresa/, /^E-mail \*/, /^WhatsApp \*/, /Produto ou serviço/, /Quantidade de peças/, /Tamanhos e cores/, /Data desejada/, /Cidade de entrega/, /Conte sobre a sua ideia/])
      expect(screen.getByLabelText(label)).toBeInTheDocument()
  })

  it('sends the filled details to WhatsApp on a valid submit', async () => {
    await userEvent.type(screen.getByLabelText(/Nome e empresa/), 'Ana, Empresa X')
    await userEvent.type(screen.getByLabelText(/^E-mail \*/), 'ana@empresa.com')
    await userEvent.type(screen.getByLabelText(/^WhatsApp \*/), '91988887777')
    await userEvent.type(screen.getByLabelText(/Produto ou serviço/), 'Uniformes')
    await userEvent.type(screen.getByLabelText(/Quantidade de peças/), '100')
    await userEvent.type(screen.getByLabelText(/Cidade de entrega/), 'Belém')
    await userEvent.click(screen.getByRole('button', { name: /Solicitar orçamento/ }))

    expect(open).toHaveBeenCalledTimes(1)
    const url = open.mock.calls[0][0] as string
    expect(url).toMatch(/^https:\/\/wa\.me\/5591981365656\?text=/)
    const text = decodeURIComponent(url.split('text=')[1])
    for (const value of ['Ana, Empresa X', 'ana@empresa.com', '91988887777', 'Uniformes', '100', 'Belém']) expect(text).toContain(value)
  })

  it('blocks submit with errors when the required fields are empty', async () => {
    await userEvent.click(screen.getByRole('button', { name: /Solicitar orçamento/ }))
    expect(open).not.toHaveBeenCalled()
    expect(screen.getAllByRole('alert')).toHaveLength(5)
  })

  it('blocks submit when the quantity is below 20', async () => {
    await userEvent.type(screen.getByLabelText(/Nome e empresa/), 'Ana')
    await userEvent.type(screen.getByLabelText(/^E-mail \*/), 'ana@empresa.com')
    await userEvent.type(screen.getByLabelText(/^WhatsApp \*/), '91988887777')
    await userEvent.type(screen.getByLabelText(/Produto ou serviço/), 'Uniformes')
    await userEvent.type(screen.getByLabelText(/Quantidade de peças/), '5')
    await userEvent.click(screen.getByRole('button', { name: /Solicitar orçamento/ }))
    expect(screen.getByText('O pedido mínimo é de 20 peças.')).toBeInTheDocument()
    expect(open).not.toHaveBeenCalled()
  })
})
