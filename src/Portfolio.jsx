import './styles/base.css'
import './styles/hero.css'
import './styles/story.css'
import './styles/work.css'
import './styles/sections.css'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Work from './components/Work.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function Portfolio() {
  return (
    <div className="site-root">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
