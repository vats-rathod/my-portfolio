import { useEffect, useRef, useState } from 'react'

// Scroll reveal that replays in both directions.
//
// State is one of:
//   'in'    – shown
//   'below' – hidden, waiting below the viewport (nudged down)
//   'above' – hidden, waiting above the viewport (nudged up)
//
// Two observers give hysteresis so elements don't toggle while they stay
// visible: one shows an element once it is ENTER_INSET px inside the bottom
// edge, the other hides it only when it has fully left the viewport. The
// hidden transform always moves the element further away from the viewport,
// so hiding can never push it back into view (no flicker loops).
//
// `delay` (ms) staggers siblings. Reduced motion is handled in CSS.
//
// IntersectionObserver measures the *transformed* box, and a waiting element
// is shifted down HIDDEN_SHIFT px (see .reveal in base.css). The enter margin
// adds that shift back so the trigger line matches the element's real layout
// position. Without it, a short element near the very bottom of the page (the
// footer) could never reach the trigger line and would stay invisible.
const ENTER_INSET = 24 // px an element must be inside the bottom edge to reveal
const HIDDEN_SHIFT = 22 // px; keep in sync with translateY in base.css

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...props }) {
  const ref = useRef(null)
  const [state, setState] = useState(() => (typeof IntersectionObserver === 'undefined' ? 'in' : 'below'))

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const enterIO = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) setState('in')
      },
      { rootMargin: `0px 0px ${HIDDEN_SHIFT - ENTER_INSET}px 0px`, threshold: 0 },
    )

    const exitIO = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]
        if (!entry.isIntersecting) setState(entry.boundingClientRect.top < 0 ? 'above' : 'below')
      },
      { threshold: 0 },
    )

    enterIO.observe(el)
    exitIO.observe(el)
    return () => {
      enterIO.disconnect()
      exitIO.disconnect()
    }
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={`reveal ${className}`.trim()}
      style={delay ? { '--d': `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}
