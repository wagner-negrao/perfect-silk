import { validateQuoteForm } from './validation'
import { EMPTY_QUOTE } from './whatsapp'

const compact = { ...EMPTY_QUOTE, name: 'Maria', contact: '91999990000', product: 'Bonés', quantity: '20' }
const full = {
  ...EMPTY_QUOTE,
  name: 'Maria',
  email: 'maria@exemplo.com',
  whatsapp: '(91) 99999-0000',
  product: 'Bonés',
  quantity: '20',
}

describe('validateQuoteForm (compact)', () => {
  it('accepts valid values, including the minimum of 20 and empty optional fields', () => {
    expect(validateQuoteForm(compact)).toEqual({})
  })

  it.each(['name', 'contact', 'product', 'quantity'] as const)('requires %s', (field) => {
    expect(validateQuoteForm({ ...compact, [field]: '   ' })[field]).toBeTruthy()
  })

  it('rejects quantities below 20 with the exact message', () => {
    expect(validateQuoteForm({ ...compact, quantity: '19' }).quantity).toBe('O pedido mínimo é de 20 peças.')
  })

  it('rejects non numeric quantities', () => {
    expect(validateQuoteForm({ ...compact, quantity: 'vinte' }).quantity).toBe('Informe a quantidade usando apenas números.')
  })
})

describe('validateQuoteForm (full)', () => {
  it('accepts valid values', () => {
    expect(validateQuoteForm(full, 'full')).toEqual({})
  })

  it.each(['name', 'email', 'whatsapp', 'product', 'quantity'] as const)('requires %s', (field) => {
    expect(validateQuoteForm({ ...full, [field]: '' }, 'full')[field]).toBeTruthy()
  })

  it('does not require the compact contact field', () => {
    expect(validateQuoteForm(full, 'full').contact).toBeUndefined()
  })

  it('rejects an invalid e-mail', () => {
    expect(validateQuoteForm({ ...full, email: 'maria@' }, 'full').email).toBe('Informe um e-mail válido.')
  })

  it('rejects a WhatsApp number without enough digits', () => {
    expect(validateQuoteForm({ ...full, whatsapp: '99999' }, 'full').whatsapp).toBe('Informe o WhatsApp com DDD.')
  })
})
