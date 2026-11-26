import Image from 'next/image'
import Link from 'next/link'

export default function IntroLogic() {
  return <section className="portfolio-hero" aria-labelledby="intro-title">
    <div className="section-shell hero-copy">
      <p className="hero-eyebrow">Mohammad Ezzeddin Pratama</p>
      <h1 id="intro-title">Curiosity meets<br /><span className="hero-gradient">engineering.</span></h1>
      <p className="hero-description">Software engineer. Always a student.<br />Building thoughtful systems, from Earth to the Moon.</p>
      <div className="hero-actions">
        <a href="#projects" className="button-primary">Explore my work</a>
        <a href="https://www.linkedin.com/in/mohammad-ezzeddin-pratama" target="_blank" rel="noopener noreferrer" className="button-secondary">Let&apos;s connect</a>
      </div>
      <p className="hero-context">Software Engineer Intern at RIS <span aria-hidden="true">·</span> Information Systems at BINUS</p>
      <div className="hero-showcase" aria-label="Recent work">
        <Link href="/experience-detail/Skyline" prefetch={false} className="showcase-card showcase-skyline">
          <Image src="/skyline.jpg" alt="Skyline: lunar mission planning for NASA Space Apps Challenge 2026" width={800} height={450} sizes="(min-width: 1024px) 520px, (min-width: 640px) 44vw, 85vw" priority />
          <span>Exploring what&apos;s next. <strong>Skyline</strong></span>
        </Link>
        <Link href="/experience-detail/ConsumerIQ" prefetch={false} className="showcase-card showcase-consumer">
          <Image src="/consumeriq.jpg" alt="ConsumerIQ: validate real market demand before you build" width={800} height={450} sizes="(min-width: 1024px) 520px, (min-width: 640px) 44vw, 85vw" />
          <span>Understanding what matters. <strong>ConsumerIQ</strong></span>
        </Link>
      </div>
    </div>
  </section>
}
