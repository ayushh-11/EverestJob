import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900  text-white text-sm font-bold p-2.5 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-lg font-bold text-white sm:hidden">Everest Job</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <a
          href="#"
          onClick={() => scrollToSection('home')}
          className="hover:text-gray-400 transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="#catalogue"
          onClick={() => scrollToSection('catalogue')}
          className="hover:text-gray-400 transition-colors duration-200"
        >
          Category
        </a>
        <a
          href="#explore"
          onClick={() => scrollToSection('explore')}
          className="hover:text-gray-400 transition-colors duration-200"
        >
          Vacancy
        </a>
      </div>

      {/* Actions (Search & Cart) */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer font-semibold"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;