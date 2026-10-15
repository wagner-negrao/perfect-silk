import { PROJECTS } from '../../content/site'
import { ProjectGallery } from '../../components/ProjectGallery'
import styles from './ProjectsShowcase.module.css'

export function ProjectsShowcase() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="showcase-title">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow eyebrow--accent">Trabalhos da Perfect Silk</p>
        <h2 id="showcase-title" className="section-title">
          <span className="line">Sua marca ganha</span> <span className="line">forma por aqui.</span>
        </h2>
        <p className={styles.lead}>
          Camisetas, uniformes, bonés, bolsas e brindes: conheça alguns dos produtos personalizados da nossa produção.
        </p>
        <ProjectGallery projects={PROJECTS} />
      </div>
    </section>
  )
}
