// src/app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-orange-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-orange-200 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Decorative kanji background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-3">
        <span className="text-[25rem] font-japanese text-gray-300/20 transform -rotate-12 select-none">
          フィルム
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Space for better visual balance */}
          <div className="mb-8"></div>

          {/* Welcome text with elegant styling */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-700 mb-6 tracking-wide">
              Welcome to My
            </h2>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-8">
              Portfolio
            </h2>
          </div>

          {/* Divider with animation */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-24 animate-pulse"></div>
            <div className="mx-4 w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-24 animate-pulse"></div>
          </div>

          {/* Main motto with dramatic styling */}
          <div className="mb-16">
            <p className="text-4xl md:text-5xl font-bold text-orange-400 font-japanese mb-4 leading-tight">
              Compromise is death
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-8 opacity-60">
            <div className="w-1 h-16 bg-gradient-to-b from-orange-500 to-transparent"></div>
            <div className="w-1 h-12 bg-gradient-to-b from-orange-400 to-transparent"></div>
            <div className="w-1 h-20 bg-gradient-to-b from-orange-500 to-transparent"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-orange-300 to-transparent"></div>
            <div className="w-1 h-14 bg-gradient-to-b from-orange-500 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-orange-500/30"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-orange-500/30"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-orange-500/30"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-orange-500/30"></div>
    </div>
  );
}
