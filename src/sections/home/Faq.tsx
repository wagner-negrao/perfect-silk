import { Accordion, type AccordionItem } from '../../components/Accordion'
import styles from './Faq.module.css'

export const FAQ_ITEMS: AccordionItem[] = [
  {
    question: 'Posso enviar a arte da minha marca?',
    answer: 'Sim. Envie sua arte ao solicitar o orçamento para avaliarmos os detalhes da personalização.',
  },
  {
    question: 'A Perfect Silk confecciona as peças?',
    answer: 'Sim. Temos confecção própria e acompanhamos o corte, a costura e a personalização final.',
  },
  {
    question: 'Qual a diferença entre serigrafia e sublimação?',
    answer:
      'A serigrafia aplica tinta por meio de uma tela. A sublimação transfere a arte com calor e exige materiais compatíveis. A escolha depende do tecido e do resultado desejado.',
  },
  {
    question: 'Como solicitar um orçamento?',
    answer:
      'Informe o tipo de produto, a quantidade, a data desejada e envie sua arte, se disponível. Nossa equipe avalia os detalhes do pedido.',
  },
  {
    question: 'Qual é o prazo de produção?',
    answer: 'O prazo é definido no orçamento, conforme quantidade, materiais, personalização e disponibilidade de produção.',
  },
]

export function Faq() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="faq-title" className="section-title">
          <span className="line">Antes de produzir,</span> <span className="line">vamos esclarecer.</span>
        </h2>
        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  )
}
