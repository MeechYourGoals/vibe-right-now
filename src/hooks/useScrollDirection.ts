
import { useEffect, useRef, useState } from 'react'

export const useScrollDirectionInternal = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'idle'>('idle')
  const lastScrollY = useRef(0)
  const directionRef = useRef<'up' | 'down' | 'idle'>('idle')

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction: 'up' | 'down' = scrollY > lastScrollY.current ? 'down' : 'up'

      if (
        direction !== directionRef.current &&
        Math.abs(scrollY - lastScrollY.current) > 10
      ) {
        directionRef.current = direction
        setScrollDirection(direction)
      }

      lastScrollY.current = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

  return scrollDirection
}

export { useScrollDirection } from '../providers/ScrollDirectionProvider'
