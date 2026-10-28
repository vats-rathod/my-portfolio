// A short ordered sequence of named steps, drawn as a vertical path.
export default function Flow({ steps, caption, label }) {
  return (
    <figure className="flow-fig">
      {label && <figcaption className="wk-label">{label}</figcaption>}
      <ol className="flow">
        {steps.map((s) => (
          <li key={s.label}>
            <strong>{s.label}</strong>
            <span>{s.note}</span>
          </li>
        ))}
      </ol>
      {caption && <p className="flow-caption">{caption}</p>}
    </figure>
  )
}
