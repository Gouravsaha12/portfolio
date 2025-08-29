// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block w-full px-4 py-3 font-medium transition-colors duration-200 ${
      isActive
        ? "bg-black text-white"
        : "text-zinc-800 hover:bg-zinc-100 hover:text-black"
    }`;

  const desktopLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition-colors duration-200 ${
      isActive
        ? "bg-black text-white"
        : "text-zinc-800 hover:bg-zinc-100 hover:text-black"
    }`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-zinc-50 border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Desktop & Mobile Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="text-xl sm:text-2xl font-bold text-black hover:text-zinc-700 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gourav
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {/* Navigation Links */}
            <div className="flex items-center gap-1 mr-6">
              <NavLink to="/" className={desktopLinkClass}>
                Home
              </NavLink>
              <NavLink to="/projects" className={desktopLinkClass}>
                Projects
              </NavLink>
              <NavLink to="/blogs" className={desktopLinkClass}>
                Blogs
              </NavLink>
            </div>

            {/* Desktop Auth Section */}
            <div className="flex items-center gap-3 pl-6 border-l-2 border-zinc-300">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-black">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/32"}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-800">
                        {user.displayName || "User"}
                      </span>
                      {isAdmin && (
                        <span className="text-xs font-bold text-zinc-600">
                          ADMIN
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="bg-white text-black border-2 border-black px-4 py-2 text-sm font-medium hover:bg-zinc-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                /* Login Button */
                <button
                  onClick={loginWithGoogle}
                  className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-black hover:bg-zinc-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-zinc-200 bg-white">
            <div className="py-4 space-y-1">
              {/* Mobile Navigation Links */}
              <NavLink
                to="/"
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/projects"
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </NavLink>
              <NavLink
                to="/blogs"
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </NavLink>

              {/* Mobile Auth Section */}
              <div className="pt-4 mt-4 border-t-2 border-zinc-200">
                {user ? (
                  <div className="px-4 space-y-3">
                    {/* Mobile User Info */}
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-10 h-10 border-2 border-black">
                        <img
                          src={user.photoURL || "https://via.placeholder.com/40"}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-black">
                          {user.displayName || "User"}
                        </div>
                        {isAdmin && (
                          <div className="text-xs font-bold text-zinc-600">
                            ADMIN
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Mobile Logout Button */}
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-white text-black border-2 border-black px-4 py-3 font-medium hover:bg-zinc-100 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  /* Mobile Login Button */
                  <div className="px-4">
                    <button
                      onClick={() => {
                        loginWithGoogle();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-black text-white px-4 py-3 font-medium hover:bg-zinc-800 transition-colors duration-200"
                    >
                      Login with Google
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;