import styles from './Customization.module.css'

const TECHNIQUES = [
  {
    index: '01',
    title: 'Serigrafia',
    text: 'Estamparia com aplicação de tinta por tela. A avaliação considera a arte, a quantidade de cores, o tecido e o volume do pedido.',
    image: '/images/serigrafia-camisetas.webp',
    alt: 'Camisetas estampadas por serigrafia durante a produção',
    width: 406,
    height: 415,
    tone: 'white',
  },
  {
    index: '02',
    title: 'Sublimação',
    text: 'Transferência da arte por calor para materiais compatíveis. Uma opção para projetos com cores e detalhes, conforme o produto escolhido.',
    image: '/images/sublimacao-uniforme.webp',
    alt: 'Uniforme personalizado por sublimação',
    width: 407,
    height: 397,
    tone: 'sage',
  },
] as const

export function Customization() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="custom-title">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">A técnica certa para a sua ideia</p>
        <h2 id="custom-title" className="section-title">
          <span className="line">Sua identidade.</span> <span className="line">Muitas possibilidades.</span>
        </h2>
        <div className={styles.grid}>
          {TECHNIQUES.map((item) => (
            <article key={item.title} className={`${styles.card} ${item.tone === 'sage' ? styles.sage : ''}`}>
              <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
              <p className={`eyebrow ${styles.label}`}>{item.index} / Personalização</p>
              <h3>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
