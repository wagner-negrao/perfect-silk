import { useId, useState } from 'react'
import styles from './Accordion.module.css'

export interface AccordionItem {
  question: string
  answer: string
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId()
  const [open, setOpen] = useState<Set<number>>(() => new Set(items.map((_, index) => index)))

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const expanded = open.has(index)
        const panelId = `${baseId}-panel-${index}`
        const triggerId = `${baseId}-trigger-${index}`
        return (
          <div key={item.question} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                {item.question}
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!expanded} className={styles.panel}>
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
