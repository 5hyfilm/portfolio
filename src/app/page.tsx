// src/app/page.tsx
"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-600 rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-purple-500 rounded-full animate-ping delay-1500"></div>
        <div className="absolute bottom-40 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-2000"></div>
      </div>

      {/* Single large zero with diagonal line background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15">
        <div className="relative">
          {/* The zero character */}
          <span className="text-[30rem] font-bold text-gray-400 select-none">
            0
          </span>
          {/* Diagonal line cutting through the zero and extending beyond */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 w-96 h-4 bg-gray-500"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Space for better visual balance */}
          <div className="mb-8"></div>

          {/* Welcome text with elegant styling */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-700 mb-6 tracking-wide animate-fade-in-up">
              Welcome to My
            </h2>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent mb-8 animate-pulse-slow">
              Portfolio
            </h2>
          </div>

          {/* Divider with animation */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent w-24 animate-pulse delay-300"></div>
            <div className="mx-4 w-2 h-2 bg-purple-600 rounded-full animate-ping"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent w-24 animate-pulse delay-700"></div>
          </div>

          {/* Main motto with dramatic styling */}
          <div className="mb-16">
            <p className="text-4xl md:text-5xl font-bold text-purple-500 font-japanese mb-4 leading-tight animate-fade-in-up delay-1000 hover:scale-105 transition-transform duration-500">
              妥協は死
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-8 opacity-60">
            <div className="w-1 h-16 bg-gradient-to-b from-purple-600 to-transparent animate-pulse delay-100"></div>
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-transparent animate-pulse delay-300"></div>
            <div className="w-1 h-20 bg-gradient-to-b from-purple-600 to-transparent animate-pulse delay-500"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-transparent animate-pulse delay-700"></div>
            <div className="w-1 h-14 bg-gradient-to-b from-purple-600 to-transparent animate-pulse delay-900"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-purple-600/30"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-purple-600/30"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-purple-600/30"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-purple-600/30"></div>
    </div>
  );
}
