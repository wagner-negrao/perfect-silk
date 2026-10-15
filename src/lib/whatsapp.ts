export const WHATSAPP_NUMBER = '5591981365656'

export const DEFAULT_MESSAGE =
  'Olá! Gostaria de solicitar um orçamento para produtos personalizados da Perfect Silk.'

export function buildWhatsAppUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const QUOTE_FIELD_NAMES = [
  'name',
  'contact',
  'email',
  'whatsapp',
  'product',
  'quantity',
  'sizesColors',
  'date',
  'city',
  'details',
] as const

export type QuoteFieldName = (typeof QUOTE_FIELD_NAMES)[number]
export type QuoteFields = Record<QuoteFieldName, string>

export const EMPTY_QUOTE: QuoteFields = {
  name: '',
  contact: '',
  email: '',
  whatsapp: '',
  product: '',
  quantity: '',
  sizesColors: '',
  date: '',
  city: '',
  details: '',
}

const LINES: Array<[QuoteFieldName, string]> = [
  ['name', 'Nome'],
  ['contact', 'Contato'],
  ['email', 'E-mail'],
  ['whatsapp', 'WhatsApp'],
  ['product', 'Produto'],
  ['quantity', 'Quantidade'],
  ['sizesColors', 'Tamanhos e cores'],
  ['date', 'Data desejada'],
  ['city', 'Cidade de entrega'],
  ['details', 'Detalhes'],
]

export function buildQuoteMessage(fields: QuoteFields): string {
  const lines = ['Olá! Gostaria de solicitar um orçamento na Perfect Silk.', '']
  for (const [key, label] of LINES) {
    const value = fields[key].trim()
    if (!value) continue
    lines.push(`${label}: ${key === 'quantity' ? `${value} peças` : value}`)
  }
  return lines.join('\n')
}
