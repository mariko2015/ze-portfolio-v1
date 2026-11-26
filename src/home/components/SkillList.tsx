const capabilities = [
  { title: 'Interfaces that feel right.', category: 'WEB & MOBILE', description: 'Thoughtful experiences for the browser and the device in your hand.', tools: ['Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'Expo'] },
  { title: 'Strong beneath the surface.', category: 'BACKEND & DATA', description: 'APIs, services, and data pipelines that connect every part of a product.', tools: ['Go', 'Node.js', 'Java', 'PostgreSQL', 'Supabase', 'Docker'] },
  { title: 'Room for intelligence.', category: 'AI & INTEGRATION', description: 'Turning data and AI services into useful, practical product experiences.', tools: ['Bright Data', 'Generative AI', 'RAG', 'API Integration', 'Gemini AI'] },
]

export default function SkillList() {
  return <section className="capabilities-section">
    <div className="section-shell">
      <div className="section-intro"><div><p className="section-eyebrow">THE TOOLKIT</p><h2>Different layers.<br />One connected experience.</h2></div><p>From the first interaction<br className="hidden sm:block" /> to the systems behind it.</p></div>
      <div className="capabilities-grid">
        {capabilities.map(item => <article key={item.category} className="capability">
          <p className="project-kicker">{item.category}</p>
          <h3>{item.title}</h3><p>{item.description}</p>
          <div className="tool-list">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
        </article>)}
      </div>
    </div>
  </section>
}
