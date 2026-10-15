import { Breadcrumb } from '../components/Breadcrumb'
import { Seo } from '../components/Seo'
import { PAGES } from '../lib/seo'

export default function Privacy() {
  return (
    <>
      <Seo page={PAGES.privacidade} />
      <section className="section--lg" style={{ background: 'var(--paper)' }} aria-labelledby="privacy-title">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
          <Breadcrumb current="Política de privacidade" />
          <h1 id="privacy-title" className="page-title">
            Política de privacidade
          </h1>
          <p>
            O site da Perfect Silk não armazena os dados enviados no formulário de orçamento. Ao solicitar um orçamento,
            as informações preenchidas são usadas apenas para compor uma mensagem que você envia diretamente pelo
            WhatsApp da empresa.
          </p>
          <p>Este texto é provisório e será substituído pela política definitiva da Perfect Silk.</p>
        </div>
      </section>
    </>
  )
}
