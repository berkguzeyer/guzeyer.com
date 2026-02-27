import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative flex flex-col items-center border-t border-white/[0.04] bg-bg-primary px-6 py-12">
      <div className="w-full max-w-xl text-center">
        {/* Name */}
        <div className="mb-4">
          <span className="font-display text-lg font-semibold">
            <span className="gradient-text">Berk Guzeyer</span>
          </span>
          <p className="mt-1 text-sm text-text-muted">Crafted with precision &amp; passion</p>
        </div>

        {/* Tech stack */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-1 text-xs text-text-muted">
          <span>Built with</span>
          {['React', 'TypeScript', 'Tailwind', 'Framer Motion'].map((tech, i, arr) => (
            <span key={tech}>
              <span className="text-text-secondary">{tech}</span>
              {i < arr.length - 1 && <span className="ml-1 text-text-muted/40">·</span>}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <motion.p
          className="text-sm text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {currentYear} Berk Guzeyer. All rights reserved.
        </motion.p>

        <div className="mt-8 flex justify-center">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent-indigo/30 to-transparent" />
        </div>
      </div>
    </footer>
  )
}
