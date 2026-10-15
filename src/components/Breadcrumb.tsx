import { Link } from 'react-router-dom'
import styles from './Breadcrumb.module.css'

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Você está em" className={styles.nav}>
      <ol>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  )
}
