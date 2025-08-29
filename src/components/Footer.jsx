import React from 'react'
import { NavLink } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-zinc-50 border-t-2 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:justify-between">
          
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <NavLink 
              to="/" 
              className="text-xl sm:text-2xl font-bold text-black hover:text-zinc-700 transition-colors duration-200"
            >
              gourav
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <NavLink 
              to="/" 
              className="text-zinc-800 font-medium hover:text-black transition-colors duration-200"
            >
              Home
            </NavLink>
            <NavLink 
              to="/projects" 
              className="text-zinc-800 font-medium hover:text-black transition-colors duration-200"
            >
              Projects
            </NavLink>
            <NavLink 
              to="/blogs" 
              className="text-zinc-800 font-medium hover:text-black transition-colors duration-200"
            >
              Blogs
            </NavLink>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://github.com/Gouravsaha12" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/gourav-saha-ju/" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:gouravsaha123098@gmail.com"
              className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t-2 border-zinc-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-sm text-center sm:text-left">
              © 2024 Gourav Saha. Built with React & Tailwind CSS.
            </p>
            <div className="flex items-center gap-4 text-sm text-zinc-600">
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer