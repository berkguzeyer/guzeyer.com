import { motion } from 'framer-motion'

interface SectionHeadingProps {
  tag: string
  title: string
  description?: string
}

export default function SectionHeading({ tag, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 text-center"
    >
      <span className="mb-4 inline-block font-mono text-sm tracking-wider text-accent-indigo">
        {tag}
      </span>
      <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-lg text-text-secondary">
          {description}
        </p>
      )}
    </motion.div>
  )
}
