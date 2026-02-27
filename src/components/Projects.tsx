import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSectionInView } from '../hooks/useSectionInView'
import SectionHeading from './SectionHeading'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  image: string
  category: string
  links: {
    demo?: string
    github?: string
  }
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: 'JP Morgan Chase — Checkout Experience',
    description: 'Led frontend engineering on the checkout flow for one of the largest financial institutions',
    longDescription:
      'Architected and built the high-performance checkout experience handling millions of transactions. Focused on conversion optimization, accessibility compliance, real-time payment state management, and seamless integration with banking APIs — all while maintaining sub-second load times.',
    tech: ['React', 'TypeScript', 'Redux', 'GraphQL', 'Tailwind CSS', 'Playwright'],
    image: 'from-blue-600/20 via-cyan-500/20 to-teal-400/20',
    category: 'Fintech',
    links: {},
    featured: true,
  },
  {
    id: 2,
    title: 'Publix — Grocery E-commerce Platform',
    description: 'Built the frontend for publix.com, powering online grocery for millions of shoppers',
    longDescription:
      'Developed key features of the Publix e-commerce storefront, including product catalog browsing, advanced search & filtering, cart management, and store locator. Optimized for Core Web Vitals with server-side rendering and responsive design across all devices.',
    tech: ['React', 'Next.js', 'TypeScript', 'React Query', 'Styled Components', 'Jest'],
    image: 'from-emerald-600/20 via-green-500/20 to-lime-400/20',
    category: 'E-commerce',
    links: { demo: 'https://www.publix.com' },
    featured: true,
  },
  {
    id: 3,
    title: 'EdTech — Student Learning Platform',
    description: 'Full-featured educational platform serving college students nationwide',
    longDescription:
      'Built a modern learning management system with interactive course content, real-time collaboration tools, progress tracking dashboards, and an accessible, responsive interface. Focused on engagement, load performance, and supporting diverse student needs.',
    tech: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'WebSockets', 'D3.js'],
    image: 'from-purple-600/20 via-violet-500/20 to-fuchsia-400/20',
    category: 'Education',
    links: {},
    featured: true,
  },
  {
    id: 4,
    title: 'Enterprise Design System',
    description: 'Scalable component library adopted across multiple product teams',
    longDescription:
      'Created a comprehensive design system with 50+ accessible components, automated visual regression testing, theme token architecture, and Storybook documentation. Unified the UI language across engineering teams and dramatically accelerated feature delivery.',
    tech: ['React', 'TypeScript', 'Storybook', 'Radix UI', 'Tailwind CSS', 'Chromatic'],
    image: 'from-orange-600/20 via-amber-500/20 to-yellow-400/20',
    category: 'Design System',
    links: {},
    featured: false,
  },
  {
    id: 5,
    title: 'Real-time Analytics Dashboard',
    description: 'Interactive data visualization for business intelligence teams',
    longDescription:
      'Designed and implemented a performant analytics dashboard with custom SVG chart components, virtual scrolling for massive datasets, drag-and-drop report builder, and live data streaming — all rendering at 60fps.',
    tech: ['React', 'TypeScript', 'D3.js', 'React Query', 'CSS Modules'],
    image: 'from-rose-600/20 via-pink-500/20 to-red-400/20',
    category: 'Data Viz',
    links: {},
    featured: false,
  },
  {
    id: 6,
    title: 'Personal Portfolio',
    description: 'This website — showcasing modern frontend techniques and interactions',
    longDescription:
      'A highly interactive personal portfolio built to demonstrate expertise in modern web technologies, animations, responsive design, and attention to detail. Features particle fields, magnetic buttons, and scroll-driven animations.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Jotai'],
    image: 'from-indigo-600/20 via-blue-500/20 to-sky-400/20',
    category: 'Portfolio',
    links: { github: 'https://github.com/berkguzeyer/personal-website' },
    featured: false,
  },
]

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

export default function Projects() {
  const ref = useSectionInView('projects', 0.2)
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section ref={ref} id="projects" className="relative px-6 py-40">
      {/* Background accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="// SELECTED WORK"
          title="Products I've Built"
          description="Frontend products and interfaces I've designed, architected, and shipped."
        />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent-indigo/20 text-accent-indigo'
                  : 'text-text-muted hover:bg-white/[0.04] hover:text-text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.02] transition-all duration-500 hover:bg-white/[0.04]"
              >
                {/* Project image/gradient area */}
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.image}`}>
                  {/* Overlay pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Floating icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ y: hoveredProject === project.id ? -5 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                      <svg className="h-8 w-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-accent-indigo/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 font-display text-lg font-semibold text-text-primary transition-colors group-hover:text-accent-indigo">
                    {project.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {hoveredProject === project.id ? project.longDescription : project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-accent-cyan"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        Visit Site
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-accent-cyan"
                      >
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Source
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom gradient line on hover */}
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent-indigo/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
