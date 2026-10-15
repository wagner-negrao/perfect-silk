import type { QuoteFieldName, QuoteFields } from './whatsapp'

export const MIN_QUANTITY = 20

export type QuoteErrors = Partial<Record<QuoteFieldName, string>>

export const REQUIRED_FIELDS = {
  compact: ['name', 'contact', 'product', 'quantity'],
  full: ['name', 'email', 'whatsapp', 'product', 'quantity'],
} as const satisfies Record<string, readonly QuoteFieldName[]>

export type QuoteVariant = keyof typeof REQUIRED_FIELDS

const REQUIRED_MESSAGES: Partial<Record<QuoteFieldName, string>> = {
  name: 'Informe seu nome.',
  contact: 'Informe um telefone ou e-mail para contato.',
  email: 'Informe seu e-mail.',
  whatsapp: 'Informe seu WhatsApp.',
  product: 'Informe o produto desejado.',
  quantity: 'Informe a quantidade.',
}

export function validateQuoteForm(values: QuoteFields, variant: QuoteVariant = 'compact'): QuoteErrors {
  const errors: QuoteErrors = {}
  for (const field of REQUIRED_FIELDS[variant]) {
    if (!values[field].trim()) errors[field] = REQUIRED_MESSAGES[field]
  }

  const quantity = values.quantity.trim()
  if (quantity) {
    if (!/^\d+$/.test(quantity)) errors.quantity = 'Informe a quantidade usando apenas números.'
    else if (Number(quantity) < MIN_QUANTITY) errors.quantity = 'O pedido mínimo é de 20 peças.'
  }

  const email = values.email.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Informe um e-mail válido.'

  const whatsapp = values.whatsapp.trim()
  if (whatsapp && whatsapp.replace(/\D/g, '').length < 10) errors.whatsapp = 'Informe o WhatsApp com DDD.'

  return errors
}
