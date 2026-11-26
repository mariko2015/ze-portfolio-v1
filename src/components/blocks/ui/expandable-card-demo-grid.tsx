import Image from 'next/image'
import Link from 'next/link'
import { cards } from './expandable-card-data'

const projects = [...cards].sort((a, b) => b.id - a.id)
const featured: Record<number, { label: string; subtitle: string }> = {
  11: { label: 'NASA SPACE APPS CHALLENGE', subtitle: 'Mission planning. Beyond Earth.' },
  10: { label: 'AWARD-WINNING MARKET INTELLIGENCE', subtitle: 'Know the market. Before you build.' },
}

export default function ProjectList() {
  return <section id="projects" aria-label="Selected projects" className="work-section">
    <div className="section-shell">
      <div className="section-intro">
        <div><p className="section-eyebrow">SELECTED WORK</p><h2>Built with purpose.</h2></div>
        <p>A closer look at the ideas I&apos;ve<br className="hidden sm:block" /> helped turn into working software.</p>
      </div>
      <ul className="projects-grid">
        {projects.map(card => {
          const feature = featured[card.id]
          return <li key={card.id} className={`project-tile ${feature ? 'project-featured' : ''}`}>
            <Link href={`/experience-detail/${encodeURIComponent(card.title)}`} prefetch={false} className="project-tile-link">
              {feature && <div className="project-feature-copy">
                <p className="project-kicker">{feature.label}</p>
                <h3>{card.title}</h3>
                <p className="project-feature-subtitle">{feature.subtitle}</p>
              </div>}
              <div className="project-image">
                <Image src={card.images[0]} alt={`${card.title} project preview`} fill
                  sizes={feature ? '(min-width: 1200px) 540px, (min-width: 768px) 44vw, 90vw' : '(min-width: 1200px) 540px, (min-width: 768px) 44vw, 90vw'}
                  className="object-cover" />
              </div>
              <div className="project-tile-copy">
                {!feature && <><p className="project-date">{card.duration}</p><h3>{card.title}</h3></>}
                <p className="project-description">{feature ? (card.id === 11 ? 'Go API gateway, scientific services, and lunar terrain data. Connected with care.' : 'From web data to actionable insight. 1st Place in the Featherless AI Track.') : card.description}</p>
                <div className="project-tile-footer"><span>{card.id === 11 ? 'Backend engineering' : card.id === 10 ? 'Data & AI' : card.role}</span><span className="project-discover">Explore project</span></div>
              </div>
            </Link>
          </li>
        })}
      </ul>
    </div>
  </section>
}
