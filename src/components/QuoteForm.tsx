import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { validateQuoteForm, type QuoteErrors, type QuoteVariant } from '../lib/validation'
import { buildQuoteMessage, buildWhatsAppUrl, EMPTY_QUOTE, type QuoteFieldName, type QuoteFields } from '../lib/whatsapp'
import styles from './QuoteForm.module.css'

interface FieldConfig {
  name: QuoteFieldName
  label: string
  type?: 'text' | 'date' | 'textarea' | 'email' | 'tel'
  inputMode?: 'numeric'
  autoComplete?: string
  required?: boolean
}

const FIELDS: Record<QuoteVariant, FieldConfig[]> = {
  compact: [
    { name: 'name', label: 'Nome e empresa *', autoComplete: 'name', required: true },
    { name: 'contact', label: 'E-mail ou WhatsApp *', autoComplete: 'email', required: true },
    { name: 'product', label: 'Produto desejado *', required: true },
    { name: 'quantity', label: 'Quantidade de peças (mínimo 20) *', inputMode: 'numeric', required: true },
    { name: 'date', label: 'Data desejada', type: 'date' },
    { name: 'details', label: 'Conte sobre a personalização e a sua arte', type: 'textarea' },
  ],
  full: [
    { name: 'name', label: 'Nome e empresa *', autoComplete: 'name', required: true },
    { name: 'email', label: 'E-mail *', type: 'email', autoComplete: 'email', required: true },
    { name: 'whatsapp', label: 'WhatsApp *', type: 'tel', autoComplete: 'tel', required: true },
    { name: 'product', label: 'Produto ou serviço desejado *', required: true },
    { name: 'quantity', label: 'Quantidade de peças (mínimo 20) *', inputMode: 'numeric', required: true },
    { name: 'sizesColors', label: 'Tamanhos e cores desejados' },
    { name: 'date', label: 'Data desejada', type: 'date' },
    { name: 'city', label: 'Cidade de entrega' },
    { name: 'details', label: 'Conte sobre a sua ideia e personalização', type: 'textarea' },
  ],
}

interface Props {
  variant?: QuoteVariant
  buttonLabel?: string
  children?: React.ReactNode
}

export function QuoteForm({ variant = 'compact', buttonLabel = 'Solicitar orçamento →', children }: Props) {
  const baseId = useId()
  const [values, setValues] = useState<QuoteFields>(EMPTY_QUOTE)
  const [errors, setErrors] = useState<QuoteErrors>({})

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const found = validateQuoteForm(values, variant)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    const url = buildWhatsAppUrl(buildQuoteMessage(values))
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Formulário de orçamento">
      {FIELDS[variant].map((field) => {
        const id = `${baseId}-${field.name}`
        const errorId = `${id}-error`
        const error = errors[field.name]
        const shared = {
          id,
          name: field.name,
          value: values[field.name],
          onChange,
          placeholder: ' ',
          'aria-required': field.required || undefined,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
        }
        return (
          <div key={field.name} className={styles.group}>
            <div className={`${styles.field} ${field.type === 'date' ? styles.floated : ''}`}>
              {field.type === 'textarea' ? (
                <textarea {...shared} rows={3} />
              ) : (
                <input
                  {...shared}
                  type={field.type ?? 'text'}
                  inputMode={field.inputMode}
                  autoComplete={field.autoComplete}
                />
              )}
              <label htmlFor={id}>{field.label}</label>
            </div>
            {error && (
              <p id={errorId} role="alert" className={styles.error}>
                {error}
              </p>
            )}
          </div>
        )
      })}
      {children}
      <p className={styles.notice}>
        Ao clicar em solicitar orçamento, você será direcionado ao WhatsApp da Perfect Silk.
      </p>
      <button type="submit" className={styles.submit}>
        {buttonLabel}
      </button>
    </form>
  )
}
