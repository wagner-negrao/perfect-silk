import { buildWhatsAppUrl } from '../../lib/whatsapp'
import styles from './Solutions.module.css'

const SOLUTIONS = [
  {
    title: 'Uniformes corporativos',
    text: 'Identidade e presença para a sua equipe. Camisetas e polos alinhadas à sua marca.',
    image: '/images/uniformes-corporativos.webp',
    alt: 'Camisetas verdes estampadas com logotipo de empresa sobre a mesa de produção',
  },
  {
    title: 'Camisetas para eventos',
    text: 'Sua campanha, encontro ou ação promocional com uma identidade que conecta.',
    image: '/images/camisetas-eventos.webp',
    alt: 'Camiseta preta com estampa colorida de carros para evento',
  },
  {
    title: 'Linha esportiva',
    text: 'Personalização para equipes e eventos esportivos, com opções de sublimação.',
    image: '/images/linha-esportiva-m.webp',
    alt: 'Camisa esportiva azul-marinho e dourada personalizada para equipe escolar',
  },
  {
    title: 'Produtos personalizados',
    text: 'Projetos sob consulta, de acordo com a peça, o material e a aplicação.',
    image: '/images/produtos-personalizados.webp',
    alt: 'Ecobag de algodão cru com ilustração colorida estampada',
  },
]

export function Solutions() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="solutions-title">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">O que a sua marca precisa?</p>
        <h2 id="solutions-title" className="section-title">
          <span className="line">Uma solução para</span> <span className="line">cada ocasião.</span>
        </h2>
        <ul className={styles.grid}>
          {SOLUTIONS.map((item) => (
            <li key={item.title} className={styles.card}>
              <img src={item.image} alt={item.alt} width={963} height={1280} loading="lazy" />
              <h3>
                <a
                  href={buildWhatsAppUrl(`Olá! Gostaria de um orçamento de ${item.title.toLowerCase()} da Perfect Silk.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title} ↗
                  <span className="visually-hidden"> (abre o WhatsApp em nova aba)</span>
                </a>
              </h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
