// src/app/experience/page.tsx
export default function Experience() {
    const experiences = [
      {
        title: "Business Analyst (Part-Time)",
        company: "Pragma and Will Group",
        location: "Bangkok, Thailand",
        period: "Jan 2022 - Present",
        description: [
          "Led a team of 5 developers in building a scalable e-commerce platform",
          "Implemented microservices architecture using Node.js and Docker",
          "Reduced server response time by 40% through optimization",
          "Mentored junior developers and conducted code reviews"
        ],
        technologies: ["React", "Node.js", "Docker", "AWS"]
      },
      {
        title: "HR Development Strategist intern",
        company: "CP Axtra Public Company Limited (Makro)",
        location: "Bangkok, Thailand",
        period: "Jun 2020 - Dec 2021",
        description: [
          "Led a team of 3 students to innovate and develop a chatbot and dashboard HR analytics solution prototype, resulting in a 49% improvement in performance evaluation metrics and a 40% increase in productivity levels, building business consulting experience",
          "Executed extensive requirements collection, organizational research, and management analysis presentations for Makro's management team, contributing to informed decision-making processes and strategic planning",
          "Transitioned an initial HR analytics prototype into a startup project based on CP Axtra Public Company Limited internship experience, utilizing business frameworks to secure a spot as one of the final 10 teams in the Thailand HR Tech 2024 Startup Pitching event"
        ],
        technologies: ["JavaScript", "Python", "SQL", "REST APIs"]
      },
      {
        title: "Microsoft Learn Student Ambassador",
        company: "Microsoft",
        location: "Bangkok, Thailand",
        period: "Jan 2019 - May 2020",
        description: [
          "Assisted in developing user interfaces using React",
          "Fixed bugs and improved application performance",
          "Wrote unit tests and documentation",
          "Participated in daily stand-ups and sprint planning"
        ],
        technologies: ["HTML", "CSS", "JavaScript", "React"]
      }
    ];
  
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Professional Experience</h1>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 relative">
                {/* Time period indicator */}
                <div className="absolute top-6 right-6 text-sm text-gray-500">
                  {exp.period}
                </div>
  
                {/* Job title and company */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{exp.title}</h2>
                  <div className="text-gray-600">
                    {exp.company} • {exp.location}
                  </div>
                </div>
  
                {/* Responsibilities and achievements */}
                <ul className="list-disc list-inside mb-4 space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-gray-600 ml-4">
                      {item}
                    </li>
                  ))}
                </ul>
  
                {/* Technologies used */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }