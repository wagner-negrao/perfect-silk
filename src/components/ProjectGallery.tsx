import type { Project } from '../content/site'
import styles from './ProjectGallery.module.css'

export function ProjectGallery({ projects }: { projects: Project[] }) {
  return (
    <ul className={styles.grid}>
      {projects.map((project) => (
        <li key={project.name} className={styles.card}>
          <img src={project.image} alt={project.alt} width={540} height={501} loading="lazy" />
          <h3>{project.name}</h3>
        </li>
      ))}
    </ul>
  )
}
