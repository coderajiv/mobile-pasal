import React from 'react';
import { Link } from 'react-router';

export default function Homepage() {
  return (
    <>
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Homepage</h1>
      
     
     
      <Link to="/dashboard" className="text-blue-500 underline">Go to Dashboard</Link>
    </div>
    </>
  );
}
