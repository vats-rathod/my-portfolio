import Reveal from './Reveal.jsx'
import Flow from './Flow.jsx'
import { WORK_IBM as W } from '../data.js'

export default function Work() {
  return (
    <section className="section work" id="capabilities">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Selected engineering work</span>
        </Reveal>
        <Reveal as="h2" className="section-title wide display" delay={80}>
          The work behind the <span className="serif-em">code.</span>
        </Reveal>
        <Reveal as="p" className="wk-lede" delay={140}>
          A closer look at the software, AI workflows, and engineering problems I’ve worked on.
        </Reveal>

        <Reveal as="article" className="wk-feature">
          <div className="wk-side">
            <span className="wk-label">Featured · Professional</span>
            <h3>{W.title}</h3>
            <dl className="wk-meta">
              {W.meta.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="wk-main">
            <div className="wk-block">
              <span className="wk-label">Context</span>
              <p>{W.context}</p>
            </div>
            <div className="wk-block">
              <span className="wk-label">What I built</span>
              <ul className="wk-list">
                {W.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="wk-block">
              <span className="wk-label">Where it started</span>
              <p>{W.origin}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="wk-artifacts">
          <figure className="code-fig">
            <figcaption className="wk-label">{W.codeLabel}</figcaption>
            <pre tabIndex={0}>
              <code>{W.code}</code>
            </pre>
            <p className="flow-caption">{W.codeCaption}</p>
          </figure>
          <Flow steps={W.flow} label={W.flowLabel} caption={W.flowCaption} />
        </Reveal>

        <Reveal as="p" className="wk-note">
          {W.note}
        </Reveal>
      </div>
    </section>
  )
}
