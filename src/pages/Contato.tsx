import { Breadcrumb } from '../components/Breadcrumb'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { CONTACT } from '../content/site'
import { PAGES } from '../lib/seo'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import styles from './Contato.module.css'

const NEXT_STEPS = [
  { title: 'Entendimento do pedido', text: 'A equipe avalia produto, arte, quantidade e finalidade.' },
  { title: 'Definição da proposta', text: 'Materiais, técnica, valores e prazo são tratados no orçamento.' },
  { title: 'Alinhamento da produção', text: 'A produção segue os detalhes combinados no pedido aprovado.' },
]

export default function Contato() {
  return (
    <>
      <Seo page={PAGES.contato} />

      <section className={`section--lg ${styles.intro}`} aria-labelledby="contact-title">
        <div className={`container ${styles.stack}`}>
          <Breadcrumb current="Contato" />
          <h1 id="contact-title" className="page-title">
            <span className="line">Vamos dar forma</span> <span className="line">ao seu próximo projeto.</span>
          </h1>
          <p className={styles.lead}>
            Fale com a Perfect Silk sobre camisetas, uniformes e produtos personalizados. Compartilhe sua ideia para
            começarmos o orçamento.
          </p>
        </div>
      </section>

      <section className={`section--lg ${styles.quote}`} aria-labelledby="contact-quote-title">
        <div className={`container ${styles.quoteGrid}`}>
          <div className={styles.channels}>
            <h2 className="section-title--md" style={{ fontSize: 32 }}>
              Fale com a gente.
            </h2>
            <div>
              <p className={styles.label}>WhatsApp</p>
              <a
                className={styles.phone}
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT.phone}
                <span className="visually-hidden"> (abre o WhatsApp em nova aba)</span>
              </a>
            </div>
            <div>
              <p className={styles.label}>E-mail</p>
              <a className={styles.email} href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className={styles.label}>Onde estamos</p>
              <address className={styles.address}>
                <span className="line">{CONTACT.streetLine}</span>
                <span className="line">Cidade Nova VIII</span>
                <span className="line">Ananindeua / PA · CEP 67133-805</span>
              </address>
            </div>
            <p className={styles.note}>
              Para combinar retirada ou entrega, informe sua localização ao solicitar o orçamento.
            </p>
            <img
              className={styles.photo}
              src="/images/contato-kit.webp"
              alt="Kit de produtos personalizados pela Perfect Silk"
              width={405}
              height={417}
              loading="lazy"
            />
          </div>

          <div className={styles.formCard}>
            <h2 id="contact-quote-title" className={styles.formTitle}>
              Solicite seu orçamento
            </h2>
            <p className={styles.formLead}>Preencha os detalhes do seu pedido.</p>
            <QuoteForm variant="full">
              <p className={styles.formNote}>
                Envie sua arte no atendimento pelo WhatsApp ou e-mail. Se ainda não tiver um arquivo, descreva a ideia
                no pedido.
              </p>
            </QuoteForm>
          </div>
        </div>
      </section>

      <section className={`section--lg ${styles.steps}`} aria-labelledby="contact-steps-title">
        <div className={`container ${styles.stack}`}>
          <h2 id="contact-steps-title" className="section-title--md" style={{ color: 'var(--white)' }}>
            O que acontece depois do contato?
          </h2>
          <ol className={styles.stepList}>
            {NEXT_STEPS.map((step, index) => (
              <li key={step.title}>
                <h3>
                  {String(index + 1).padStart(2, '0')}&nbsp;&nbsp;{step.title}
                </h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
