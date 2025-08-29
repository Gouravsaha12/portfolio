import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-50 py-10">
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        {/* Main Content Container */}
        <div className="bg-white border-2 border-black p-16 max-w-4xl w-full text-center">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-black mb-6">
              Hi, I'm Gourav
            </h1>
            <div className="w-16 h-1 bg-black mx-auto"></div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="text-xl text-zinc-800 leading-relaxed max-w-2xl mx-auto">
              I'm a passionate student who loves building web applications with{' '}
              <span className="font-bold text-black bg-zinc-100 px-2 py-1">React</span>,{' '}
              <span className="font-bold text-black bg-zinc-100 px-2 py-1">FastAPI</span>, and{' '}
              <span className="font-bold text-black bg-zinc-100 px-2 py-1">PostgreSQL</span>.
            </p>
            <p className="text-lg text-zinc-600 mt-4 max-w-xl mx-auto">
              Currently exploring AI, backend systems, DSA and making things that matter.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink 
              to="/projects"
              className="bg-black text-white px-8 py-4 font-medium text-lg hover:bg-zinc-800 transition-colors duration-200"
            >
              View Projects
            </NavLink>
            
            <a 
              href="https://www.linkedin.com/in/gourav-saha-ju/"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black border-2 border-black px-8 py-4 font-medium text-lg hover:bg-zinc-50 transition-colors duration-200"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          <NavLink 
            to="/projects" 
            className="bg-white border-2 border-black p-6 text-center hover:bg-zinc-50 transition-colors duration-200 group"
          >
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-bold text-black mb-1">Projects</h3>
            <p className="text-zinc-600 text-sm">Explore my latest work</p>
          </NavLink>

          <NavLink 
            to="/blogs" 
            className="bg-white border-2 border-black p-6 text-center hover:bg-zinc-50 transition-colors duration-200 group"
          >
            <div className="text-2xl mb-2">✍️</div>
            <h3 className="font-bold text-black mb-1">Blog</h3>
            <p className="text-zinc-600 text-sm">Read my thoughts</p>
          </NavLink>

          <a 
            href="https://github.com/Gouravsaha12" 
            target="_blank"
            rel="noreferrer"
            className="bg-white border-2 border-black p-6 text-center hover:bg-zinc-50 transition-colors duration-200 group"
          >
            <div className="text-2xl mb-2">🔗</div>
            <h3 className="font-bold text-black mb-1">GitHub</h3>
            <p className="text-zinc-600 text-sm">View my code</p>
          </a>
        </div>

        {/* Skills Section */}
        <div className="mt-16 bg-white border-2 border-black p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['React', 'FastAPI', 'PostgreSQL', 'Python', 'JavaScript', 'Tailwind', 'Node.js', 'Git'].map((tech) => (
              <div key={tech} className="bg-zinc-100 border-2 border-zinc-300 p-3 text-center">
                <span className="font-medium text-zinc-800">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home