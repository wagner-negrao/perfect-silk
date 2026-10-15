import { WhatsAppButton } from '../../components/WhatsAppButton'
import styles from './Hero.module.css'

const HIGHLIGHTS = ['Confecção própria', 'Personalização para sua marca', 'Personalização para diferentes projetos']

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.presentation}>
          <div className={styles.copy}>
            <p className={`eyebrow ${styles.eyebrow}`}>Confecção + Serigrafia + Sublimação</p>
            <h1 id="hero-title" className={styles.title}>
              <span className="line">Da confecção</span> <span className="line">à estampa.</span>{' '}
              <span className={`line ${styles.accent}`}>Sua marca em</span>{' '}
              <span className={`line ${styles.accent}`}>cada detalhe.</span>
            </h1>
            <p className={styles.lead}>
              Camisetas, uniformes e produtos personalizados para empresas, organizações e eventos.
              Produção própria, do primeiro corte ao acabamento.
            </p>
            <WhatsAppButton>Solicitar meu orçamento →</WhatsAppButton>
            <p className={styles.meta}>Produção própria / A partir de 20 peças</p>
          </div>
          <img
            className={styles.photo}
            src="/images/hero-serigrafia.webp"
            alt="Camisa azul sublimada com bandeira do Brasil e logotipo aplicado, produzida pela Perfect Silk"
            width={963}
            height={1280}
          />
        </div>
        <ol className={styles.highlights}>
          {HIGHLIGHTS.map((text, index) => (
            <li key={text}>
              <span>{String(index + 1).padStart(2, '0')}</span> {text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
