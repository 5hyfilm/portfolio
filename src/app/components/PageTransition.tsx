// src/app/components/PageTransition.tsx
'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 600) // Match this with your animation duration

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      <div className={`page-transition-overlay ${isTransitioning ? 'entering' : ''}`} />
      <div className={`page-transition-overlay-2 ${isTransitioning ? 'entering' : ''}`} />
    </>
  )
}