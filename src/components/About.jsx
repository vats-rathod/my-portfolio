import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">About</span>
        </Reveal>

        <Reveal as="p" className="about-statement" delay={80}>
          I work where backend engineering meets <span className="serif-em">applied AI</span> — building the services
          that let agents call tools, hold state, and talk to real systems.
        </Reveal>

        <div className="about-cols">
          <Reveal className="about-copy" delay={120}>
            <p>
              I’m a Software Development Engineer at IBM India Software Labs, working on the AI infrastructure layer of
              IBM Engineering Lifecycle Management — software that helps engineering teams manage requirements,
              verification, and quality across complex product lifecycles.
            </p>
            <p>
              Day to day that means designing database schemas and FastAPI endpoints, integrating Model Context Protocol
              servers so agents can use tools and external systems, and engineering stateful multi-step workflows with
              LangChain and LangGraph.
            </p>
          </Reveal>

          <Reveal className="about-path" delay={200}>
            <h3 className="about-path-title">How it started</h3>
            <ol>
              <li>
                <span className="about-path-date">Jan 2025</span>
                <span>
                  Joined IBM as an intern, building an AI-powered requirements quality widget in React, TypeScript and
                  Carbon.
                </span>
              </li>
              <li>
                <span className="about-path-date">Jul 2025</span>
                <span>Converted to full-time and moved to the backend, owning AI agent infrastructure for ELM.</span>
              </li>
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
