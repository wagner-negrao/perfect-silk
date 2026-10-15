import styles from './WhyUs.module.css'

const REASONS = [
  { title: 'Confecção e estampa integradas', text: 'Seu projeto é acompanhado do corte à personalização final.' },
  { title: 'Feito para o seu contexto', text: 'Soluções para empresas, organizações e eventos.' },
  { title: 'Versatilidade na personalização', text: 'Serigrafia e sublimação para adaptar sua identidade a diferentes peças.' },
]

export function WhyUs() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="why-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="why-title" className="section-title">
          <span className="line">Uma produção.</span> <span className="line">Todos os detalhes.</span>
        </h2>
        <ol className={styles.list}>
          {REASONS.map((reason, index) => (
            <li key={reason.title} className={styles.item}>
              <h3>
                {String(index + 1).padStart(2, '0')}&nbsp;&nbsp;{reason.title}
              </h3>
              <p>{reason.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
