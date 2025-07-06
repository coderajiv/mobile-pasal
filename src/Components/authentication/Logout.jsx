import React from 'react';
import { useNavigate } from 'react-router';

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out!');
    onLogout(); // Update App state
    navigate('/login');
  };

  return (
    <div className="p-4 text-center">
     
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}
