import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { activeNavAtom, isMenuOpenAtom } from '../store/atoms'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'ai', label: 'AI' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
  const [activeNav] = useAtom(activeNavAtom)
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-bg-primary/80 shadow-lg shadow-black/10 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="group relative font-display text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">Berk Guzeyer</span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeNav === item.id ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </span>
                {activeNav === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-white/[0.06]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}

            <div className="ml-4 h-5 w-px bg-white/[0.08]" />

            <motion.button
              onClick={() => scrollToSection('contact')}
              className="ml-2 px-5 py-2 text-sm font-medium text-accent-indigo transition-all duration-300 hover:text-accent-violet"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Let's Talk</span>
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              className="block h-0.5 w-6 bg-text-primary"
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-text-primary"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-text-primary"
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-bg-primary/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection(item.id)}
                  className="font-display text-3xl font-semibold text-text-primary transition-colors hover:text-accent-indigo"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
