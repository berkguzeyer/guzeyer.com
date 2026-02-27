import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSectionInView } from '../hooks/useSectionInView'
import MagneticButton from './MagneticButton'
import styles from '../styles/Hero.module.css'

const roles = [
  'Senior Software Engineer',
  'UI Architecture Expert',
  'Design Systems Builder',
  'Performance Enthusiast',
]

export default function Hero() {
  const ref = useSectionInView('hero', 0.5)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const y = useTransform(scrollY, [0, 400], [0, 100])

  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    const typeSpeed = isDeleting ? 30 : 60
    const pauseTime = isDeleting ? 200 : 2000

    if (!isDeleting && displayText === role) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentRole((prev) => (prev + 1) % roles.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? role.substring(0, displayText.length - 1)
          : role.substring(0, displayText.length + 1)
      )
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-indigo/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-accent-violet/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/5 blur-[100px]" />
      </div>

      {/* Animated grid background — styles from CSS module */}
      <div className={`pointer-events-none absolute inset-0 opacity-[0.03] ${styles.gridBackground}`} />

      <motion.div style={{ opacity, y }} className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
          </span>
          <span className="text-sm text-text-secondary">Available for opportunities</span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="mb-4 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-text-primary">Hi, I'm </span>
            <span className="gradient-text text-glow">Berk</span>
          </h1>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 h-12 font-mono text-xl text-text-secondary sm:text-2xl"
        >
          <span className="text-accent-cyan">&gt; </span>
          <span>{displayText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="ml-0.5 inline-block h-6 w-[2px] bg-accent-indigo align-middle"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-text-secondary"
        >
          I build polished, high-performance frontend products that users love.
          Obsessed with pixel-perfect UI, buttery animations, and scalable component architectures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-accent-indigo transition-colors hover:text-accent-violet"
          >
            <span>View My Work</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>

          <MagneticButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-text-primary transition-colors hover:text-accent-indigo"
          >
            <span>Get in Touch</span>
          </MagneticButton>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Design Systems'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="px-4 py-1.5 font-mono text-xs text-text-muted transition-all duration-300 hover:text-text-secondary"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-text-muted">Scroll</span>
          <div className="flex h-6 w-4 items-start justify-center rounded-full border border-text-muted/30 p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1 w-0.5 rounded-full bg-text-muted"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
