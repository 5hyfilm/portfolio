// src/app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 text-orange-500 font-japanese">
            フィルム
          </h1>
          <h2 className="text-4xl font-bold mb-6 text-gray-100">
            Welcome to My Portfolio
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-6xl font-bold mb-6 text-orange-500 font-japanese">
            Compromise is death
          </p>
          {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Abandon your fear. Look forward. Move forward and never stop. You
            will age if you pull back. You will die if you hesitate.
          </p> */}
        </div>

        {/* Decorative kanji background */}
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center opacity-5 pointer-events-none z-0">
          <span className="text-[20rem] font-japanese transform -rotate-12">
            卍解
          </span>
        </div>

        {/* Main content sections */}
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-gray-800 p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4 text-orange-400">
              Skills & Abilities
            </h3>
            <p className="text-gray-300">
              Combining technical expertise and creative problem-solving for
              outstanding results.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4 text-orange-400">
              My Projects
            </h3>
            <p className="text-gray-300">
              Unleashing creative power through innovative solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
