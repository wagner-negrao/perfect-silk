import { Link } from 'react-router-dom'
import { CONTACT, NAV_ITEMS } from '../content/site'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Rodapé" className={styles.nav}>
          <p className={styles.navTitle}>Navegação</p>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.heading}>Perfect Silk</p>
            <p className={styles.text}>
              <span className="line">Da confecção à estampa.</span>
              <span className="line">Sua marca em cada detalhe.</span>
            </p>
            <div className={styles.social} aria-hidden="true">
              <img src="/images/instagram.svg" alt="" width={46} height={50} />
              <img src="/images/facebook.svg" alt="" width={51} height={45} />
            </div>
          </div>
          <div className={styles.column}>
            <p className={styles.heading}>Fale com a gente</p>
            <address className={styles.text}>
              <span className="line">{CONTACT.phone}</span>
              <span className="line">{CONTACT.email}</span>
            </address>
          </div>
          <div className={styles.column}>
            <p className={styles.heading}>{CONTACT.city}</p>
            <address className={styles.text}>
              <span className="line">{CONTACT.streetLine}</span>
              <span className="line">{CONTACT.districtLine}</span>
            </address>
          </div>
        </div>
        <p className={styles.legal}>Perfect Silk · Confecção · Serigrafia · Sublimação</p>
        <p className={styles.legal}>
          <Link to="/privacidade" className={styles.privacy}>
            Política de privacidade
          </Link>
        </p>
      </div>
    </footer>
  )
}
