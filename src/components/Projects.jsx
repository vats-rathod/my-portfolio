import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { PROJECTS } from '../data.js'

const STROKE = 'rgba(255,255,255,0.2)'
const FAINT = 'rgba(255,255,255,0.08)'
const CY = '#8fd0da'

// Abstract, label-free artwork. No invented data, screenshots or metrics.
function MapleArt() {
  // A ledger: rows of entries with in/out flow bars.
  const rows = [
    { w: 120, dir: 1 },
    { w: 70, dir: -1 },
    { w: 150, dir: 1 },
    { w: 90, dir: -1 },
    { w: 110, dir: 1 },
    { w: 60, dir: -1 },
  ]
  return (
    <svg viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g className="tilt">
        <rect x="48" y="44" width="304" height="212" rx="16" fill="rgba(255,255,255,0.025)" stroke={STROKE} />
        <path d="M48 82 H352" stroke={FAINT} />
        <rect x="68" y="58" width="56" height="10" rx="5" fill="rgba(255,255,255,0.14)" />
        <line x1="200" y1="82" x2="200" y2="256" stroke={FAINT} />
        {rows.map((r, i) => {
          const y = 98 + i * 26
          const x = r.dir > 0 ? 204 : 196 - r.w * 0.6
          return (
            <g key={i}>
              <rect x="68" y={y} width="44" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
              <rect
                x={x}
                y={y - 1}
                width={r.w * 0.6}
                height="10"
                rx="5"
                fill={r.dir > 0 ? 'rgba(143,208,218,0.35)' : 'rgba(255,255,255,0.12)'}
                stroke={r.dir > 0 ? CY : STROKE}
                strokeOpacity="0.7"
              />
              <path d={`M48 ${y + 17} H352`} stroke={FAINT} />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

function CafeArt() {
  // A seat map: tables with seats, a few highlighted as reserved.
  const reserved = new Set(['0-1', '0-3', '1-0', '1-2', '2-1', '2-3', '3-2'])
  return (
    <svg viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g className="tilt">
        <rect x="48" y="44" width="304" height="212" rx="16" fill="rgba(255,255,255,0.025)" stroke={STROKE} />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => {
            const cx = 96 + c * 70
            const cy = 88 + r * 50
            const on = reserved.has(`${r}-${c}`)
            return (
              <g key={`${r}-${c}`}>
                <rect x={cx - 16} y={cy - 10} width="32" height="20" rx="6" fill="rgba(255,255,255,0.03)" stroke={FAINT} />
                <circle cx={cx - 22} cy={cy} r="5" fill={on ? 'rgba(143,208,218,0.4)' : 'transparent'} stroke={on ? CY : STROKE} strokeOpacity={on ? 0.9 : 0.7} />
                <circle cx={cx + 22} cy={cy} r="5" fill="transparent" stroke={STROKE} strokeOpacity="0.7" />
              </g>
            )
          }),
        )}
      </g>
    </svg>
  )
}

const ART = { 'P-01': MapleArt, 'P-02': CafeArt }

export default function Projects() {
  return (
    <section className="section proj" id="projects">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Personal projects</span>
        </Reveal>
        <Reveal as="h2" className="section-title wide display" delay={80}>
          Built on the side, <span className="serif-em">end to end</span>.
        </Reveal>

        <div className="case-list">
          {PROJECTS.map((p, i) => {
            const Art = ART[p.id]
            return (
              <Reveal as="article" className="case" key={p.id}>
                <div className="case-visual">{Art && <Art />}</div>

                <div className="case-copy">
                  <span className="case-no">0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>

                  {p.tags.length > 0 && (
                    <ul className="chips">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}

                  {(p.repo || p.live) && (
                    <div className="case-links">
                      {p.repo && (
                        <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer">
                          Source Code <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                      {p.live && (
                        <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer">
                          Live Demo <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
