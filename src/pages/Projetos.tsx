import { Breadcrumb } from '../components/Breadcrumb'
import { Seo } from '../components/Seo'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { PAGES } from '../lib/seo'
import styles from './Projetos.module.css'

const PRODUCTS = [
  { name: 'Uniformes esportivos', text: 'Identidade visual aplicada a peças para equipes.', image: '/images/produto-sport.webp', alt: 'Uniforme esportivo personalizado', position: '50% 50%' },
  { name: 'Camisetas para eventos', text: 'Personalização para encontros e ações especiais.', image: '/images/produto-event.webp', alt: 'Camiseta personalizada para evento', position: '50% 50%' },
  { name: 'Bonés personalizados', text: 'Acessórios que ampliam a presença da marca.', image: '/images/produto-cap.webp', alt: 'Boné personalizado', position: '50% 50%' },
  { name: 'Ecobags personalizadas', text: 'Bolsas para kits e eventos.', image: '/images/produto-bags.webp', alt: 'Ecobags personalizadas', position: '50% 50%' },
  { name: 'Cadernos personalizados', text: 'Papelaria com identidade própria.', image: '/images/produto-book.webp', alt: 'Caderno personalizado', position: '50% 50%' },
  { name: 'Canetas personalizadas', text: 'Brindes para diferentes momentos de contato.', image: '/images/produto-pens.webp', alt: 'Canetas personalizadas', position: '45% 60%' },
  { name: 'Copos personalizados', text: 'Aplicações para campanhas e eventos.', image: '/images/produto-cup.webp', alt: 'Copo personalizado', position: '50% 50%' },
  { name: 'Copos com tampa', text: 'Produtos para compor kits personalizados.', image: '/images/produto-mug.webp', alt: 'Copo com tampa personalizado', position: '50% 50%' },
  { name: 'Kits para eventos', text: 'Combinações de acessórios e bolsas.', image: '/images/produto-kit.webp', alt: 'Kit personalizado para eventos', position: '50% 50%' },
]

export default function Projetos() {
  return (
    <>
      <Seo page={PAGES.projetos} />

      <section className={`section--lg ${styles.intro}`} aria-labelledby="proj-title">
        <div className={`container ${styles.stack}`}>
          <Breadcrumb current="Projetos" />
          <h1 id="proj-title" className="page-title">
            <span className="line">Ideias diferentes.</span> <span className="line">Uma identidade em cada peça.</span>
          </h1>
          <p className={styles.lead}>
            Conheça produtos e aplicações da Perfect Silk: uniformes, camisetas, acessórios e brindes personalizados para
            empresas e eventos.
          </p>
          <img
            className={styles.banner}
            src="/images/produto-caps.webp"
            alt="Bonés personalizados em diferentes cores produzidos pela Perfect Silk"
            width={980}
            height={483}
          />
        </div>
      </section>

      <section className={`section--lg ${styles.gallery}`} aria-labelledby="proj-gallery-title">
        <div className={`container ${styles.stack}`}>
          <p className="eyebrow eyebrow--accent">Personalização em diferentes formatos</p>
          <h2 id="proj-gallery-title" className="section-title--md">
            Do uniforme ao brinde.
          </h2>
          <ul className={styles.grid}>
            {PRODUCTS.map((product) => (
              <li key={product.name} className={styles.card}>
                <img
                  src={product.image}
                  alt={product.alt}
                  width={473}
                  height={420}
                  loading="lazy"
                  style={{ objectPosition: product.position }}
                />
                <h3>{product.name}</h3>
                <p>{product.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section--lg ${styles.next}`} aria-labelledby="proj-next-title">
        <div className={`container ${styles.stack}`}>
          <h2 id="proj-next-title" className="section-title--md">
            <span className="line">O próximo projeto pode</span> <span className="line">levar a sua marca.</span>
          </h2>
          <p className={styles.lead}>
            Conte qual produto você procura, como pretende usá-lo e a quantidade desejada. Nossa equipe avalia as
            possibilidades de confecção e personalização.
          </p>
          <WhatsAppButton
            size="lg"
            message="Olá! Quero personalizar meu projeto com a Perfect Silk."
          >
            Quero personalizar meu projeto →
          </WhatsAppButton>
        </div>
      </section>
    </>
  )
}
