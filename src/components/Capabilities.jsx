import { Bot, Database, Workflow, Plug, Sparkles, LayoutTemplate } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { CAPABILITIES } from '../data.js'

const ICONS = {
  infra: Bot,
  api: Database,
  agents: Workflow,
  mcp: Plug,
  aitools: Sparkles,
  ui: LayoutTemplate,
}

const STROKE = 'rgba(255,255,255,0.22)'
const FAINT = 'rgba(255,255,255,0.1)'
const CY = '#8fd0da'

function Art({ capKey }) {
  switch (capKey) {
    // Layered architecture: stacked bars joined by a single spine.
    case 'infra':
      return (
        <svg viewBox="0 0 320 150" fill="none">
          <line x1="160" y1="8" x2="160" y2="142" stroke={CY} strokeOpacity="0.5" strokeDasharray="2 5" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={40 + i * 12}
              y={14 + i * 34}
              width={240 - i * 24}
              height="24"
              rx="7"
              fill="rgba(255,255,255,0.035)"
              stroke={i === 1 ? CY : STROKE}
              strokeOpacity={i === 1 ? 0.7 : 1}
            />
          ))}
          <circle cx="160" cy="60" r="3.5" fill={CY} />
        </svg>
      )
    // Hub with tool satellites.
    case 'mcp':
      return (
        <svg viewBox="0 0 220 150" fill="none">
          {[
            [40, 30],
            [180, 30],
            [30, 112],
            [190, 112],
            [110, 134],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <line x1="110" y1="72" x2={x} y2={y} stroke={STROKE} />
              <rect x={x - 9} y={y - 9} width="18" height="18" rx="5" fill="var(--bg)" stroke={STROKE} />
            </g>
          ))}
          <circle cx="110" cy="72" r="22" fill="rgba(143,208,218,0.1)" stroke={CY} strokeOpacity="0.7" />
          <circle cx="110" cy="72" r="6" fill={CY} />
        </svg>
      )
    // Nodes with a feedback loop (stateful graph).
    case 'agents':
      return (
        <svg viewBox="0 0 220 150" fill="none">
          <path d="M44 75 H92 M128 75 H176" stroke={STROKE} />
          <path d="M110 57 C110 22 176 22 176 57" stroke={CY} strokeOpacity="0.6" strokeDasharray="3 4" />
          <path d="M110 93 C110 128 44 128 44 93" stroke={FAINT} strokeDasharray="3 4" />
          <circle cx="44" cy="75" r="14" fill="var(--bg)" stroke={STROKE} />
          <circle cx="110" cy="75" r="18" fill="rgba(143,208,218,0.1)" stroke={CY} strokeOpacity="0.7" />
          <circle cx="176" cy="75" r="14" fill="var(--bg)" stroke={STROKE} />
          <circle cx="110" cy="75" r="4" fill={CY} />
        </svg>
      )
    // Data + service layers, no literal schema.
    case 'api':
      return (
        <svg viewBox="0 0 320 150" fill="none">
          <g stroke={STROKE}>
            <ellipse cx="62" cy="38" rx="32" ry="10" fill="rgba(255,255,255,0.03)" />
            <path d="M30 38 V102 C30 114 94 114 94 102 V38" />
            <path d="M30 70 C30 82 94 82 94 70" stroke={FAINT} />
          </g>
          <path d="M104 70 H158" stroke={CY} strokeOpacity="0.6" strokeDasharray="3 4" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="168" y={28 + i * 30} width={120 - i * 18} height="20" rx="6" fill="rgba(255,255,255,0.03)" stroke={i === 0 ? CY : STROKE} strokeOpacity={i === 0 ? 0.7 : 1} />
          ))}
        </svg>
      )
    // Concentric arcs: analysis / recommendation, intentionally unlabeled.
    case 'aitools':
      return (
        <svg viewBox="0 0 260 150" fill="none">
          {[56, 40, 24].map((r, i) => (
            <path key={r} d={`M${130 - r} 100 A${r} ${r} 0 0 1 ${130 + r} 100`} stroke={i === 1 ? CY : STROKE} strokeOpacity={i === 1 ? 0.75 : 1} strokeWidth="1.2" />
          ))}
          <circle cx="130" cy="100" r="4" fill={CY} />
          <path d="M60 128 H200" stroke={FAINT} />
          <path d="M60 128 H138" stroke={CY} strokeOpacity="0.6" />
        </svg>
      )
    // Wireframe interface blocks.
    case 'ui':
      return (
        <svg viewBox="0 0 260 150" fill="none">
          <rect x="24" y="16" width="212" height="118" rx="10" stroke={STROKE} fill="rgba(255,255,255,0.025)" />
          <path d="M24 40 H236" stroke={FAINT} />
          <circle cx="40" cy="28" r="2.5" fill={STROKE} />
          <circle cx="50" cy="28" r="2.5" fill={STROKE} />
          <rect x="40" y="54" width="70" height="66" rx="6" stroke={STROKE} />
          <rect x="122" y="54" width="98" height="26" rx="6" stroke={CY} strokeOpacity="0.6" />
          <rect x="122" y="90" width="98" height="30" rx="6" stroke={STROKE} />
        </svg>
      )
    default:
      return null
  }
}

export default function Capabilities() {
  return (
    <section className="section caps" id="capabilities">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Engineering capabilities</span>
        </Reveal>
        <Reveal as="h2" className="section-title wide display" delay={80}>
          What I <span className="serif-em">build</span> and how.
        </Reveal>

        <div className="bento">
          {CAPABILITIES.map((c, i) => {
            const Icon = ICONS[c.key]
            return (
              <Reveal as="article" className={`cap cap-${c.key}`} key={c.key} delay={(i % 3) * 70}>
                <div className="cap-art">
                  <Art capKey={c.key} />
                </div>
                <div className="cap-body">
                  <div className="cap-head">
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    <h3>{c.title}</h3>
                  </div>
                  <p>{c.text}</p>
                  <ul className="chips">
                    {c.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
