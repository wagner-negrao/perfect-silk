import { QuoteForm } from '../../components/QuoteForm'
import { CONTACT } from '../../content/site'
import styles from './QuoteSection.module.css'

export function QuoteSection() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="quote-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow" style={{ color: 'var(--ink)' }}>Vamos tirar sua ideia do papel?</p>
          <h2 id="quote-title" className={styles.title}>
            <span className="line">Sua próxima peça</span> <span className="line">começa aqui.</span>
          </h2>
          <p className={styles.lead}>Conte o que sua empresa precisa e vamos avaliar o seu projeto.</p>
          <p className={styles.contact}>
            {CONTACT.phone} · {CONTACT.email}
          </p>
        </div>
        <div className={styles.form}>
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
