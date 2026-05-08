// src/app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Portfolio",
  description: "Professional portfolio website",
};

import { TransitionProvider } from "../context/TransitionContext";
import KyokaTransition from "../components/ui/KyokaTransition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TransitionProvider>
          <div className="diagonal-background">
            <div className="diagonal-slice"></div>
            <div className="diagonal-slice"></div>
          </div>

          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen pt-16">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
          <KyokaTransition />
          <Analytics />
        </TransitionProvider>
      </body>
    </html>
  );
}
