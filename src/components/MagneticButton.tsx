import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export default function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [-20, 20], [5, -5])
  const rotateY = useTransform(springX, [-20, 20], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 600,
      }}
      className={`relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-8 py-4 font-medium transition-shadow duration-300 ${className}`}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  }

  return content
}
