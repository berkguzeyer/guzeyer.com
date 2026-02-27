import { useEffect, useRef } from 'react'
import { useSetAtom } from 'jotai'
import { activeNavAtom } from '../store/atoms'

export function useSectionInView(sectionId: string, threshold = 0.3) {
  const ref = useRef<HTMLElement>(null)
  const setActiveNav = useSetAtom(activeNavAtom)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveNav(sectionId)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [sectionId, threshold, setActiveNav])

  return ref
}
