import styles from './Process.module.css'

const STEPS = [
  { title: 'Corte', text: 'O tecido começa a ganhar a forma do seu projeto.' },
  { title: 'Confecção', text: 'Costura e montagem das peças na nossa produção.' },
  { title: 'Personalização', text: 'Serigrafia ou sublimação conforme a necessidade da arte e do tecido.' },
  { title: 'Acabamento', text: 'A etapa final que reúne os detalhes de cada peça.' },
]

export function Process() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="process-title">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow eyebrow--accent">Produção própria. Do início ao fim.</p>
        <h2 id="process-title" className={`section-title ${styles.title}`}>
          <span className="line">Do primeiro corte</span> <span className="line">ao último detalhe.</span>
        </h2>
        <p className={styles.lead}>
          Mais do que estampar peças prontas: desenvolvemos o seu projeto com confecção e personalização integradas.
        </p>
        <img
          className={styles.photo}
          src="/images/processo-serigrafia.webp"
          alt="Registro real da produção de serigrafia da Perfect Silk"
          width={1254}
          height={1254}
          loading="lazy"
        />
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
