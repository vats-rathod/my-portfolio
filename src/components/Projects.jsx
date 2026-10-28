import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import Flow from './Flow.jsx'
import { PROJECTS, EARLIER } from '../data.js'

// Real screenshots win when provided; otherwise a plain, labelled flow
// derived only from what the project is known to do.
function Artifact({ p }) {
  if (p.shots?.length) {
    return (
      <figure className="pj-shots">
        <div className="pj-shots-row">
          {p.shots.map((s) => (
            <img key={s.src} src={s.src} alt={s.alt} loading="lazy" />
          ))}
        </div>
        {p.shotCaption && <figcaption>{p.shotCaption}</figcaption>}
      </figure>
    )
  }
  return (
    <div className="pj-art">
      <Flow steps={p.flow} label={p.flowLabel} />
      {p.adminNote && <p className="pj-admin">{p.adminNote}</p>}
    </div>
  )
}

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

        <div className="pj-list">
          {PROJECTS.map((p) => (
            <Reveal as="article" className="pj" key={p.id}>
              <div className="pj-copy">
                <span className="wk-label">{p.kicker}</span>
                <h3>{p.title}</h3>

                <div className="wk-block">
                  <span className="wk-label">The problem</span>
                  <p>{p.problem}</p>
                </div>
                <div className="wk-block">
                  <span className="wk-label">How it’s built</span>
                  <p>{p.how}</p>
                </div>

                <p className="pj-stack">{p.stack.join(' · ')}</p>
                {p.status && <p className="pj-status">{p.status}</p>}

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

              <Artifact p={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="earlier">
          <span className="eyebrow">Earlier work</span>
          <ul>
            {EARLIER.map((e) => (
              <li key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
                {e.stack && <p className="pj-stack">{e.stack.join(' · ')}</p>}
                {e.note && <p className="earlier-note">{e.note}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
