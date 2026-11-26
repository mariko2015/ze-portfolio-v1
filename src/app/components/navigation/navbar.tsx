'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '../theme-toggle'

const routes = [{ href: '/', label: 'Home' }, { href: '/blog', label: 'Blog' }, { href: '/edu', label: 'Education' }]

export default function MainNav({ className = '' }: { className?: string }) {
  const pathname = usePathname()
  return <header className={`site-header ${className}`}>
    <nav aria-label="Main navigation" className="site-navigation">
      <Link href="/" aria-label="Zeddin home" className="wordmark"><span className="hidden sm:inline">ezzeddin.</span><span className="sm:hidden">e.</span></Link>
      <div className="navigation-links">
        {routes.map(route => {
          const active = route.href === '/' ? pathname === '/' : pathname.startsWith(route.href)
          return <Link key={route.href} href={route.href} aria-current={active ? 'page' : undefined} className={active ? 'navigation-active' : ''}>{route.label}</Link>
        })}
        <ModeToggle />
      </div>
    </nav>
  </header>
}
