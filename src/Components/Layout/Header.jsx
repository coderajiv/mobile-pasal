import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { FaSun, FaMoon } from 'react-icons/fa';


export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
    if (saved) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      setDarkMode(true);
    }
  };

  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">Web app</h1>
      <nav className="space-x-4 flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"
          }
        >
          Contact
        </NavLink>
        <NavLink to="/logout" className="hover:text-red-400">
          Logout
        </NavLink>
        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition"
          aria-label="Toggle dark mode"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </nav>
    </header>
  );
}
