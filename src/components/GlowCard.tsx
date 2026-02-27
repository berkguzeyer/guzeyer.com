import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

interface GlowCardProps {
  children: ReactNode
  className?: string
}

export default function GlowCard({ children, className = '' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  const background = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      rgba(99, 102, 241, 0.06),
      transparent 80%
    )
  `

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl bg-white/[0.02] transition-colors duration-300 hover:bg-white/[0.04] ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent-indigo/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
