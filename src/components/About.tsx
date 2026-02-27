import { motion } from 'framer-motion'
import { useSectionInView } from '../hooks/useSectionInView'
import SectionHeading from './SectionHeading'

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '30+', label: 'Products Shipped' },
  { value: 'M+', label: 'Users Impacted' },
  { value: '99%', label: 'Lighthouse Scores' },
]

const facts = [
  '🎨 Pixel Perfectionist',
  '⚡ Performance Obsessed',
  '🧩 Component Architect',
  '♿ Accessibility Advocate',
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function About() {
  const ref = useSectionInView('about', 0.3)

  return (
    <section
      ref={ref}
      id="about"
      className="relative flex flex-col items-center px-6 py-60"
    >
      {/* Subtle top line */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-indigo/20 to-transparent" />

      {/* All content in one centered column */}
      <div className="w-full max-w-3xl">

        <SectionHeading
          tag="// ABOUT ME"
          title="Crafting Interfaces That Feel Alive"
          description="I believe the best products are built at the intersection of beautiful design and bulletproof engineering."
        />

        {/* Body text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-6"
        >
          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-text-secondary">
            With over <span className="font-semibold text-text-primary">8 years</span> of experience
            in software engineering, I specialize in building ambitious, user-facing products from the
            ground up. I've led UI architecture for products serving millions of users — from
            e-commerce platforms to complex financial systems.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-text-secondary">
            I've built frontend products across{' '}
            <span className="font-semibold text-text-primary">education technology</span> for college
            students, the{' '}
            <span className="font-semibold text-text-primary">grocery e-commerce</span> experience at
            Publix, and currently lead software engineering on the{' '}
            <span className="font-semibold text-text-primary">checkout experience at JP Morgan Chase</span>.
            Every product I build is rooted in performance, accessibility, and craft.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-text-secondary">
            I'm deeply passionate about component design systems, fluid animations, performance
            optimization, and the invisible details that make an interface feel{' '}
            <span className="font-semibold text-text-primary">truly great</span>. When I'm not
            shipping pixels, you'll find me exploring new interaction patterns or nerding out over
            the latest browser APIs.
          </motion.p>

          {/* Quick facts */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-5 pt-2">
            {facts.map((fact) => (
              <span key={fact} className="text-sm text-text-secondary">
                {fact}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-2xl bg-white/[0.02] p-8 text-center transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="gradient-text mb-2 font-display text-4xl font-bold">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
