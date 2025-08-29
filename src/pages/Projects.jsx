import React from 'react'
import { Github, Globe } from 'lucide-react'

const projects = [
  {
    title: "JU Events",
    description: "Event Management System built with FastAPI + PostgreSQL + Alembic. Features user auth, event CRUD, and registrations with filters.",
    github: "https://github.com/Gouravsaha12/juevents_backend.git",
    live: "https://juevents.web.app", // if you deployed frontend
    tech: ["FastAPI", "PostgreSQL", "Alembic"]
  },
  {
    title: "Book Review API",
    description: "Backend API for managing books and reviews. Built with FastAPI and PostgreSQL to practice RESTful API design and database modeling.",
    github: "https://github.com/Gouravsaha12/bookreviewapi",
    live: "", // leave blank if not deployed
    tech: ["FastAPI", "PostgreSQL"]
  },
  {
    title: "Portfolio Website",
    description: "This portfolio site made with React, Tailwind, and React Router to showcase my projects, blogs, and skills.",
    github: "https://github.com/Gouravsaha12/portfolio", // your repo if created
    live: "",     
    tech: ["React", "Tailwind", "React Router"]
  },
]

const Projects = () => {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">Projects</h1>
          <p className="text-zinc-600">Explore my latest work and experiments</p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div key={idx} className="bg-white border-2 border-black p-8">
              {/* Project Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black mb-3">{proj.title}</h2>
                <p className="text-zinc-800 leading-relaxed">{proj.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-sm font-medium bg-zinc-100 text-zinc-700 border-2 border-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex gap-4 pt-4 border-t-2 border-zinc-200">
                {proj.github && (
                  <a 
                    href={proj.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 font-medium hover:bg-zinc-800 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                )}
                {proj.live && (
                  <a 
                    href={proj.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 bg-white text-black border-2 border-black px-4 py-2 font-medium hover:bg-zinc-50 transition-colors duration-200"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-white border-2 border-black p-12 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">More Projects Coming Soon</h3>
          <p className="text-zinc-600 mb-6">I'm always working on new ideas and experiments.</p>
          <a 
            href="https://github.com/Gouravsaha12" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-medium hover:bg-zinc-800 transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
            <span>View All on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Projects