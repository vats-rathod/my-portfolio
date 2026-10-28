import Reveal from './Reveal.jsx'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="wrap">
        <span>Vatsal Rathod — Software Development Engineer, IBM India Software Labs</span>
        <span>© {YEAR}</span>
      </Reveal>
    </footer>
  )
}
