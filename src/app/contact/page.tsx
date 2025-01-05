// src/app/contact/page.tsx
'use client'

export default function Contact() {
  const contactInfo = {
    email: "your.email@example.com",
    phone: "+1 (123) 456-7890",
    location: "City, Country",
    socialMedia: [
      { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile", icon: "🔗" },
      { name: "GitHub", url: "https://github.com/yourusername", icon: "💻" },
      { name: "Twitter", url: "https://twitter.com/yourhandle", icon: "🐦" }
    ]
  }

  const handleDownloadResume = () => {
    // Replace '/path-to-your-resume.pdf' with the actual path to your resume file
    window.open('/resume.pdf', '_blank')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Get in Touch</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">📧</span>
                <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
                  {contactInfo.email}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-gray-600">📱</span>
                <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
                  {contactInfo.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-gray-600">📍</span>
                <span className="text-gray-700">{contactInfo.location}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Connect with me</h3>
              <div className="flex space-x-4">
                {contactInfo.socialMedia.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                  >
                    <span className="text-xl" role="img" aria-label={platform.name}>
                      {platform.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Download Resume Button */}
            <div className="pt-6">
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg 
                         hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 shadow-md"
              >
                <span className="mr-2">📄</span>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}