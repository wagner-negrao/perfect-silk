import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo page={{ path: '/404', title: 'Página não encontrada | Perfect Silk', description: 'A página procurada não existe.', noindex: true }} />
      <section className="section--lg" style={{ background: 'var(--paper)' }} aria-labelledby="notfound-title">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
          <h1 id="notfound-title" className="page-title">
            Página não encontrada
          </h1>
          <p>O endereço que você acessou não existe ou foi movido.</p>
          <Link to="/" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    </>
  )
}
