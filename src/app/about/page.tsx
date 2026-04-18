// src/app/about/page.tsx
import {
  GraduationCapIcon,
} from "../../components/ui/Icons";

export default function About() {
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Python", "SQL", "MongoDB"],
    tools: [
      "Git",
      "Microsoft Azure",
      "TensorFlow",
      "Figma",
      "VS Code",
      "Mermaid",
      "Microsoft Office 365",
    ],
  };

  const education = [
    {
      degree: "Bachelor in Computer Engineering",
      school: "Chulalongkorn University",
      year: "2021-present",
      description: "Core computer science fundamentals and programming with a full scholarship from JSTP",
    },
    {
      degree: "Senior High School",
      school: "Princess Chulabhorn Science High School Pathum Thani",
      year: "2018-2021",
      description: "With a full scholarship",
    },
    {
      degree: "Junior High School",
      school: "Samsenwittayalai School",
      year: "2015-2018",
      description: "Enrichement Science Classroom: ESC",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-6 md:px-10 md:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(109,40,217,0.10),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-700 via-fuchsia-700 to-amber-500 opacity-80" />
          <div className="pointer-events-none absolute -left-24 top-10 h-px w-[140%] -rotate-6 bg-gradient-to-r from-transparent via-violet-900/15 to-transparent" />

          <div className="relative">
            <p className="text-xs font-semibold tracking-[0.25em] text-violet-900/70">
              PROFILE
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950 md:text-5xl">
              About
            </h1>
            <div className="mt-4 max-w-3xl space-y-4">
              <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                A dynamic computer engineer with a passion for solving business
                challenges—aiming to bridge technical depth and real-world impact.
              </p>
              <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                Looking for a business analyst role to leverage technical
                ability and innovative problem-solving skills to drive business
                success and deliver impactful results.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 space-y-6">

          <section className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-50/70 via-transparent to-white opacity-0 transition group-hover:opacity-100" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(to_bottom,rgba(76,29,149,0.95),rgba(167,139,250,0.85),rgba(245,158,11,0.75))] opacity-80" />

            <div className="relative">
              <h2 className="text-sm font-semibold tracking-[0.22em] text-gray-900">
                EDUCATION
              </h2>
              <div className="mt-6 space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-violet-900 shadow-sm">
                      <GraduationCapIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-base font-semibold text-gray-950 md:text-lg">
                          {edu.degree}
                        </h3>
                        <span className="text-xs font-medium tracking-wide text-gray-500">
                          {edu.year}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-700 md:text-base">
                        {edu.school}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        {edu.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-50/70 via-transparent to-white opacity-0 transition group-hover:opacity-100" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(to_bottom,rgba(76,29,149,0.95),rgba(167,139,250,0.85),rgba(245,158,11,0.75))] opacity-80" />

            <div className="relative">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-sm font-semibold tracking-[0.22em] text-gray-900">
                    SKILLS
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 md:text-base">
                    Combining technical expertise and creative problem-solving
                    for outstanding results.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-gray-900">
                    FRONTEND
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.frontend.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 md:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-gray-900">
                    BACKEND
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 md:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-gray-900">
                    TOOLS
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 md:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
