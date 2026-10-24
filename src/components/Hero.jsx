import { useEffect, useRef } from 'react'
import { ArrowUpRight, ChevronRight } from 'lucide-react'

// Four stacked translucent planes: an abstract nod to a layered
// agent architecture (interface → orchestration → tools → data).
function LayerArt() {
  const planes = [
    { y: 20, o: 0.95, id: 'a' },
    { y: 110, o: 0.75, id: 'b' },
    { y: 200, o: 0.55, id: 'c' },
    { y: 290, o: 0.38, id: 'd' },
  ]
  return (
    <svg viewBox="0 0 400 420" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="plane-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#8fd0da" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="plane-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8fd0da" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8fd0da" stopOpacity="0.55" />
          <stop offset="1" stopColor="#8fd0da" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* vertical link running through every layer */}
      <line x1="200" y1="40" x2="200" y2="360" stroke="url(#plane-edge)" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="200" cy="200" r="90" fill="url(#core)" />

      {planes.map((p) => (
        <g className="slab" key={p.id} opacity={p.o}>
          <path
            d={`M200 ${p.y} L360 ${p.y + 44} L200 ${p.y + 88} L40 ${p.y + 44} Z`}
            fill="url(#plane-fill)"
            stroke="url(#plane-edge)"
            strokeWidth="1"
          />
          <path
            d={`M200 ${p.y + 20} L296 ${p.y + 44} L200 ${p.y + 68} L104 ${p.y + 44} Z`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <circle cx="200" cy={p.y + 44} r="3" fill="#f1ede6" />
        </g>
      ))}
    </svg>
  )
}

export default function Hero() {
  const artRef = useRef(null)

  // Gentle parallax on the artwork; skipped for reduced-motion users.
  useEffect(() => {
    const el = artRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (window.scrollY < window.innerHeight * 1.2) el.style.setProperty('--py', String(window.scrollY))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-atmos" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-in">
          <a href="#experience" className="hero-tag">
            <span className="hero-tag-dot" aria-hidden="true" />
            Software Development Engineer · IBM India Software Labs
            <ChevronRight size={14} aria-hidden="true" />
          </a>

          <h1 className="display">
            <span className="line">Building</span>
            <span className="line">
              Systems for <span className="serif-em">AI Agents</span>
            </span>
          </h1>

          <p className="hero-lede">
            I build the backend infrastructure behind AI agents — FastAPI services, MCP integration, LangChain tool
            orchestration, and stateful LangGraph workflows — inside{' '}
            <strong>IBM Engineering Lifecycle Management</strong>.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              Explore My Work
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-inner" ref={artRef}>
            <LayerArt />
          </div>
        </div>
      </div>

      <div className="hero-meta" aria-hidden="true">
        <span>Gandhinagar, India</span>
        <span>Scroll</span>
      </div>
    </section>
  )
}
