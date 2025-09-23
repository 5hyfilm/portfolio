"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Define types
interface ParticleProps {
  x: number;
  y: number;
  delay?: number;
}

interface Position {
  x: number;
  y: number;
}

interface NavItem {
  label: string;
  path: string;
  isSpecial?: boolean;
}

// Particle Component
const Particle = ({ x, y, delay = 0 }: ParticleProps) => {
  return (
    <div
      className="fixed w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-30"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        animation: `particle-float 3s ease-in-out infinite`,
        animationDelay: `${delay}ms`,
      }}
    >
      <style jsx>{`
        @keyframes particle-float {
          0%,
          100% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-20px) scale(0.8);
          }
          90% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Particle positions for different screen sizes
const getParticlePositions = (): Position[] => {
  // Check if window is available (client-side)
  if (typeof window === "undefined") {
    return [];
  }

  const positions: Position[] = [
    // Top left area
    { x: 100, y: 50 },
    { x: 120, y: 70 },
    { x: 80, y: 80 },
    { x: 150, y: 60 },

    // Top right area
    { x: window.innerWidth - 100, y: 50 },
    { x: window.innerWidth - 120, y: 70 },
    { x: window.innerWidth - 80, y: 80 },
    { x: window.innerWidth - 150, y: 60 },

    // Bottom center area
    { x: window.innerWidth / 2 - 50, y: window.innerHeight - 100 },
    { x: window.innerWidth / 2, y: window.innerHeight - 120 },
    { x: window.innerWidth / 2 + 50, y: window.innerHeight - 90 },
    { x: window.innerWidth / 2 - 30, y: window.innerHeight - 110 },
    { x: window.innerWidth / 2 + 30, y: window.innerHeight - 80 },
  ];

  return positions;
};

export default function NavbarWithParticles() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState<boolean>(false);
  const [particles, setParticles] = useState<Position[]>([]);
  const pathname = usePathname();

  // Initialize particles on component mount and window resize
  useEffect(() => {
    const updateParticles = () => {
      setParticles(getParticlePositions());
    };

    updateParticles();
    window.addEventListener("resize", updateParticles);
    return () => window.removeEventListener("resize", updateParticles);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navItems: NavItem[] = [
    { label: "About", path: "/about" },
    { label: "Experience", path: "/experience" },
    { label: "Achievements", path: "/achievements" },
    { label: "Projects", path: "/projects" },
    { label: "Events", path: "/events" },
    { label: "Resume", path: "/resume.pdf", isSpecial: true },
  ];

  const handleNavbarHover = (isHovering: boolean) => {
    setShowParticles(isHovering);
  };

  return (
    <>
      {/* Particle Effect */}
      {showParticles &&
        particles.map((particle, index) => (
          <Particle
            key={index}
            x={particle.x}
            y={particle.y}
            delay={index * 150}
          />
        ))}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-5 right-4 w-6 h-6 flex flex-col justify-between 
                   md:hidden z-[100] focus:outline-none"
        aria-label="Toggle menu"
      >
        <span
          className={`w-full h-0.5 bg-black transition-transform duration-300 transform
                     ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
        />
        <span
          className={`w-full h-0.5 bg-black transition-opacity duration-300
                     ${isMenuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`w-full h-0.5 bg-black transition-transform duration-300 transform
                     ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
        />
      </button>

      {/* Main Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-50 via-white to-purple-50 border-b border-purple-200 z-40"
        onMouseEnter={() => handleNavbarHover(true)}
        onMouseLeave={() => handleNavbarHover(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-purple-800"
            >
              <img
                src="/favicon.ico"
                alt="Logo"
                className="h-8 w-8 object-contain relative top-[-4px]"
              />
              <span className="align-middle">PORTFOLIO</span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                if (item.isSpecial) {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="relative px-6 py-2 ml-4 group"
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span
                        className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 
                                    rounded-full shadow-lg transform transition-all duration-300 ease-out
                                    ${
                                      hoveredItem === item.path
                                        ? "scale-105 shadow-xl"
                                        : "scale-100"
                                    }`}
                      />
                      <span
                        className={`relative z-10 text-sm font-semibold transition-colors duration-300
                                    ${
                                      pathname === item.path
                                        ? "text-white"
                                        : "text-white"
                                    }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="relative px-4 py-2 group"
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span
                      className={`absolute inset-0 bg-purple-100 transform origin-left transition-transform duration-300 ease-out 
                                    ${
                                      hoveredItem === item.path
                                        ? "scale-x-100"
                                        : "scale-x-0"
                                    }`}
                    />
                    <span
                      className={`relative z-10 text-sm font-medium transition-colors duration-300
                                    ${
                                      pathname === item.path
                                        ? "text-purple-800"
                                        : "text-purple-600"
                                    }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-700 transform origin-left 
                                    transition-transform duration-300 ease-out
                                    ${
                                      pathname === item.path
                                        ? "scale-x-100"
                                        : "scale-x-0"
                                    }
                                    ${
                                      hoveredItem === item.path
                                        ? "scale-x-100"
                                        : ""
                                    }`}
                    />
                  </Link>
                );
              })}
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
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col pt-20 px-6">
          {navItems.map((item, index) => {
            if (item.isSpecial) {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative overflow-hidden text-lg font-semibold py-4 my-2 px-6 rounded-full
                             bg-gradient-to-r from-purple-600 to-purple-700 text-white
                             hover:from-purple-700 hover:to-purple-800
                             transform hover:scale-105 transition-all duration-300
                             shadow-lg hover:shadow-xl border-none`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen
                      ? "translateX(0) scale(1)"
                      : "translateX(20px) scale(0.95)",
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium py-4 transition-all duration-300
                           ${
                             pathname === item.path
                               ? "text-gray-900"
                               : "text-gray-600"
                           }
                           hover:pl-6 hover:text-gray-900 border-b border-gray-100`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(20px)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
