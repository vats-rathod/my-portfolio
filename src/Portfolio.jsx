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
function HeroSystemVisual() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e) => {
      if (!ref.current || window.innerWidth < 980) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) / 30
      const y = (e.clientY - (rect.top + rect.height / 2)) / 30
      ref.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`
    }
    const onLeave = () => {
      if (ref.current) {
        ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
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
      <div className="hero-system-console" ref={ref}>
        <div className="console-header">
          <div className="console-status">
            <span className="console-live-led" />
            <span>AGENT_ORCHESTRATION_CORE</span>
          </div>
          <span className="console-metric">SYS_OK // LATENCY: 18ms</span>
        </div>

        <div className="console-canvas">
          <svg viewBox="0 0 480 330" className="console-svg" role="img" focusable="false">
            <defs>
              <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#55e1d0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d243b" />
                <stop offset="100%" stopColor="#081827" />
              </linearGradient>
            </defs>

            {/* Connecting Bus Circuits */}
            <path d="M240,165 L100,65" className="circuit-line-active" />
            <path d="M240,165 L380,65" className="circuit-line-active" />
            <path d="M240,165 L100,265" className="circuit-line-active" />
            <path d="M240,165 L380,265" className="circuit-line-active" />

            <path d="M100,65 H170" className="circuit-line" />
            <path d="M380,65 H310" className="circuit-line" />
            <path d="M100,265 H170" className="circuit-line" />
            <path d="M380,265 H310" className="circuit-line" />

            {/* Traveling Data Packet Pulses */}
            <circle cx="170" cy="115" r="3.5" className="packet-pulse" />
            <circle cx="310" cy="115" r="3.5" className="packet-pulse" />
            <circle cx="170" cy="215" r="3.5" className="packet-pulse" />
            <circle cx="310" cy="215" r="3.5" className="packet-pulse" />

            {/* Top-Left Node: IBM ELM ECOSYSTEM */}
            <g className="sys-node">
              <rect x="20" y="35" width="160" height="60" rx="4" className="sys-node-bg" />
              <text x="34" y="58" className="sys-node-title">IBM ELM PLATFORM</text>
              <text x="34" y="74" className="sys-node-desc">Requirements &amp; Lifecycle</text>
              <text x="34" y="86" className="sys-node-tag">OSLC · REST · SCHEMAS</text>
            </g>

            {/* Top-Right Node: MCP TOOL PROTOCOL */}
            <g className="sys-node">
              <rect x="300" y="35" width="160" height="60" rx="4" className="sys-node-bg" />
              <text x="314" y="58" className="sys-node-title">MCP TOOL SERVERS</text>
              <text x="314" y="74" className="sys-node-desc">Protocol Tool Access</text>
              <text x="314" y="86" className="sys-node-tag">JSON-RPC · stdio · SSE</text>
            </g>

            {/* Bottom-Left Node: LANGGRAPH STATE ENGINE */}
            <g className="sys-node">
              <rect x="20" y="235" width="160" height="60" rx="4" className="sys-node-bg" />
              <text x="34" y="258" className="sys-node-title">LANGGRAPH ENGINE</text>
              <text x="34" y="274" className="sys-node-desc">Stateful Multi-step Agents</text>
              <text x="34" y="286" className="sys-node-tag">DAG · CHECKPOINTS · HIL</text>
            </g>

            {/* Bottom-Right Node: FASTAPI BACKEND SERVICES */}
            <g className="sys-node">
              <rect x="300" y="235" width="160" height="60" rx="4" className="sys-node-bg" />
              <text x="314" y="258" className="sys-node-title">FASTAPI BACKEND</text>
              <text x="314" y="274" className="sys-node-desc">Async Services &amp; DB</text>
              <text x="314" y="286" className="sys-node-tag">PYDANTIC · POSTGRESQL</text>
            </g>

            {/* Central Agent Orchestrator Core */}
            <circle cx="240" cy="165" r="54" className="core-ring-outer" />
            <circle cx="240" cy="165" r="44" className="core-ring-inner" />
            <circle cx="240" cy="165" r="38" fill="url(#nodeGrad)" stroke="rgba(85,225,208,0.4)" strokeWidth="1" />
            <text x="240" y="161" textAnchor="middle" className="core-title">AGENT CORE</text>
            <text x="240" y="176" textAnchor="middle" className="core-sub">ORCHESTRATOR</text>
          </svg>
        </div>

        <div className="console-telemetry-bar">
          <div className="telemetry-item">
            <span className="telemetry-label">Active Agents</span>
            <span className="telemetry-val">STATEFUL_DAG</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Tool Protocol</span>
            <span className="telemetry-val">MCP / v1.2</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Runtime Layer</span>
            <span className="telemetry-val">FASTAPI · ISL</span>
          </div>
        </div>
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

        <HeroSystemVisual />
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
    case 'infra':
      // Multi-tier AI Agent Infrastructure Diagram
      return (
        <svg viewBox="0 0 340 100" className="bento-svg-diagram" aria-hidden="true">
          <rect x="10" y="15" width="85" height="70" rx="4" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="52" y="38" textAnchor="middle" fill="#91a8be" fontSize="9" fontFamily="monospace">FASTAPI</text>
          <text x="52" y="52" textAnchor="middle" fill="#55e1d0" fontSize="10" fontWeight="600" fontFamily="monospace">SERVICE</text>
          <text x="52" y="68" textAnchor="middle" fill="#415e78" fontSize="8" fontFamily="monospace">ASYNC ROUTER</text>

          <path d="M95,50 H125" stroke="#55e1d0" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="110" cy="50" r="2.5" fill="#55e1d0" />

          <rect x="125" y="10" width="90" height="80" rx="4" fill="#0b233a" stroke="#55e1d0" strokeWidth="1.2" />
          <text x="170" y="34" textAnchor="middle" fill="#55e1d0" fontSize="9" fontWeight="600" fontFamily="monospace">AGENT CORE</text>
          <text x="170" y="48" textAnchor="middle" fill="#f3f7fc" fontSize="8.5" fontFamily="monospace">LANGGRAPH</text>
          <text x="170" y="62" textAnchor="middle" fill="#91a8be" fontSize="8" fontFamily="monospace">STATE ENGINE</text>
          <text x="170" y="76" textAnchor="middle" fill="#e5a93c" fontSize="7.5" fontFamily="monospace">● ORCHESTRATING</text>

          <path d="M215,35 H245" stroke="#38bdf8" strokeWidth="1.2" />
          <path d="M215,65 H245" stroke="#38bdf8" strokeWidth="1.2" />

          <rect x="245" y="15" width="85" height="32" rx="3" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="287" y="32" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">MCP SERVERS</text>
          <text x="287" y="42" textAnchor="middle" fill="#64829f" fontSize="7" fontFamily="monospace">TOOL DISPATCH</text>

          <rect x="245" y="53" width="85" height="32" rx="3" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="287" y="70" textAnchor="middle" fill="#91a8be" fontSize="8.5" fontFamily="monospace">IBM ELM DB</text>
          <text x="287" y="80" textAnchor="middle" fill="#64829f" fontSize="7" fontFamily="monospace">SCHEMA SYNC</text>
        </svg>
      )

    case 'api':
      // Backend API & Schema Contract Diagram
      return (
        <svg viewBox="0 0 340 100" className="bento-svg-diagram" aria-hidden="true">
          <rect x="10" y="12" width="145" height="76" rx="4" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="22" y="30" fill="#e5a93c" fontSize="8.5" fontFamily="monospace">POST /api/v1/analyze</text>
          <path d="M22,38 H145" stroke="#162c42" strokeWidth="1" />
          <text x="22" y="52" fill="#55e1d0" fontSize="8" fontFamily="monospace">req_id: UUID (PK)</text>
          <text x="22" y="65" fill="#91a8be" fontSize="8" fontFamily="monospace">payload: PydanticModel</text>
          <text x="22" y="78" fill="#415e78" fontSize="7.5" fontFamily="monospace">200 OK · 14ms latency</text>

          <path d="M155,50 H185" stroke="#55e1d0" strokeWidth="1.2" />
          <polygon points="185,50 179,46 179,54" fill="#55e1d0" />

          <rect x="185" y="12" width="145" height="76" rx="4" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="197" y="30" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">TABLE: elm_reqs_v2</text>
          <path d="M197,38 H320" stroke="#162c42" strokeWidth="1" />
          <text x="197" y="52" fill="#91a8be" fontSize="8" fontFamily="monospace">id: int · item_uri: text</text>
          <text x="197" y="65" fill="#91a8be" fontSize="8" fontFamily="monospace">quality_score: float</text>
          <text x="197" y="78" fill="#55e1d0" fontSize="7.5" fontFamily="monospace">INDEXED · POSTGRESQL</text>
        </svg>
      )

    case 'agents':
      // LangGraph Stateful Cyclic DAG
      return (
        <svg viewBox="0 0 240 100" className="bento-svg-diagram" aria-hidden="true">
          <circle cx="35" cy="50" r="16" fill="#081827" stroke="#55e1d0" strokeWidth="1" />
          <text x="35" y="53" textAnchor="middle" fill="#55e1d0" fontSize="7.5" fontFamily="monospace">START</text>

          <path d="M51,50 H75" stroke="#55e1d0" strokeWidth="1" />
          <polygon points="75,50 69,47 69,53" fill="#55e1d0" />

          <rect x="75" y="34" width="56" height="32" rx="3" fill="#0c253e" stroke="#38bdf8" strokeWidth="1" />
          <text x="103" y="49" textAnchor="middle" fill="#f3f7fc" fontSize="8" fontFamily="monospace">ANALYZE</text>
          <text x="103" y="59" textAnchor="middle" fill="#91a8be" fontSize="7" fontFamily="monospace">LangChain</text>

          <path d="M131,45 L155,30" stroke="#55e1d0" strokeWidth="1" />
          <path d="M131,55 L155,70" stroke="#55e1d0" strokeWidth="1" />

          <rect x="155" y="16" width="60" height="26" rx="3" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="185" y="32" textAnchor="middle" fill="#e5a93c" fontSize="7.5" fontFamily="monospace">TOOL_CALL</text>

          <rect x="155" y="58" width="60" height="26" rx="3" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="185" y="74" textAnchor="middle" fill="#55e1d0" fontSize="7.5" fontFamily="monospace">CRITIQUE</text>

          {/* Loopback curve */}
          <path d="M185,16 C185,2 103,2 103,34" fill="none" stroke="#55e1d0" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )

    case 'mcp':
      // Model Context Protocol JSON-RPC Packet Inspector
      return (
        <svg viewBox="0 0 240 100" className="bento-svg-diagram" aria-hidden="true">
          <rect x="10" y="10" width="220" height="80" rx="4" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="20" y="26" fill="#55e1d0" fontSize="8" fontFamily="monospace">MCP JSON-RPC FRAME</text>
          <text x="175" y="26" fill="#e5a93c" fontSize="7.5" fontFamily="monospace">v1.2 // OK</text>
          <path d="M10,32 H230" stroke="#162c42" strokeWidth="1" />
          <text x="20" y="48" fill="#91a8be" fontSize="8" fontFamily="monospace">{`{ "method": "tools/call",`}</text>
          <text x="20" y="62" fill="#38bdf8" fontSize="8" fontFamily="monospace">{`  "tool": "elm_query",`}</text>
          <text x="20" y="76" fill="#55e1d0" fontSize="8" fontFamily="monospace">{`  "params": { "scope": "qual" } }`}</text>
        </svg>
      )

    case 'aitools':
      // Requirements Quality Telemetry HUD
      return (
        <svg viewBox="0 0 240 100" className="bento-svg-diagram" aria-hidden="true">
          <rect x="10" y="10" width="105" height="80" rx="4" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="20" y="28" fill="#91a8be" fontSize="8" fontFamily="monospace">QUALITY SCORE</text>
          <text x="20" y="56" fill="#55e1d0" fontSize="20" fontWeight="700" fontFamily="monospace">94.8%</text>
          <text x="20" y="76" fill="#e5a93c" fontSize="7.5" fontFamily="monospace">STATUS: HIGH</text>

          <rect x="125" y="10" width="105" height="80" rx="4" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <text x="135" y="28" fill="#91a8be" fontSize="8" fontFamily="monospace">METRICS</text>
          <text x="135" y="46" fill="#f3f7fc" fontSize="7.5" fontFamily="monospace">Ambiguity: 0.04</text>
          <path d="M135,52 H215" stroke="#162c42" strokeWidth="3" rx="1.5" />
          <path d="M135,52 H145" stroke="#55e1d0" strokeWidth="3" />
          <text x="135" y="68" fill="#f3f7fc" fontSize="7.5" fontFamily="monospace">Completeness: 98%</text>
          <path d="M135,74 H215" stroke="#162c42" strokeWidth="3" rx="1.5" />
          <path d="M135,74 H210" stroke="#38bdf8" strokeWidth="3" />
        </svg>
      )

    case 'ui':
      // Carbon Design System Component Architecture Preview
      return (
        <svg viewBox="0 0 340 100" className="bento-svg-diagram" aria-hidden="true">
          <rect x="10" y="8" width="320" height="84" rx="4" fill="#081827" stroke="#1f4060" strokeWidth="1" />
          <path d="M10,26 H330" stroke="#162c42" strokeWidth="1" />
          <circle cx="22" cy="17" r="3" fill="#e5a93c" />
          <circle cx="32" cy="17" r="3" fill="#55e1d0" />
          <circle cx="42" cy="17" r="3" fill="#38bdf8" />
          <text x="60" y="20" fill="#91a8be" fontSize="8" fontFamily="monospace">Carbon Design System // Quality Widget</text>

          {/* Left panel: Requirements scoring card */}
          <rect x="20" y="34" width="135" height="48" rx="2" fill="#0c2338" stroke="#1f4060" strokeWidth="1" />
          <text x="28" y="48" fill="#55e1d0" fontSize="8" fontFamily="monospace">Score: 94% · Compliant</text>
          <path d="M28,56 H145" stroke="#162c42" strokeWidth="1" />
          <text x="28" y="68" fill="#91a8be" fontSize="7.5" fontFamily="monospace">AI Recommendations: 2</text>

          {/* Right panel: Conversational Chat UI */}
          <rect x="165" y="34" width="155" height="48" rx="2" fill="#0c2338" stroke="#1f4060" strokeWidth="1" />
          <text x="175" y="48" fill="#38bdf8" fontSize="8" fontFamily="monospace">Agent Chat Stream</text>
          <rect x="175" y="54" width="135" height="18" rx="2" fill="#07192b" />
          <text x="181" y="66" fill="#91a8be" fontSize="7" fontFamily="monospace">"Refine requirement #1042..."</text>
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
