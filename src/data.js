// All editable content lives here. Everything below comes from your résumé
// or from details you gave me — nothing is invented. Keep IBM descriptions
// high-level and public-safe.

import mapleHome from './assets/maple-home.png'
import mapleEntries from './assets/maple-entries.png'

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'capabilities', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const EXPERIENCE = [
  {
    date: 'Jul 2025 — Present',
    title: 'Software Development Engineer',
    org: 'IBM India Software Labs, Gandhinagar',
    bullets: [
      'Architected backend AI infrastructure for IBM Engineering Lifecycle Management (ELM): database schemas, FastAPI endpoints, and MCP server integration so AI agents can orchestrate tools and communicate with external systems.',
      'Built AI-driven backend services for requirements engineering workflows, using LangChain for LLM integration and tool orchestration.',
      'Developed stateful, multi-step agent workflows with LangGraph, supporting conversational requirements analysis and automated task execution.',
    ],
    status: 'Current',
  },
  {
    date: 'Jan 2025 — Jul 2025',
    title: 'Software Development Engineer Intern',
    org: 'IBM India Software Labs, Gandhinagar',
    bullets: [
      'Developed an AI-powered requirements quality analysis widget using React, TypeScript, and the Carbon Design System.',
      'Implemented real-time quality scoring, AI-driven recommendations, and conversational chat for requirements validation.',
    ],
    status: 'Converted to full-time',
  },
]

// The IBM case study. Deliberately high-level: no internal code, schemas,
// endpoints or screenshots.
export const WORK_IBM = {
  title: 'AI infrastructure for IBM ELM',
  meta: [
    { k: 'Role', v: 'Software Development Engineer, IBM India Software Labs' },
    { k: 'Product', v: 'IBM Engineering Lifecycle Management (ELM)' },
    { k: 'Since', v: 'Intern Jan 2025 · Full-time Jul 2025' },
    { k: 'Stack', v: 'Python · FastAPI · LangChain · LangGraph · MCP' },
  ],
  context:
    'Engineering teams write requirements that need analysis and quality validation. AI-driven workflows, in turn, need a dependable way to call tools and reach external systems.',
  built: [
    'Designed database schemas and FastAPI endpoints for the AI backend inside ELM.',
    'Integrated Model Context Protocol (MCP) servers so AI agents can invoke tools and communicate with external systems.',
    'Used LangChain for LLM integration and tool orchestration in requirements engineering services.',
    'Built stateful, multi-step workflows with LangGraph for conversational requirements analysis and automated task execution.',
  ],
  origin:
    'It started on the front end. As an intern I built a requirements quality analysis widget in React, TypeScript and the Carbon Design System, with quality scoring, AI recommendations and a chat for validation. In July 2025 I converted to full-time and took on the backend work above.',
  flow: [
    { label: 'Request', note: 'A user action in the product' },
    { label: 'Backend API', note: 'FastAPI service' },
    { label: 'Agent workflow', note: 'LangGraph state and steps' },
    { label: 'Tool integration', note: 'Tools exposed through MCP' },
    { label: 'External system', note: 'Whatever the agent needs to reach' },
    { label: 'Response', note: 'The result goes back to the user' },
  ],
  flowLabel: 'How a request moves',
  flowCaption: 'Conceptual and simplified. Not a diagram of an internal system.',
  code: `graph = StateGraph(AgentState)
graph.add_node("analyze", analyze)   # LLM step
graph.add_node("tools", run_tools)   # tool calls

graph.add_edge(START, "analyze")
graph.add_conditional_edges(
    "analyze", needs_tool, {True: "tools", False: END}
)
graph.add_edge("tools", "analyze")   # loop back with results`,
  codeLabel: 'Pattern sketch',
  codeCaption:
    'A generic LangGraph sketch of the pattern: an LLM step that can call tools and loop until done. Illustrative only, not IBM code.',
  note: 'Internal code, schemas and screenshots are intentionally left out.',
}

// Personal projects. `shots` ([{ src, alt }]), `status`, `repo` and `live`
// render only when set — add real screenshots or a verified status and they
// replace the diagram / appear. Nothing is faked.
export const PROJECTS = [
  {
    id: 'P-01',
    title: 'Maple',
    kicker: 'Sales and payments tracker',
    problem:
      'A small food counter keeps its orders in a paper notebook. Maple replaces it: record each sale, note whether it was paid by cash or UPI or is still pending, and see the totals for a day or a date range.',
    how: 'A mobile-first React and Vite frontend over a Node.js and Express API, with Mongoose and MongoDB underneath. Each sale is built from menu items and snapshots their name and price, so later menu edits do not rewrite past sales. Pending payments get their own list and can be marked Cash or UPI later. Daily and date-range summaries are computed on the server.',
    stack: ['React', 'Vite', 'React Router', 'Node.js', 'Express', 'Mongoose', 'MongoDB'],
    shots: [
      {
        src: mapleHome,
        alt: 'Maple home screen on a phone: sales total for the last three months with a Cash and UPI split, an all-payments-received status, New Sale and Entries buttons, and a list of recent sales.',
      },
      {
        src: mapleEntries,
        alt: 'Maple entries screen: sales grouped by date, each showing items, amount and a Cash or UPI badge.',
      },
    ],
    shotCaption: 'Screens from the running app (local build).',
    status: 'Single-owner MVP, no authentication.',
    repo: '',
    live: '',
  },
  {
    id: 'P-02',
    title: 'CafeSync',
    kicker: 'Cafeteria seat booking',
    problem:
      'Shared cafeteria seating needs a booking flow for employees and a way for administrators to control capacity.',
    how: 'Built with React, Node.js, Express and MongoDB. Intended scope: employee signup and login, seat selection and booking, capacity management for administrators, booking notifications, and feedback.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    flowLabel: 'Intended employee flow',
    flow: [
      { label: 'Sign up or log in', note: 'Employee account' },
      { label: 'Choose a seat', note: 'Within the current capacity' },
      { label: 'Book it', note: 'Booking notification' },
    ],
    adminNote: 'Administrators set and manage seat capacity.',
    shots: null,
    status: '',
    repo: '',
    live: '',
  },
]

// Earlier, lower-prominence work. Add `stack` and a fuller `text` once verified.
export const EARLIER = [
  {
    title: 'Chat App',
    text: 'An earlier chat application project from SGP.',
    note: 'Details to be added.',
  },
]

// Leave a value empty to hide its button. Add verified URLs only.
export const CONTACT = {
  whatsapp:
    'https://wa.me/917621858105?text=Hi%20Vatsal%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.',
  linkedin: 'https://www.linkedin.com/in/vatsal-rathod-545404236/',
  // github: 'https://github.com/vats-rathod',
  email: '',
}
