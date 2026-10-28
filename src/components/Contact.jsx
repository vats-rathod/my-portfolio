import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { CONTACT } from '../data.js'

export default function Contact() {
  const links = [
    CONTACT.whatsapp && { href: CONTACT.whatsapp, label: 'Chat on WhatsApp', ext: true },
    CONTACT.linkedin && { href: CONTACT.linkedin, label: 'LinkedIn', ext: true },
    CONTACT.github && { href: CONTACT.github, label: 'GitHub', ext: true },
    CONTACT.email && { href: `mailto:${CONTACT.email}`, label: 'Email' },
  ].filter(Boolean)

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Contact</span>
        </Reveal>
        <Reveal as="h2" className="display" delay={80}>
          Let’s build something <span className="serif-em">worth shipping.</span>
        </Reveal>
        <Reveal as="p" className="contact-lede" delay={140}>
          Interested in AI agent infrastructure, tool orchestration, or backend architecture? I’m always glad to talk
          shop.
        </Reveal>

        {links.length > 0 && (
          <Reveal className="contact-links" delay={200}>
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                className={`btn ${i === 0 ? 'btn-primary' : ''}`}
                {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {l.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}
