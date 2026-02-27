import { motion } from 'framer-motion'
import { useSectionInView } from '../hooks/useSectionInView'
import SectionHeading from './SectionHeading'
import styles from '../styles/AIPassion.module.css'

const aiArticles = [
  {
    title: 'The Future of AI in Frontend Development',
    source: 'TechCrunch',
    url: 'https://techcrunch.com/tag/artificial-intelligence/',
    date: '2024',
  },
  {
    title: 'How AI is Transforming User Interfaces',
    source: 'The Verge',
    url: 'https://www.theverge.com/ai-artificial-intelligence',
    date: '2024',
  },
  {
    title: 'AI-Powered Design Systems',
    source: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/category/ai/',
    date: '2024',
  },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function AIPassion() {
  const ref = useSectionInView('ai', 0.3)

  return (
    <section
      ref={ref}
      id="ai"
      className="relative flex flex-col items-center overflow-hidden px-6 py-60"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-accent-violet/10 blur-[150px]" />
        <div className={`absolute inset-0 opacity-[0.04] ${styles.gridBackground}`} />
      </div>

      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

      <div className="relative w-full max-w-4xl">
        <SectionHeading
          tag="// AI & INNOVATION"
          title="Shaping the Future with AI"
          description="Passionate about the intersection of artificial intelligence and software engineering, exploring how AI can enhance user experiences and developer workflows."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 px-4 py-2">
                <svg className="h-4 w-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <span className="text-sm font-medium text-accent-cyan">AI Ambassador at JPMorgan Chase</span>
              </div>

              <h3 className="font-display text-3xl font-bold text-text-primary">
                Exploring AI's Potential in Software Engineering
              </h3>
            </div>

            <p className="text-lg leading-relaxed text-text-secondary">
              I'm deeply passionate about artificial intelligence and its transformative potential.
              As an <span className="font-semibold text-text-primary">AI Ambassador at JPMorgan Chase</span>,
              I work at the intersection of cutting-edge AI technologies and user experience design,
              exploring how machine learning can enhance interfaces, automate workflows, and create
              more intelligent, adaptive applications.
            </p>

            <p className="text-lg leading-relaxed text-text-secondary">
              From AI-powered design systems to intelligent code generation, I'm fascinated by how
              AI can augment developer creativity and enable us to build products that were previously
              impossible. Whether it's leveraging LLMs for better UX copy, using computer vision for
              accessibility, or exploring generative AI for design — I believe we're just scratching
              the surface.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {['🤖 AI/ML Integration', '🧠 LLM Applications', '🎨 Generative Design', '⚡ AI-Powered UX'].map((tag) => (
                <span key={tag} className="text-sm text-text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual + Articles */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Neural network visualization */}
            <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-accent-cyan/10 via-accent-indigo/10 to-accent-violet/10 p-6">
              <div className="relative h-full w-full">
                {[...Array(12)].map((_, i) => {
                  const x = 40 + (i % 4) * 70
                  const y = 25 + Math.floor(i / 4) * 80
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-accent-cyan/40"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        width: '10px',
                        height: '10px',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.1 }}
                    />
                  )
                })}

                <svg className="absolute inset-0 h-full w-full opacity-20">
                  {[
                    { x1: 40, y1: 25, x2: 110, y2: 25 },
                    { x1: 110, y1: 25, x2: 180, y2: 25 },
                    { x1: 180, y1: 25, x2: 250, y2: 25 },
                    { x1: 40, y1: 105, x2: 110, y2: 105 },
                    { x1: 110, y1: 105, x2: 180, y2: 105 },
                    { x1: 180, y1: 105, x2: 250, y2: 105 },
                    { x1: 75, y1: 25, x2: 75, y2: 105 },
                    { x1: 145, y1: 25, x2: 145, y2: 105 },
                    { x1: 215, y1: 25, x2: 215, y2: 105 },
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                      stroke="currentColor" strokeWidth="1"
                      className="text-accent-cyan"
                      initial={{ pathLength: 0, opacity: 0.2 }}
                      animate={{ pathLength: [0, 1, 0], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Latest AI Articles */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h4 className="font-display text-lg font-semibold text-text-primary">Latest AI Insights</h4>
                <a
                  href="https://techcrunch.com/tag/artificial-intelligence/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-cyan transition-colors hover:text-accent-indigo"
                >
                  View All →
                </a>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {aiArticles.map((article, i) => (
                  <motion.a
                    key={i}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeUp}
                    className="group block rounded-xl bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.04]"
                  >
                    <div className="mb-1.5 flex items-start justify-between gap-3">
                      <h5 className="text-sm font-medium text-text-primary transition-colors group-hover:text-accent-cyan">
                        {article.title}
                      </h5>
                      <svg
                        className="h-3.5 w-3.5 flex-shrink-0 text-text-muted transition-transform group-hover:translate-x-1"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <span>{article.source}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
