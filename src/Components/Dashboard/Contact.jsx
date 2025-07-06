import React from 'react';

export default function Contact() {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 font-sans">
      <div className="bg-white/95 rounded-2xl shadow-2xl px-12 py-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">Contact me</h1>
        <p className="text-gray-800 mb-8">
         Feel free to reach out to me for any inquiries, collaborations, or just to say hello! I'm always open to new opportunities and connections.
        </p>
        <a
          href="mailto:rajivdhungana38@gmail.com"
          className="inline-block px-6 py-2 bg-indigo-500 text-white rounded-lg font-bold transition-colors duration-200 hover:bg-purple-700"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}
