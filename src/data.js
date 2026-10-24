// All editable content lives here. Everything below comes from your résumé
// or from details you gave me — nothing is invented. Keep IBM descriptions
// high-level and public-safe.

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const EXPERIENCE = [
  {
    rev: 'REV B',
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
    rev: 'REV A',
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

export const CAPABILITIES = [
  {
    key: 'infra',
    title: 'AI Agent Infrastructure',
    text: 'Backend infrastructure for AI agents: database schemas, FastAPI services, tool orchestration, and external system communication inside IBM Engineering Lifecycle Management.',
    tags: ['FastAPI', 'Python', 'LangChain', 'REST'],
  },
  {
    key: 'api',
    title: 'Backend Engineering',
    text: 'API design, database schemas, and FastAPI services powering AI-driven requirements engineering workflows.',
    tags: ['FastAPI', 'Python', 'REST', 'PostgreSQL'],
  },
  {
    key: 'agents',
    title: 'Agentic Workflows',
    text: 'LLM integration, LangChain, LangGraph, and stateful multi-step workflows for conversational requirements analysis.',
    tags: ['LangGraph', 'LangChain', 'State Machines'],
  },
  {
    key: 'mcp',
    title: 'Model Context Protocol',
    text: 'MCP server integration that exposes tools to AI agents and enables structured communication with external systems and IBM ELM APIs.',
    tags: ['MCP', 'Python', 'Tool Protocols'],
  },
  {
    key: 'aitools',
    title: 'AI-Powered Engineering Tools',
    text: 'Requirements quality analysis, real-time scoring, automated recommendations, and conversational requirements workflows.',
    tags: ['LLM', 'React', 'TypeScript', 'Analytics'],
  },
  {
    key: 'ui',
    title: 'Frontend Engineering',
    text: 'React, TypeScript, and the Carbon Design System for AI-assisted interfaces — real-time quality scoring, chat, and component-driven UX at IBM.',
    tags: ['React', 'TypeScript', 'Carbon', 'Design Systems'],
  },
]

// Personal projects only. Links render only when set — nothing is faked.
export const PROJECTS = [
  {
    id: 'P-01',
    title: 'Maple',
    summary:
      'An application for managing items, recording transactions, and reviewing operational activity. Built to explore inventory and ledger workflows end-to-end.',
    tags: ['Inventory System', 'Ledger Workflows', 'Activity Tracking'],
    repo: '',
    live: '',
  },
  {
    id: 'P-02',
    title: 'CafeSync',
    summary:
      'An employee cafeteria seat-booking system with booking and administration workflows. Allows staff to reserve seats and lets administrators manage capacity.',
    tags: ['Seat Reservation', 'Capacity Management', 'Admin Workflows'],
    repo: '',
    live: '',
  },
]

// Leave a value empty to hide its button. Add verified URLs only.
export const CONTACT = {
  linkedin: 'https://www.linkedin.com/in/vatsal-rathod-545404236/',
  github: 'https://github.com/vats-rathod',
  email: '',
}
