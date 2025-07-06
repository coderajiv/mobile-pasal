import React from 'react';
import { NavLink } from 'react-router';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className="text-blue-600 hover:underline">Home</NavLink>
        <NavLink to="/logout" className="text-red-600 hover:underline">Logout</NavLink>
      </nav>
    </div>
  );
}
