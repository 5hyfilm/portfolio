// src/app/layout.tsx
import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Portfolio',
  description: 'Professional portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Diagonal background */}
        <div className="diagonal-background">
          <div className="diagonal-slice"></div>
          <div className="diagonal-slice"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}