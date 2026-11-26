import { CERTIFICATION_GROUPS } from '@/common/constants/certifications'

const topics: Record<number, string> = { 2026: 'New frontiers. AI and exploration.', 2025: 'Engineering in practice.', 2024: 'Building the foundations.' }

export function TimelineDemo() {
  return <div className="certification-timeline">
    {CERTIFICATION_GROUPS.map(group => <section key={group.year} className="certification-year" aria-labelledby={`year-${group.year}`}>
      <div className="year-heading"><h2 id={`year-${group.year}`}>{group.year}</h2><p>{topics[group.year]}</p></div>
      <ul className={`certification-grid ${group.year === 2026 ? 'certifications-latest' : ''}`}>
        {group.items.map(item => <li key={item.title} className={`certification-card ${item.issuer.startsWith('NASA') ? 'nasa-certification' : ''}`}>
          <div className="certificate-brand" aria-hidden="true">{item.issuer.startsWith('NASA') ? <span className="nasa-mark">NASA</span> : item.issuer === 'DeepLearning.AI' ? <span className="deeplearning-mark">DeepLearning<span>.AI</span></span> : <span className="issuer-mark">{item.issuer === 'Forage' ? 'Forage' : 'Dicoding'}</span>}</div>
          <p className="certificate-type">{item.issuer.startsWith('NASA') ? 'SPACE & SCIENTIFIC SYSTEMS' : item.issuer === 'DeepLearning.AI' ? 'ARTIFICIAL INTELLIGENCE' : 'PROFESSIONAL DEVELOPMENT'}</p>
          <h3>{item.title}</h3>
          <p className="certificate-issuer">{item.issuer}</p>
          <p className="certificate-date">Issued {item.issued}{item.expires ? ` · Expires ${item.expires}` : ''}</p>
          {item.description && <p className="certificate-description">{item.description}</p>}
          {item.skills.length > 0 && <ul aria-label="Skills" className="certificate-skills">{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>}
          <div className="certificate-bottom">
            {item.credentialId && <details className="credential-details"><summary>Credential details</summary><p>Credential ID: {item.credentialId}</p></details>}
            {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="credential-link">{item.linkLabel ?? 'Show credential'}</a>}
          </div>
        </li>)}
      </ul>
    </section>)}
  </div>
}
