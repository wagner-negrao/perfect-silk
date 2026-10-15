import { Breadcrumb } from '../components/Breadcrumb'
import { Seo } from '../components/Seo'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { PAGES } from '../lib/seo'
import styles from './Producao.module.css'

const STEPS = [
  {
    title: 'Briefing e definição',
    text: 'Entendemos o uso da peça, a quantidade, a arte e a data desejada. Esses detalhes orientam a avaliação do projeto.',
  },
  {
    title: 'Corte e confecção',
    text: 'Quando o projeto envolve confecção própria, o tecido passa pelo corte e pela costura para formar as peças.',
  },
  {
    title: 'Personalização',
    text: 'Avaliamos serigrafia ou sublimação conforme a arte, o tecido e a aplicação pretendida.',
  },
  {
    title: 'Acabamento e entrega',
    text: 'Os detalhes de acabamento, o prazo e a forma de entrega são definidos de acordo com o orçamento aprovado.',
  },
]

const TECHNIQUES = [
  {
    title: 'Serigrafia',
    text: 'Aplicação de tinta por meio de uma tela. A avaliação considera a arte, o número de cores, o material e a quantidade de peças.',
    image: '/images/tecnica-serigrafia.webp',
    alt: 'Camisetas estampadas por serigrafia na produção da Perfect Silk',
    position: '50% 50%',
  },
  {
    title: 'Sublimação',
    text: 'Transferência da arte com calor para materiais compatíveis. A escolha depende da composição e da cor do tecido ou da superfície utilizada.',
    image: '/images/tecnica-sublimacao.webp',
    alt: 'Uniforme esportivo personalizado por sublimação',
    position: '50% 16%',
  },
]

const CHECKLIST = [
  'Tipo de produto e finalidade',
  'Quantidade e tamanhos desejados',
  'Arte ou identidade da sua marca',
  'Data e local de entrega pretendidos',
]

export default function Producao() {
  return (
    <>
      <Seo page={PAGES.producao} />

      <section className={`section--lg ${styles.intro}`} aria-labelledby="prod-title">
        <div className={`container ${styles.stack}`}>
          <Breadcrumb current="Produção" />
          <div className={styles.introGrid}>
            <div className={styles.introCopy}>
              <h1 id="prod-title" className="page-title">
                <span className="line">Do tecido à peça.</span> <span className="line">Da ideia à estampa.</span>
              </h1>
              <p className={styles.subtitle}>Confecção e personalização em um só lugar.</p>
              <p className={styles.lead}>
                A Perfect Silk desenvolve camisetas, uniformes e produtos personalizados para empresas, organizações e
                eventos. Com produção própria, acompanhamos o corte, a costura e a personalização final.
              </p>
              <WhatsAppButton size="lg">Conversar sobre meu projeto →</WhatsAppButton>
            </div>
            <img
              className={styles.introImage}
              src="/images/producao-hero.webp"
              alt="Camiseta personalizada produzida pela Perfect Silk"
              width={406}
              height={415}
            />
          </div>
        </div>
      </section>

      <section className={`section--lg ${styles.steps}`} aria-labelledby="prod-steps-title">
        <div className={`container ${styles.stack}`}>
          <p className="eyebrow eyebrow--accent">Como o seu projeto ganha forma</p>
          <h2 id="prod-steps-title" className="section-title--md">
            <span className="line">Um processo completo.</span> <span className="line">Um projeto com a sua identidade.</span>
          </h2>
          <ol className={styles.stepList}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`section--lg ${styles.techniques}`} aria-labelledby="prod-tech-title">
        <div className={`container ${styles.stack}`}>
          <p className="eyebrow eyebrow--accent">Personalização com critério</p>
          <h2 id="prod-tech-title" className="section-title--md">
            <span className="line">A técnica acompanha</span> <span className="line">a necessidade do projeto.</span>
          </h2>
          <div className={styles.techGrid}>
            {TECHNIQUES.map((item) => (
              <article key={item.title} className={styles.technique}>
                <img
                  src={item.image}
                  alt={item.alt}
                  width={725}
                  height={430}
                  loading="lazy"
                  style={{ objectPosition: item.position }}
                />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section--lg ${styles.prepare}`} aria-labelledby="prod-prepare-title">
        <div className={`container ${styles.stack}`}>
          <h2 id="prod-prepare-title" className="section-title--md">
            O que ajuda a preparar seu orçamento?
          </h2>
          <div className={styles.prepareGrid}>
            <ol className={styles.checklist}>
              {CHECKLIST.map((item, index) => (
                <li key={item}>
                  {String(index + 1).padStart(2, '0')}&nbsp;&nbsp;{item}
                </li>
              ))}
            </ol>
            <div className={styles.guidance}>
              <h3>Ainda não sabe qual técnica escolher?</h3>
              <p>
                Envie a sua ideia e os detalhes do uso. A escolha da personalização é avaliada junto com as
                características do material e da arte.
              </p>
              <WhatsAppButton
                size="lg"
                message="Olá! Ainda não sei qual técnica escolher e gostaria de orientação da Perfect Silk."
              >
                Solicitar orientação →
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
