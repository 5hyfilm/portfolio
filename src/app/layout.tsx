// src/app/layout.tsx
import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Portfolio',
  description: 'Professional portfolio website with Bleach-inspired design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="min-h-screen relative">
          {/* Decorative elements */}
          <div className="fixed top-0 left-0 w-full h-1 bg-[#FF8533]"></div>
          <div className="fixed top-0 right-0 w-1 h-screen bg-gradient-to-b from-[#FF8533] to-transparent"></div>
          <div className="fixed bottom-0 left-0 w-full h-1 bg-[#FF8533]"></div>
          <div className="fixed top-0 left-0 w-1 h-screen bg-gradient-to-b from-[#FF8533] to-transparent"></div>
          
          {/* Background pattern */}
          <div className="fixed inset-0 bg-pattern pointer-events-none"></div>
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main content */}
          <main className="pt-16 relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}