import type { ReactNode } from 'react'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import styles from './WhatsAppButton.module.css'

interface Props {
  children: ReactNode
  message?: string
  size?: 'md' | 'lg'
  className?: string
}

export function WhatsAppButton({ children, message, size = 'md', className }: Props) {
  const classes = [styles.button, size === 'lg' ? styles.lg : '', className].filter(Boolean).join(' ')
  return (
    <a className={classes} href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> (abre o WhatsApp em nova aba)</span>
    </a>
  )
}
