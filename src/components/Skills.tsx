import React from 'react'
import { motion } from 'framer-motion'
import { useSectionInView } from '../hooks/useSectionInView'
import SectionHeading from './SectionHeading'

interface Skill {
  name: string
  level: number
  color: string
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core Frontend',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    skills: [
      { name: 'React / Next.js', level: 97, color: '#06b6d4' },
      { name: 'TypeScript', level: 96, color: '#3b82f6' },
      { name: 'JavaScript (ES2024+)', level: 98, color: '#eab308' },
      { name: 'HTML / CSS', level: 97, color: '#f97316' },
      { name: 'Vue.js / Nuxt', level: 80, color: '#10b981' },
    ],
  },
  {
    title: 'UI & Styling',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    skills: [
      { name: 'Tailwind CSS', level: 95, color: '#06b6d4' },
      { name: 'Framer Motion', level: 90, color: '#8b5cf6' },
      { name: 'CSS Animations / GSAP', level: 88, color: '#10b981' },
      { name: 'Styled Components / CSS-in-JS', level: 90, color: '#ec4899' },
      { name: 'Design Systems (Storybook)', level: 92, color: '#f43f5e' },
    ],
  },
  {
    title: 'State & Data',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    skills: [
      { name: 'Redux / Zustand / Jotai', level: 94, color: '#8b5cf6' },
      { name: 'React Query / SWR', level: 93, color: '#ef4444' },
      { name: 'GraphQL (Apollo / urql)', level: 87, color: '#ec4899' },
      { name: 'REST API Integration', level: 96, color: '#3b82f6' },
      { name: 'WebSockets / Real-time', level: 85, color: '#06b6d4' },
    ],
  },
  {
    title: 'Performance & Tooling',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    skills: [
      { name: 'Vite / Webpack / Turbopack', level: 92, color: '#f59e0b' },
      { name: 'Testing (Vitest, Playwright, RTL)', level: 90, color: '#10b981' },
      { name: 'Core Web Vitals / Perf Audit', level: 93, color: '#06b6d4' },
      { name: 'CI/CD & Git Workflows', level: 90, color: '#8b5cf6' },
      { name: 'Accessibility (WCAG 2.1)', level: 88, color: '#3b82f6' },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Skills() {
  const ref = useSectionInView('skills', 0.2)

  return (
    <section
      ref={ref}
      id="skills"
      className="relative flex flex-col items-center px-6 py-60"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-violet/20 to-transparent" />

      <div className="w-full max-w-4xl">
        <SectionHeading
          tag="// SKILLS & EXPERTISE"
          title="My Frontend Arsenal"
          description="The tools and technologies I use to build world-class user interfaces."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-8 md:grid-cols-2"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="group rounded-2xl bg-white/[0.02] p-7 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-indigo/10 text-accent-indigo transition-colors duration-300 group-hover:bg-accent-indigo/20">
                  {category.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                      <span className="font-mono text-xs text-text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                          boxShadow: `0 0 12px ${skill.color}40`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Currently exploring */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-sm text-text-muted">Currently exploring</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['React Server Components', 'View Transitions API', 'WebGPU', 'Signals (TC39)', 'AI-powered UI'].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-dashed border-accent-violet/30 px-4 py-1.5 font-mono text-xs text-accent-violet/70 transition-all duration-300 hover:border-accent-violet/60 hover:text-accent-violet"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
