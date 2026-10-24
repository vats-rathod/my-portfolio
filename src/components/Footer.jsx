const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>Vatsal Rathod — Software Development Engineer, IBM India Software Labs</span>
        <span>© {YEAR}</span>
      </div>
    </footer>
  )
}
