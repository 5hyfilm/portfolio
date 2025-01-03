// src/app/components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Achievements', path: '/achievements' },
    { label: 'Projects', path: '/projects' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* Fixed Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-5 right-4 w-6 h-6 flex flex-col justify-between 
                   md:hidden z-[100] focus:outline-none"
        aria-label="Toggle menu"
      >
        <span 
          className={`w-full h-0.5 bg-black transition-transform duration-300 transform
                     ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}
        />
        <span 
          className={`w-full h-0.5 bg-black transition-opacity duration-300
                     ${isMenuOpen ? 'opacity-0' : ''}`}
        />
        <span 
          className={`w-full h-0.5 bg-black transition-transform duration-300 transform
                     ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
        />
      </button>

      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <a href="/" className="text-xl font-bold text-gray-900">
              PORTFOLIO
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="relative px-4 py-2 group"
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className={`absolute inset-0 bg-gray-50 transform origin-left transition-transform duration-300 ease-out 
                                  ${hoveredItem === item.path ? 'scale-x-100' : 'scale-x-0'}`} 
                  />
                  <span className={`relative z-10 text-sm font-medium transition-colors duration-300
                                  ${pathname === item.path ? 'text-gray-900' : 'text-gray-600'}`}>
                    {item.label}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform origin-left 
                                  transition-transform duration-300 ease-out
                                  ${pathname === item.path ? 'scale-x-100' : 'scale-x-0'}
                                  ${hoveredItem === item.path ? 'scale-x-100' : ''}`} 
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white transform transition-all duration-500 ease-in-out z-50
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col pt-20 px-6">
          {navItems.map((item, index) => (
            <a
              key={item.path}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-medium py-4 transition-all duration-300
                         ${pathname === item.path ? 'text-gray-900' : 'text-gray-600'}
                         hover:pl-6 hover:text-gray-900 border-b border-gray-100`}
              style={{
                transitionDelay: `${index * 50}ms`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}