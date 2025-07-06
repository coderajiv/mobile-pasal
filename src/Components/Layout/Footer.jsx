import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex-1 flex justify-center md:justify-center mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} Web App. All rights reserved.</p>
        </div>
        <div className="flex-1 flex justify-end space-x-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-600">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
