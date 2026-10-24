import { useEffect, useRef, useState } from 'react'
import {
  ChevronRight,
  Bot,
  Cpu,
  Workflow,
  Plug,
  Sparkles,
  LayoutTemplate,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Activity,
  Server,
} from 'lucide-react'
import './portfolio.css'
import { NAV, EXPERIENCE, CAPABILITIES, PROJECTS, CONTACT } from './data.js'

const YEAR = new Date().getFullYear()

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const [ref, visible] = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'in' : ''} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

function SectionHead({ idx, title, children }) {
  return (
    <Reveal className="sec-head">
      <span className="idx">{idx}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </Reveal>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id === 'top' ? '' : e.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    ;['top', ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="site-header">
      <a href="#top" className="logo" onClick={() => setOpen(false)}>
        <span className="logo-dot" aria-hidden="true" />
        VATSAL<span className="logo-tag">.SDE</span>
      </a>

      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <span className={`burger ${open ? 'open' : ''}`} aria-hidden="true" />
      </button>

      <nav id="primary-nav" className={`nav ${open ? 'open' : ''}`} aria-label="Primary navigation">
        {NAV.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : ''}
            aria-current={active === id ? 'true' : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <div className="nav-status-badge" title="Status: IBM India Software Labs">
          <span className="nav-status-pulse" aria-hidden="true" />
          <span>IBM ISL</span>
        </div>
      </nav>
    </header>
  )
}

// ─── HERO SYSTEM VISUALIZATION (ARCHITECTURAL CONSOLE) ──────────────────────
function HeroAbstractSculpture() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e) => {
      if (!ref.current || window.innerWidth < 980) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) / 28
      const y = (e.clientY - (rect.top + rect.height / 2)) / 28
      ref.current.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`
    }
    const onLeave = () => {
      if (ref.current) {
        ref.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)'
      }
    }
    const target = ref.current
    if (target) {
      window.addEventListener('mousemove', onMove)
      target.addEventListener('mouseleave', onLeave)
    }
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (target) target.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="hero-visual-wrapper" aria-hidden="true">
      <div className="hero-sculpture-card" ref={ref}>
        <div className="sculpture-ambient-glow" />
        <svg viewBox="0 0 500 500" className="hero-sculpture-svg" role="img" focusable="false">
          <defs>
            <linearGradient id="sMonolithTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a3b5c" />
              <stop offset="50%" stopColor="#0c233c" />
              <stop offset="100%" stopColor="#061524" />
            </linearGradient>
            <linearGradient id="sMonolithLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0e2842" />
              <stop offset="100%" stopColor="#040c17" />
            </linearGradient>
            <linearGradient id="sMonolithRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#071b2e" />
              <stop offset="100%" stopColor="#020810" />
            </linearGradient>
            <linearGradient id="sGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#55e1d0" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#0c233c" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="sGlassFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#071a2e" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="sCyanRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#55e1d0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#55e1d0" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="sCoreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#55e1d0" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0c233c" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="sAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#55e1d0" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#071321" stopOpacity="0" />
            </radialGradient>
            <filter id="sGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central radial aura */}
          <circle cx="250" cy="250" r="165" fill="url(#sAura)" />

          {/* Outer orbital ring — slow spin */}
          <g className="sculpture-orbital-ring">
            <ellipse cx="250" cy="250" rx="185" ry="78"
              fill="none" stroke="rgba(85,225,208,0.16)" strokeWidth="1"
              strokeDasharray="5 9 2 9" />
            <circle cx="435" cy="250" r="3" fill="#55e1d0" opacity="0.65" />
            <circle cx="65"  cy="250" r="2.5" fill="#38bdf8" opacity="0.45" />
          </g>

          {/* Inner orbital ring — counter-spin */}
          <g className="sculpture-orbital-ring-reverse">
            <ellipse cx="250" cy="250" rx="138" ry="138"
              fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1"
              strokeDasharray="3 13"
              transform="rotate(-20 250 250)" />
          </g>

          {/* Lower plinth base */}
          <g transform="translate(0,38)">
            <polygon points="250,370 382,294 250,218 118,294" fill="#02070e" opacity="0.75" />
            <polygon points="118,294 250,370 250,412 118,336" fill="url(#sMonolithLeft)" />
            <polygon points="250,370 382,294 382,336 250,412" fill="url(#sMonolithRight)" />
            <polygon points="250,370 382,294 250,218 118,294"
              fill="url(#sMonolithTop)" stroke="rgba(85,225,208,0.18)" strokeWidth="0.8" />
          </g>

          {/* Back tier slab */}
          <polygon points="250,148 342,200 250,252 158,200" fill="url(#sMonolithTop)" opacity="0.88" />
          <polygon points="158,200 250,252 250,268 158,216" fill="url(#sMonolithLeft)" />
          <polygon points="250,252 342,200 342,216 250,268" fill="url(#sMonolithRight)" />

          {/* Central hexagonal monolith */}
          <polygon points="250,108 250,262 143,200 143,138"
            fill="url(#sMonolithLeft)" stroke="rgba(85,225,208,0.13)" strokeWidth="0.8" />
          <polygon points="250,108 357,138 357,200 250,262"
            fill="url(#sMonolithRight)" stroke="rgba(56,189,248,0.13)" strokeWidth="0.8" />
          <polygon points="250,68 357,138 250,108 143,138"
            fill="url(#sMonolithTop)" stroke="url(#sCyanRim)" strokeWidth="1.2" />

          {/* Glowing apex edges */}
          <line x1="250" y1="68" x2="250" y2="262" stroke="#55e1d0" strokeWidth="1.4" opacity="0.82" />
          <line x1="250" y1="68" x2="357" y2="138" stroke="#38bdf8" strokeWidth="1.1" opacity="0.88" />
          <line x1="250" y1="68" x2="143" y2="138" stroke="#55e1d0" strokeWidth="1.1" opacity="0.88" />

          {/* Left glass shard */}
          <polygon points="108,178 190,132 190,258 108,304"
            fill="url(#sGlassFace)" stroke="rgba(85,225,208,0.42)" strokeWidth="0.9" />
          <polygon points="108,178 190,132 222,150 138,196"
            fill="url(#sGlassTop)" stroke="rgba(85,225,208,0.68)" strokeWidth="0.9" />
          <line x1="108" y1="178" x2="108" y2="304" stroke="#55e1d0" strokeWidth="1.1" opacity="0.72" />

          {/* Right glass shard */}
          <polygon points="312,132 392,178 392,304 312,258"
            fill="url(#sGlassFace)" stroke="rgba(56,189,248,0.38)" strokeWidth="0.9" />
          <polygon points="278,150 360,196 392,178 312,132"
            fill="url(#sGlassTop)" stroke="rgba(56,189,248,0.58)" strokeWidth="0.9" />
          <line x1="392" y1="178" x2="392" y2="304" stroke="#38bdf8" strokeWidth="1.1" opacity="0.72" />

          {/* Floating crystalline core nexus */}
          <g filter="url(#sGlow)">
            <polygon points="250,193 287,240 250,287 213,240" fill="url(#sCoreGlow)" opacity="0.78" />
            <polygon points="250,193 250,287 287,240" fill="#38bdf8" opacity="0.38" />
            <polygon points="250,193 250,287 213,240" fill="#55e1d0" opacity="0.58" />
            <circle cx="250" cy="240" r="4" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Axis tick marks */}
          <path d="M250,42 V52 M250,448 V458 M42,250 H52 M448,250 H458"
            stroke="rgba(85,225,208,0.28)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <a href="#experience" className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            Software Development Engineer · IBM ISL
            <ChevronRight className="hero-eyebrow-chevron" aria-hidden="true" />
          </a>

          <h1 className="hero-headline">
            <span className="hero-headline-regular">Building Systems for</span>
            <span className="hero-headline-gradient">AI Agents</span>
          </h1>

          <p className="hero-role">
            I engineer backend infrastructure for AI agents — tool orchestration, Model Context Protocol
            (MCP) integration, and stateful agentic workflows inside <strong>IBM Engineering Lifecycle Management (ELM)</strong>.
          </p>

          <div className="hero-meta-strip">
            <div className="hero-meta-item">
              <Terminal size={14} className="hero-meta-icon" aria-hidden="true" />
              <span>Stack: <span className="mono-val">Python · FastAPI · LangGraph</span></span>
            </div>
            <div className="hero-meta-item">
              <Activity size={14} className="hero-meta-icon" aria-hidden="true" />
              <span>Domain: <span className="mono-val">AI Infrastructure &amp; ELM</span></span>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#projects" className="btn solid">
              Explore My Work
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="#capabilities" className="btn btn-secondary">
              Capabilities
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>

        <HeroAbstractSculpture />
      </div>
    </section>
  )
}

function About() {
  const specs = [
    { label: 'Role', value: 'Software Development Engineer' },
    { label: 'Organization', value: 'IBM India Software Labs' },
    { label: 'Location', value: 'Gandhinagar, Gujarat, India' },
    { label: 'Focus Area', value: 'AI Agent Infrastructure & Tool Orchestration', accent: true },
    { label: 'Primary Stack', value: 'Python · FastAPI · LangGraph · LangChain · MCP · React' },
    { label: 'Product Domain', value: 'IBM Engineering Lifecycle Management (ELM)' },
  ]

  return (
    <section className="about" id="about">
      <SectionHead idx="§ 01 — Overview" title="About">
        Bridging backend software engineering and applied AI systems.
      </SectionHead>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            I’m a <strong>Software Development Engineer</strong> at IBM India Software Labs, working on the AI
            infrastructure layer of <strong>Engineering Lifecycle Management (ELM)</strong> — mission-critical software
            that empowers systems and software engineering teams to manage requirements, verification, and quality across
            complex product lifecycles.
          </p>
          <p>
            My work focuses on the intersection of <strong>backend architecture and agentic AI</strong>: designing robust
            database schemas, asynchronous FastAPI endpoints, integrating Model Context Protocol (MCP) servers so AI agents
            can invoke tools and external systems safely, and engineering stateful multi-step agent workflows with LangGraph.
          </p>
          <div className="about-highlight-box">
            <strong>Evolution at IBM:</strong> Started as a Software Development Engineer Intern building AI-powered
            quality analysis widgets on the front end with React and Carbon, then transitioned to full-time engineering
            building the core AI backend infrastructure.
          </div>
        </Reveal>

        <Reveal className="spec-sheet">
          <div className="spec-head">
            <span>Engineering Spec Sheet</span>
            <span className="spec-rev-pill">REV 2025.2</span>
          </div>
          <dl>
            {specs.map(({ label, value, accent }) => (
              <div className="spec-row" key={label}>
                <dt>{label}</dt>
                <dd className={accent ? 'accent-val' : ''}>{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="exp" id="experience">
      <SectionHead idx="§ 02 — Revision History" title="Experience">
        Two revisions of my engineering tenure at IBM India Software Labs — from internship to full-time development.
      </SectionHead>
      <ol className="rev-log">
        {EXPERIENCE.map((e) => (
          <Reveal as="li" className="rev-entry" key={e.rev}>
            <div className="rev-meta">
              <div className="rev-tag-wrapper">
                <span className="rev-tag">{e.rev}</span>
              </div>
              <span className="rev-date">{e.date}</span>
            </div>
            <div className="rev-body">
              <div className="rev-header-row">
                <div>
                  <h3>{e.title}</h3>
                  <div className="rev-org">
                    <Server size={14} aria-hidden="true" />
                    <span>{e.org}</span>
                  </div>
                </div>
                <div className="rev-status-pill">
                  <span className="rev-status-dot" aria-hidden="true" />
                  <span>{e.status}</span>
                </div>
              </div>

              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>
                    <CheckCircle2 className="rev-bullet-icon" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

// ─── CAPABILITIES VISUAL MODULES ───────────────────────────────────────────
const CAP_ICONS = {
  infra: <Bot size={20} strokeWidth={1.5} aria-hidden="true" />,
  api: <Cpu size={20} strokeWidth={1.5} aria-hidden="true" />,
  agents: <Workflow size={20} strokeWidth={1.5} aria-hidden="true" />,
  mcp: <Plug size={20} strokeWidth={1.5} aria-hidden="true" />,
  aitools: <Sparkles size={20} strokeWidth={1.5} aria-hidden="true" />,
  ui: <LayoutTemplate size={20} strokeWidth={1.5} aria-hidden="true" />,
}

function CapDiagram({ capKey }) {
  switch (capKey) {

    /* ── 1. AI AGENT INFRASTRUCTURE ─────────────────────────────────────────
       Central processing core with radial connections and satellite nodes.
       Thin strokes, localized glow, no text. ──────────────────────────────── */
    case 'infra':
      return (
        <svg viewBox="0 0 340 100" className="bento-svg-diagram" aria-hidden="true">
          <defs>
            <radialGradient id="i-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#55e1d0" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#55e1d0" stopOpacity="0" />
            </radialGradient>
            <filter id="i-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.8" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* Ambient field */}
          <ellipse cx="170" cy="50" rx="52" ry="52" fill="url(#i-aura)" />

          {/* Outer precision ring */}
          <circle cx="170" cy="50" r="44" fill="none"
            stroke="rgba(85,225,208,0.18)" strokeWidth="0.75" strokeDasharray="3 5" />

          {/* Inner structural ring */}
          <circle cx="170" cy="50" r="28" fill="none"
            stroke="rgba(56,189,248,0.28)" strokeWidth="0.75" />

          {/* Radial spokes to core */}
          <line x1="170" y1="22" x2="170" y2="34" stroke="rgba(85,225,208,0.5)" strokeWidth="0.75" />
          <line x1="170" y1="66" x2="170" y2="78" stroke="rgba(85,225,208,0.5)" strokeWidth="0.75" />
          <line x1="142" y1="50" x2="130" y2="50" stroke="rgba(85,225,208,0.5)" strokeWidth="0.75" />
          <line x1="198" y1="50" x2="210" y2="50" stroke="rgba(85,225,208,0.5)" strokeWidth="0.75" />
          {/* Diagonal spokes */}
          <line x1="150" y1="30" x2="142" y2="22" stroke="rgba(56,189,248,0.35)" strokeWidth="0.75" />
          <line x1="190" y1="30" x2="198" y2="22" stroke="rgba(56,189,248,0.35)" strokeWidth="0.75" />
          <line x1="150" y1="70" x2="142" y2="78" stroke="rgba(56,189,248,0.35)" strokeWidth="0.75" />
          <line x1="190" y1="70" x2="198" y2="78" stroke="rgba(56,189,248,0.35)" strokeWidth="0.75" />

          {/* Bus lines to satellite nodes */}
          <line x1="126" y1="50" x2="84"  y2="50" stroke="rgba(85,225,208,0.3)" strokeWidth="0.75" />
          <line x1="214" y1="50" x2="256" y2="50" stroke="rgba(85,225,208,0.3)" strokeWidth="0.75" />
          <line x1="170" y1="6"  x2="170" y2="14" stroke="rgba(56,189,248,0.25)" strokeWidth="0.75" />
          <line x1="170" y1="86" x2="170" y2="94" stroke="rgba(56,189,248,0.25)" strokeWidth="0.75" />

          {/* Far-end bus connectors */}
          <line x1="64"  y1="42" x2="84"  y2="42" stroke="rgba(85,225,208,0.2)" strokeWidth="0.75" />
          <line x1="64"  y1="58" x2="84"  y2="58" stroke="rgba(85,225,208,0.2)" strokeWidth="0.75" />
          <line x1="64"  y1="42" x2="64"  y2="58" stroke="rgba(85,225,208,0.2)" strokeWidth="0.75" />
          <line x1="256" y1="42" x2="276" y2="42" stroke="rgba(85,225,208,0.2)" strokeWidth="0.75" />
          <line x1="256" y1="58" x2="276" y2="58" stroke="rgba(85,225,208,0.2)" strokeWidth="0.75" />
          <line x1="276" y1="42" x2="276" y2="58" stroke="rgba(85,225,208,0.2)" strokeWidth="0.75" />

          {/* Satellite nodes */}
          <circle cx="84"  cy="50" r="3.5" fill="#071827" stroke="rgba(85,225,208,0.55)" strokeWidth="0.8" />
          <circle cx="256" cy="50" r="3.5" fill="#071827" stroke="rgba(56,189,248,0.55)" strokeWidth="0.8" />
          <circle cx="170" cy="6"  r="2.5" fill="#071827" stroke="rgba(85,225,208,0.45)" strokeWidth="0.8" />
          <circle cx="170" cy="94" r="2.5" fill="#071827" stroke="rgba(56,189,248,0.45)" strokeWidth="0.8" />
          {/* Corner nodes */}
          <circle cx="142" cy="22" r="2" fill="rgba(56,189,248,0.4)" />
          <circle cx="198" cy="22" r="2" fill="rgba(56,189,248,0.4)" />
          <circle cx="142" cy="78" r="2" fill="rgba(85,225,208,0.35)" />
          <circle cx="198" cy="78" r="2" fill="rgba(85,225,208,0.35)" />

          {/* Core */}
          <g filter="url(#i-glow)">
            <circle cx="170" cy="50" r="10" fill="#071827"
              stroke="#55e1d0" strokeWidth="1" />
            <circle cx="170" cy="50" r="4"  fill="#55e1d0" opacity="0.9" />
          </g>
        </svg>
      )

    /* ── 2. BACKEND ENGINEERING ───────────────────────────────────────────────
       Three receding isometric infrastructure slabs with teal edge lighting
       and vertical pillars — precise architectural systems illustration. ───── */
    case 'api':
      return (
        <svg viewBox="0 0 340 100" className="bento-svg-diagram" aria-hidden="true">
          <defs>
            <linearGradient id="a-sA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#162e46" />
              <stop offset="100%" stopColor="#071626" />
            </linearGradient>
            <linearGradient id="a-sB" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f2236" />
              <stop offset="100%" stopColor="#050e1a" />
            </linearGradient>
            <linearGradient id="a-sC" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#091a2c" />
              <stop offset="100%" stopColor="#030810" />
            </linearGradient>
            <filter id="a-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* Slab C — foundation */}
          <polygon points="170,74 295,45 170,18 45,45"
            fill="url(#a-sC)" stroke="rgba(85,225,208,0.14)" strokeWidth="0.75" />
          <polygon points="45,45 170,74 170,82 45,53"   fill="#030c16" />
          <polygon points="170,74 295,45 295,53 170,82" fill="#020709" />

          {/* Pillar verticals C→B */}
          <line x1="95"  y1="48" x2="95"  y2="40" stroke="rgba(56,189,248,0.35)" strokeWidth="0.75" />
          <line x1="170" y1="68" x2="170" y2="60" stroke="rgba(85,225,208,0.45)" strokeWidth="0.75" />
          <line x1="245" y1="48" x2="245" y2="40" stroke="rgba(56,189,248,0.35)" strokeWidth="0.75" />

          {/* Slab B — mid */}
          <polygon points="170,60 286,34 170,10 54,34"
            fill="url(#a-sB)" stroke="rgba(85,225,208,0.22)" strokeWidth="0.75" />
          <polygon points="54,34 170,60 170,68 54,42"   fill="#061524" />
          <polygon points="170,60 286,34 286,42 170,68" fill="#030c16" />

          {/* Pillar verticals B→A */}
          <line x1="110" y1="38" x2="110" y2="30" stroke="rgba(85,225,208,0.4)" strokeWidth="0.75" />
          <line x1="170" y1="54" x2="170" y2="46" stroke="rgba(85,225,208,0.55)" strokeWidth="0.75" />
          <line x1="230" y1="38" x2="230" y2="30" stroke="rgba(85,225,208,0.4)" strokeWidth="0.75" />

          {/* Slab A — top processing plane */}
          <polygon points="170,46 278,24 170,4 62,24"
            fill="url(#a-sA)" stroke="rgba(85,225,208,0.38)" strokeWidth="0.75" />
          <polygon points="62,24  170,46 170,54 62,32"  fill="#081c2e" />
          <polygon points="170,46 278,24 278,32 170,54" fill="#040e1c" />

          {/* Top rim highlight */}
          <line x1="170" y1="4" x2="62"  y2="24" stroke="#55e1d0" strokeWidth="1.1" opacity="0.75" />
          <line x1="170" y1="4" x2="278" y2="24" stroke="#38bdf8" strokeWidth="0.9" opacity="0.8"  />

          {/* Apex node */}
          <g filter="url(#a-glow)">
            <circle cx="170" cy="4" r="2.5" fill="#55e1d0" opacity="0.9" />
          </g>

          {/* Flanking accent nodes */}
          <circle cx="62"  cy="24" r="1.8" fill="none" stroke="rgba(85,225,208,0.5)" strokeWidth="0.7" />
          <circle cx="278" cy="24" r="1.8" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="0.7" />
          <circle cx="45"  cy="45" r="1.8" fill="none" stroke="rgba(85,225,208,0.35)" strokeWidth="0.7" />
          <circle cx="295" cy="45" r="1.8" fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="0.7" />
        </svg>
      )

    /* ── 3. AGENTIC WORKFLOWS ─────────────────────────────────────────────────
       A branching DAG: entry node → central processor → two output branches
       that reconverge. Clean vector paths with subtle directional arrows. ──── */
    case 'agents':
      return (
        <svg viewBox="0 0 240 100" className="bento-svg-diagram" aria-hidden="true">
          <defs>
            <filter id="ag-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* Entry → processor */}
          <line x1="28" y1="50" x2="68" y2="50" stroke="rgba(85,225,208,0.55)" strokeWidth="0.9" />
          <polygon points="68,50 62,47 62,53" fill="rgba(85,225,208,0.7)" />

          {/* Processor box */}
          <rect x="68" y="36" width="36" height="28" rx="3"
            fill="#071827" stroke="rgba(85,225,208,0.45)" strokeWidth="0.85" />
          {/* Inner detail lines */}
          <line x1="76" y1="46" x2="96" y2="46" stroke="rgba(85,225,208,0.4)" strokeWidth="0.75" />
          <line x1="76" y1="54" x2="90" y2="54" stroke="rgba(56,189,248,0.3)" strokeWidth="0.75" />

          {/* Branch split from processor */}
          <line x1="104" y1="50" x2="116" y2="50" stroke="rgba(85,225,208,0.4)" strokeWidth="0.75" />
          <line x1="116" y1="50" x2="116" y2="28" stroke="rgba(85,225,208,0.4)" strokeWidth="0.75" />
          <line x1="116" y1="50" x2="116" y2="72" stroke="rgba(56,189,248,0.4)" strokeWidth="0.75" />

          {/* Upper branch */}
          <line x1="116" y1="28" x2="148" y2="28" stroke="rgba(85,225,208,0.45)" strokeWidth="0.85" />
          <polygon points="148,28 142,25 142,31" fill="rgba(85,225,208,0.65)" />
          <rect x="148" y="20" width="30" height="16" rx="2.5"
            fill="#071827" stroke="rgba(85,225,208,0.4)" strokeWidth="0.8" />
          <line x1="154" y1="27" x2="172" y2="27" stroke="rgba(85,225,208,0.35)" strokeWidth="0.75" />

          {/* Lower branch */}
          <line x1="116" y1="72" x2="148" y2="72" stroke="rgba(56,189,248,0.45)" strokeWidth="0.85" />
          <polygon points="148,72 142,69 142,75" fill="rgba(56,189,248,0.65)" />
          <rect x="148" y="64" width="30" height="16" rx="2.5"
            fill="#071827" stroke="rgba(56,189,248,0.38)" strokeWidth="0.8" />
          <line x1="154" y1="71" x2="172" y2="71" stroke="rgba(56,189,248,0.3)" strokeWidth="0.75" />

          {/* Reconverge */}
          <line x1="178" y1="28" x2="196" y2="28" stroke="rgba(85,225,208,0.35)" strokeWidth="0.75" />
          <line x1="178" y1="72" x2="196" y2="72" stroke="rgba(56,189,248,0.35)" strokeWidth="0.75" />
          <line x1="196" y1="28" x2="196" y2="72" stroke="rgba(85,225,208,0.3)" strokeWidth="0.75" />
          <line x1="196" y1="50" x2="212" y2="50" stroke="rgba(85,225,208,0.45)" strokeWidth="0.85" />
          <polygon points="212,50 206,47 206,53" fill="rgba(85,225,208,0.65)" />

          {/* Terminal node */}
          <g filter="url(#ag-glow)">
            <circle cx="212" cy="50" r="5" fill="#071827"
              stroke="#55e1d0" strokeWidth="0.9" />
            <circle cx="212" cy="50" r="2" fill="#55e1d0" opacity="0.9" />
          </g>

          {/* Entry node */}
          <circle cx="28" cy="50" r="5" fill="#071827"
            stroke="rgba(85,225,208,0.5)" strokeWidth="0.85" />
          <circle cx="28" cy="50" r="2" fill="rgba(85,225,208,0.7)" />

          {/* Junction dot */}
          <circle cx="116" cy="50" r="2.5" fill="rgba(85,225,208,0.55)" />
        </svg>
      )

    /* ── 4. MODEL CONTEXT PROTOCOL ────────────────────────────────────────────
       Two system endpoints (client/server), a precise protocol bridge with
       directional arrows, and a central relay node. ──────────────────────── */
    case 'mcp':
      return (
        <svg viewBox="0 0 240 100" className="bento-svg-diagram" aria-hidden="true">
          <defs>
            <filter id="m-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* Left endpoint block */}
          <rect x="12" y="22" width="46" height="56" rx="3"
            fill="#071827" stroke="rgba(85,225,208,0.38)" strokeWidth="0.85" />
          {/* Internal structure lines */}
          <line x1="20" y1="38" x2="50" y2="38" stroke="rgba(85,225,208,0.45)" strokeWidth="0.9" />
          <line x1="20" y1="50" x2="48" y2="50" stroke="rgba(85,225,208,0.28)" strokeWidth="0.75" />
          <line x1="20" y1="62" x2="44" y2="62" stroke="rgba(56,189,248,0.22)" strokeWidth="0.75" />
          {/* Top highlight */}
          <line x1="12" y1="22" x2="58" y2="22" stroke="rgba(85,225,208,0.5)" strokeWidth="0.75" />

          {/* Right endpoint block */}
          <rect x="182" y="22" width="46" height="56" rx="3"
            fill="#071827" stroke="rgba(56,189,248,0.35)" strokeWidth="0.85" />
          <line x1="190" y1="38" x2="220" y2="38" stroke="rgba(56,189,248,0.45)" strokeWidth="0.9" />
          <line x1="190" y1="50" x2="218" y2="50" stroke="rgba(56,189,248,0.28)" strokeWidth="0.75" />
          <line x1="190" y1="62" x2="214" y2="62" stroke="rgba(85,225,208,0.22)" strokeWidth="0.75" />
          <line x1="182" y1="22" x2="228" y2="22" stroke="rgba(56,189,248,0.5)" strokeWidth="0.75" />

          {/* Protocol bridge — upper arrow (outbound) */}
          <line x1="58" y1="42" x2="112" y2="42" stroke="rgba(85,225,208,0.55)" strokeWidth="0.85" />
          <polygon points="112,42 106,39 106,45" fill="rgba(85,225,208,0.75)" />

          {/* Protocol bridge — lower arrow (inbound) */}
          <line x1="128" y1="58" x2="182" y2="58" stroke="rgba(56,189,248,0.55)" strokeWidth="0.85" />
          <polygon points="182,58 176,55 176,61" fill="rgba(56,189,248,0.75)" />

          {/* Central relay node */}
          <g filter="url(#m-glow)">
            <circle cx="120" cy="50" r="10" fill="#071827"
              stroke="#55e1d0" strokeWidth="1" />
            <circle cx="120" cy="50" r="4"  fill="#55e1d0" opacity="0.85" />
          </g>
          {/* Relay ring */}
          <circle cx="120" cy="50" r="16" fill="none"
            stroke="rgba(85,225,208,0.2)" strokeWidth="0.65" strokeDasharray="2 4" />

          {/* Connection stubs to relay */}
          <line x1="112" y1="42" x2="112" y2="42" />
          <line x1="110" y1="50" x2="104" y2="50" stroke="rgba(85,225,208,0.3)" strokeWidth="0.65" />
          <line x1="128" y1="58" x2="136" y2="58" />
        </svg>
      )

    /* ── 5. AI-POWERED ENGINEERING TOOLS ─────────────────────────────────────
       A precision analytical signal — smooth waveform on a baseline grid,
       with highlighted inflection nodes. No text, no scores. ──────────────── */
    case 'aitools':
      return (
        <svg viewBox="0 0 240 100" className="bento-svg-diagram" aria-hidden="true">
          <defs>
            <linearGradient id="w-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#55e1d0" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#55e1d0" stopOpacity="0" />
            </linearGradient>
            <filter id="w-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* Horizontal grid lines */}
          <line x1="20" y1="30" x2="220" y2="30" stroke="rgba(85,225,208,0.1)" strokeWidth="0.6" />
          <line x1="20" y1="50" x2="220" y2="50" stroke="rgba(85,225,208,0.14)" strokeWidth="0.6" />
          <line x1="20" y1="70" x2="220" y2="70" stroke="rgba(85,225,208,0.1)" strokeWidth="0.6" />

          {/* Vertical grid markers */}
          <line x1="70"  y1="26" x2="70"  y2="74" stroke="rgba(85,225,208,0.08)" strokeWidth="0.6" />
          <line x1="120" y1="26" x2="120" y2="74" stroke="rgba(85,225,208,0.08)" strokeWidth="0.6" />
          <line x1="170" y1="26" x2="170" y2="74" stroke="rgba(85,225,208,0.08)" strokeWidth="0.6" />

          {/* Waveform fill area */}
          <path
            d="M20,50 C35,50 45,28 60,28 S80,50 95,50 S110,72 125,72 S145,50 160,50 S175,28 190,28 S210,50 220,50 L220,74 L20,74 Z"
            fill="url(#w-fill)" />

          {/* Primary waveform stroke */}
          <path
            d="M20,50 C35,50 45,28 60,28 S80,50 95,50 S110,72 125,72 S145,50 160,50 S175,28 190,28 S210,50 220,50"
            fill="none" stroke="#55e1d0" strokeWidth="1.2" strokeLinecap="round" />

          {/* Secondary trace — offset, dimmer */}
          <path
            d="M20,55 C35,55 45,36 60,36 S80,55 95,55 S110,74 125,74 S145,55 160,55 S175,36 190,36 S210,55 220,55"
            fill="none" stroke="rgba(56,189,248,0.28)" strokeWidth="0.7"
            strokeLinecap="round" strokeDasharray="3 4" />

          {/* Inflection highlight nodes */}
          <g filter="url(#w-glow)">
            <circle cx="60"  cy="28" r="3.5" fill="#55e1d0" opacity="0.9" />
            <circle cx="125" cy="72" r="3.5" fill="#38bdf8" opacity="0.85" />
            <circle cx="190" cy="28" r="3.5" fill="#55e1d0" opacity="0.9" />
          </g>

          {/* Small tick marks on baseline */}
          <line x1="60"  y1="72" x2="60"  y2="76" stroke="rgba(85,225,208,0.3)" strokeWidth="0.75" />
          <line x1="125" y1="72" x2="125" y2="76" stroke="rgba(85,225,208,0.3)" strokeWidth="0.75" />
          <line x1="190" y1="72" x2="190" y2="76" stroke="rgba(85,225,208,0.3)" strokeWidth="0.75" />

          {/* Baseline */}
          <line x1="16" y1="74" x2="224" y2="74"
            stroke="rgba(85,225,208,0.25)" strokeWidth="0.75" />
          {/* End caps */}
          <line x1="16" y1="70" x2="16" y2="78" stroke="rgba(85,225,208,0.25)" strokeWidth="0.75" />
          <line x1="224" y1="70" x2="224" y2="78" stroke="rgba(85,225,208,0.25)" strokeWidth="0.75" />
        </svg>
      )

    /* ── 6. FRONTEND ENGINEERING ──────────────────────────────────────────────
       A precise interface schematic: a header bar, two content columns, and
       a status strip — design-system wireframe, no real app content. ──────── */
    case 'ui':
      return (
        <svg viewBox="0 0 340 100" className="bento-svg-diagram" aria-hidden="true">
          <defs>
            <filter id="u-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* Outer frame */}
          <rect x="14" y="8" width="312" height="84" rx="4"
            fill="#071827" stroke="rgba(85,225,208,0.3)" strokeWidth="0.85" />

          {/* Header bar */}
          <rect x="14" y="8" width="312" height="18" rx="4"
            fill="rgba(85,225,208,0.06)" />
          <line x1="14" y1="26" x2="326" y2="26"
            stroke="rgba(85,225,208,0.28)" strokeWidth="0.75" />
          {/* Window chrome dots */}
          <circle cx="26" cy="17" r="2.5" fill="rgba(85,225,208,0.5)" />
          <circle cx="35" cy="17" r="2.5" fill="rgba(56,189,248,0.4)" />
          <circle cx="44" cy="17" r="2.5" fill="rgba(85,225,208,0.25)" />
          {/* Header right element */}
          <rect x="270" y="11" width="52" height="10" rx="2"
            fill="rgba(85,225,208,0.08)" stroke="rgba(85,225,208,0.25)" strokeWidth="0.65" />

          {/* Left panel */}
          <rect x="22" y="33" width="138" height="52" rx="2"
            fill="rgba(85,225,208,0.04)" stroke="rgba(85,225,208,0.2)" strokeWidth="0.7" />
          {/* Left panel content lines */}
          <line x1="30" y1="45" x2="118" y2="45" stroke="rgba(85,225,208,0.35)" strokeWidth="0.85" />
          <line x1="30" y1="55" x2="140" y2="55" stroke="rgba(85,225,208,0.18)" strokeWidth="0.7" />
          <line x1="30" y1="64" x2="126" y2="64" stroke="rgba(85,225,208,0.14)" strokeWidth="0.7" />
          <line x1="30" y1="73" x2="110" y2="73" stroke="rgba(56,189,248,0.18)" strokeWidth="0.7" />
          {/* Left panel accent chip */}
          <rect x="30" y="78" width="36" height="5" rx="2"
            fill="rgba(85,225,208,0.12)" stroke="rgba(85,225,208,0.3)" strokeWidth="0.6" />

          {/* Right panel */}
          <rect x="170" y="33" width="148" height="52" rx="2"
            fill="rgba(56,189,248,0.03)" stroke="rgba(56,189,248,0.2)" strokeWidth="0.7" />
          {/* Right panel top highlight */}
          <line x1="170" y1="33" x2="318" y2="33" stroke="rgba(56,189,248,0.3)" strokeWidth="0.65" />
          {/* Right panel content */}
          <rect x="178" y="41" width="132" height="14" rx="2"
            fill="rgba(56,189,248,0.06)" stroke="rgba(56,189,248,0.2)" strokeWidth="0.65" />
          <line x1="178" y1="64" x2="310" y2="64" stroke="rgba(56,189,248,0.16)" strokeWidth="0.7" />
          <line x1="178" y1="72" x2="296" y2="72" stroke="rgba(85,225,208,0.14)" strokeWidth="0.7" />
          <line x1="178" y1="80" x2="280" y2="80" stroke="rgba(85,225,208,0.1)" strokeWidth="0.7" />

          {/* Divider between panels */}
          <line x1="160" y1="33" x2="160" y2="85"
            stroke="rgba(85,225,208,0.15)" strokeWidth="0.65" strokeDasharray="2 3" />

          {/* Active state accent — left panel heading */}
          <g filter="url(#u-glow)">
            <line x1="30" y1="45" x2="70" y2="45"
              stroke="#55e1d0" strokeWidth="1" />
          </g>
        </svg>
      )

    default:
      return null
  }
}

function Capabilities() {
  const spanMapping = {
    infra: 'bento-span-3',
    api: 'bento-span-3',
    agents: 'bento-span-2',
    mcp: 'bento-span-2',
    aitools: 'bento-span-2',
    ui: 'bento-span-6',
  }

  return (
    <section className="capabilities" id="capabilities">
      <SectionHead idx="§ 03 — Capabilities" title="Engineering Capabilities">
        Core technical domains drawn from my day-to-day architecture work at IBM India Software Labs.
      </SectionHead>

      <div className="bento-grid">
        {CAPABILITIES.map((c, idx) => (
          <Reveal
            as="article"
            className={`bento-card ${spanMapping[c.key] || 'bento-span-3'}`}
            key={c.key}
          >
            <div className="bento-card-top">
              <span className="bento-icon-wrapper">{CAP_ICONS[c.key]}</span>
              <span className="bento-index-tag">MOD.0{idx + 1}</span>
            </div>

            <div className="bento-visual-frame">
              <CapDiagram capKey={c.key} />
            </div>

            <div className="bento-body">
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <div className="stack-tags">
                {c.tags.map((t) => (
                  <span className="stack-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ─── PROJECTS SECTION (MAPLE & CAFESYNC) ───────────────────────────────────
function ProjectMockup({ projectId }) {
  if (projectId === 'P-01') {
    // Maple: Inventory & Ledger Operational Activity Preview
    return (
      <div className="proj-preview-frame">
        <div className="proj-preview-topbar">
          <div className="proj-window-dots">
            <span className="proj-window-dot" />
            <span className="proj-window-dot" />
            <span className="proj-window-dot" />
          </div>
          <span>MAPLE // INVENTORY_LEDGER.V1</span>
          <span>STATUS: SYNCED</span>
        </div>
        <svg viewBox="0 0 380 110" className="bento-svg-diagram" aria-hidden="true">
          {/* Table Header */}
          <rect x="0" y="0" width="380" height="22" rx="2" fill="#081827" />
          <text x="12" y="15" fill="#64829f" fontSize="8.5" fontFamily="monospace">TX_ID</text>
          <text x="90" y="15" fill="#64829f" fontSize="8.5" fontFamily="monospace">ITEM / SKU</text>
          <text x="210" y="15" fill="#64829f" fontSize="8.5" fontFamily="monospace">QUANTITY</text>
          <text x="300" y="15" fill="#64829f" fontSize="8.5" fontFamily="monospace">LEDGER STATE</text>

          {/* Row 1 */}
          <text x="12" y="40" fill="#55e1d0" fontSize="8.5" fontFamily="monospace">#TX-9401</text>
          <text x="90" y="40" fill="#f3f7fc" fontSize="8.5" fontFamily="monospace">Component_A-10</text>
          <text x="210" y="40" fill="#55e1d0" fontSize="8.5" fontFamily="monospace">+120 units</text>
          <text x="300" y="40" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">RECONCILED</text>
          <path d="M0,48 H380" stroke="#162c42" strokeWidth="1" />

          {/* Row 2 */}
          <text x="12" y="68" fill="#55e1d0" fontSize="8.5" fontFamily="monospace">#TX-9402</text>
          <text x="90" y="68" fill="#f3f7fc" fontSize="8.5" fontFamily="monospace">Module_Node-X</text>
          <text x="210" y="68" fill="#e5a93c" fontSize="8.5" fontFamily="monospace">-35 units</text>
          <text x="300" y="68" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">RECONCILED</text>
          <path d="M0,76 H380" stroke="#162c42" strokeWidth="1" />

          {/* Row 3 */}
          <text x="12" y="96" fill="#55e1d0" fontSize="8.5" fontFamily="monospace">#TX-9403</text>
          <text x="90" y="96" fill="#f3f7fc" fontSize="8.5" fontFamily="monospace">Transceiver_04</text>
          <text x="210" y="96" fill="#55e1d0" fontSize="8.5" fontFamily="monospace">+500 units</text>
          <text x="300" y="96" fill="#55e1d0" fontSize="8.5" fontFamily="monospace">BATCH_POSTED</text>
        </svg>
      </div>
    )
  }

  // CafeSync: Cafeteria Seat Allocation & Capacity HUD Preview
  return (
    <div className="proj-preview-frame">
      <div className="proj-preview-topbar">
        <div className="proj-window-dots">
          <span className="proj-window-dot" />
          <span className="proj-window-dot" />
          <span className="proj-window-dot" />
        </div>
        <span>CAFESYNC // SEAT_ALLOCATION.V2</span>
        <span>CAPACITY: 78%</span>
      </div>
      <svg viewBox="0 0 380 110" className="bento-svg-diagram" aria-hidden="true">
        {/* Zone Map Grid */}
        <rect x="0" y="5" width="170" height="95" rx="3" fill="#081827" stroke="#162c42" strokeWidth="1" />
        <text x="12" y="22" fill="#91a8be" fontSize="8" fontFamily="monospace">ZONE A · SEAT MATRIX</text>
        
        {/* Seat grid cells */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4].map((c) => {
            const isBooked = (r * 5 + c) % 3 === 0
            return (
              <rect
                key={`${r}-${c}`}
                x={12 + c * 30}
                y={30 + r * 16}
                width="22"
                height="10"
                rx="2"
                fill={isBooked ? '#e5a93c' : '#55e1d0'}
                opacity={isBooked ? 0.8 : 0.4}
              />
            )
          })
        )}

        {/* Right Info Panel */}
        <rect x="185" y="5" width="195" height="95" rx="3" fill="#081827" stroke="#162c42" strokeWidth="1" />
        <text x="197" y="24" fill="#55e1d0" fontSize="8.5" fontFamily="monospace">CAPACITY TELEMETRY</text>
        <text x="197" y="42" fill="#f3f7fc" fontSize="8" fontFamily="monospace">Active Bookings: 42 / 54</text>
        
        <rect x="197" y="48" width="170" height="8" rx="2" fill="#07192b" />
        <rect x="197" y="48" width="132" height="8" rx="2" fill="#55e1d0" />

        <text x="197" y="74" fill="#91a8be" fontSize="8" fontFamily="monospace">Admin Override: ACTIVE</text>
        <text x="197" y="88" fill="#e5a93c" fontSize="7.5" fontFamily="monospace">PEAK SHIFT ALLOCATION</text>
      </svg>
    </div>
  )
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <SectionHead idx="§ 04 — Personal Projects" title="Projects">
        System architecture and application experiments built outside of work.
      </SectionHead>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <Reveal as="article" className="proj-card" key={p.id}>
            <div className="proj-card-header">
              <span className="proj-id">{p.id}</span>
              <span className="proj-type">Application Architecture</span>
            </div>

            <ProjectMockup projectId={p.id} />

            <h3>{p.title}</h3>
            <p>{p.summary}</p>

            {p.tags.length > 0 && (
              <div className="stack-tags">
                {p.tags.map((t) => (
                  <span className="stack-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {(p.repo || p.live) && (
              <div className="proj-links">
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">
                    Source Code <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer">
                    Live Demo <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const links = [
    CONTACT.linkedin && { href: CONTACT.linkedin, label: 'LinkedIn', ext: true },
    CONTACT.github && { href: CONTACT.github, label: 'GitHub', ext: true },
    CONTACT.email && { href: `mailto:${CONTACT.email}`, label: 'Email' },
  ].filter(Boolean)

  return (
    <section className="contact" id="contact">
      <Reveal className="contact-wrapper">
        <span className="idx">§ 05 — Contact</span>
        <h2>Let’s build something together.</h2>
        <p>
          Interested in AI agent infrastructure, tool orchestration, or backend architecture?
          Connect with me or explore my repositories.
        </p>

        {links.length > 0 && (
          <div className="contact-links">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                className={`btn ${i === 0 ? 'solid' : 'btn-secondary'}`}
                {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {l.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  )
}

export default function Portfolio() {
  return (
    <div className="bp-root">
      <a href="#top" className="skip-link">
        Skip to main content
      </a>
      <div className="grid-bg" aria-hidden="true" />
      <div className="grid-vignette" aria-hidden="true" />

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Capabilities />
        <Projects />
        <Contact />
      </main>

      <footer>
        <div className="footer-brand">
          <span className="logo-dot" aria-hidden="true" />
          <span>Vatsal Rathod — Software Development Engineer</span>
        </div>
        <div className="footer-meta">
          <span>IBM India Software Labs</span>
          <span>© {YEAR}</span>
        </div>
      </footer>
    </div>
  )
}
