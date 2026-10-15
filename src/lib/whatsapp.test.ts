import { buildQuoteMessage, buildWhatsAppUrl, DEFAULT_MESSAGE, EMPTY_QUOTE } from './whatsapp'

const fields = {
  ...EMPTY_QUOTE,
  name: 'Maria Souza',
  contact: '(91) 99999-0000',
  product: 'Camisetas para eventos',
  quantity: '50',
  date: '2026-12-10',
  details: 'Estampa em serigrafia',
}

describe('buildWhatsAppUrl', () => {
  it('targets the company number with an encoded default message', () => {
    expect(buildWhatsAppUrl()).toBe(`https://wa.me/5591981365656?text=${encodeURIComponent(DEFAULT_MESSAGE)}`)
  })

  it('preserves accents and line breaks through encoding', () => {
    const url = buildWhatsAppUrl('Olá\nquero orçamento')
    expect(url).toContain('Ol%C3%A1%0Aquero%20or%C3%A7amento')
    expect(decodeURIComponent(url.split('text=')[1])).toBe('Olá\nquero orçamento')
  })
})

describe('buildQuoteMessage', () => {
  it('includes every filled value', () => {
    const message = buildQuoteMessage(fields)
    for (const value of ['Maria Souza', '(91) 99999-0000', 'Camisetas para eventos', '2026-12-10', 'Estampa em serigrafia'])
      expect(message).toContain(value)
    expect(message).toContain('Quantidade: 50 peças')
  })

  it('omits lines for empty fields', () => {
    const message = buildQuoteMessage({ ...fields, details: '  ', date: '' })
    expect(message).not.toContain('Detalhes')
    expect(message).not.toContain('Data desejada')
    expect(message).not.toContain('E-mail')
  })

  it('includes the extra fields of the full contact form', () => {
    const message = buildQuoteMessage({
      ...fields,
      email: 'maria@exemplo.com',
      whatsapp: '91999990000',
      sizesColors: 'P, M, G; azul',
      city: 'Belém',
    })
    for (const value of ['maria@exemplo.com', '91999990000', 'P, M, G; azul', 'Belém']) expect(message).toContain(value)
  })
})
