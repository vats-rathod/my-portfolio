import Reveal from './Reveal.jsx'
import { EXPERIENCE } from '../data.js'

export default function Experience() {
  return (
    <section className="section exp" id="experience">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Experience</span>
        </Reveal>
        <Reveal as="h2" className="section-title display" delay={80}>
          From intern to <span className="serif-em">engineer</span>, at IBM.
        </Reveal>

        <ol className="timeline">
          {EXPERIENCE.map((e, i) => (
            <Reveal as="li" className="tl-item" key={e.date} delay={i * 80}>
              <div className="tl-side">
                <span className="tl-date">{e.date}</span>
                <span className={`tl-status ${e.status === 'Current' ? 'is-live' : ''}`}>
                  <span className="tl-status-dot" aria-hidden="true" />
                  {e.status}
                </span>
              </div>

              <div className="tl-body">
                <h3>{e.title}</h3>
                <p className="tl-org">{e.org}</p>
                <ul>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
