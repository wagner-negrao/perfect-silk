import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../content/site'
import { WhatsAppButton } from './WhatsAppButton'
import styles from './Header.module.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={close}>
          <img
            src="/images/logo.webp"
            alt="Perfect Silk — Serigrafia, Confecção, Sublimação"
            width={302}
            height={69}
          />
        </Link>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        <nav
          id="main-menu"
          aria-label="Principal"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
        >
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                  onClick={close}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <WhatsAppButton size="lg">Solicitar orçamento →</WhatsAppButton>
        </nav>
      </div>
    </header>
  )
}
