import type { Metadata } from 'next'
import { TimelineDemo } from '@/components/ui/timeline-demo'
import Footer from '../components/Footer/footer'

export const metadata: Metadata = {
  title: 'Education & Certifications',
  description: 'Licenses and certifications in software engineering, generative AI, and data systems earned by Mohammad Ezzeddin Pratama.',
  alternates: { canonical: '/edu' },
}

export default function EducationPage() {
  return <>
    <section className="education-hero section-shell">
      <p className="section-eyebrow">EDUCATION & CERTIFICATIONS</p>
      <h1>Always curious.<br /><span>Never done learning.</span></h1>
      <p className="education-description">New perspectives. Deeper understanding.<br />A collection of milestones along the way.</p>
      <nav aria-label="Certification years" className="year-navigation"><a href="#year-2026">2026</a><a href="#year-2025">2025</a><a href="#year-2024">2024</a></nav>
    </section>
    <div className="certifications-section"><div className="section-shell"><TimelineDemo /></div></div>
    <Footer />
  </>
}
