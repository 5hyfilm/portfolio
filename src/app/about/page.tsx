// src/app/about/page.tsx
import { FaGraduationCap } from "react-icons/fa";

export default function About() {
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Python", "Java", "SQL", "MongoDB"],
    tools: ["Git", "Azure", "TensorFlow", "Figma", "VS Code", "Mermaid", "Microsoft Office 365"],
  };

  const education = [
    {
      degree: "Bachelor's in Computer Engineering",
      school: "Chulalongkorn University",
      year: "2016-2020",
      description: "Core computer science fundamentals and programming",
    },
    {
      degree: "Senior High School",
      school: "Princess Chulabhorn Science High School Pathum Thani",
      year: "2016-2020",
      description: "Core computer science fundamentals and programming",
    },
    {
      degree: "Junior High School",
      school: "Samsenwittayalai School",
      year: "2016-2020",
      description: "Core computer science fundamentals and programming",
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Description Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            About Me
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Hello! I'm [Your Name], a passionate software developer with a
              focus on creating elegant solutions to complex problems. With [X]
              years of experience in software development, I specialize in
              building responsive web applications and scalable backend systems.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              My journey in technology began with [your story]. I'm particularly
              interested in [your interests/specializations], and I'm always
              excited to learn new technologies and tackle challenging projects.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-gray-100 p-3 rounded-full mr-4">
                  <FaGraduationCap className="text-gray-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                  <p className="text-gray-600 mt-1">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Frontend
              </h3>
              <div className="space-y-2">
                {skills.frontend.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Backend
              </h3>
              <div className="space-y-2">
                {skills.backend.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tools
              </h3>
              <div className="space-y-2">
                {skills.tools.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
