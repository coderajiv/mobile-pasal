import React, { useCallback } from 'react';

export default function SignupForm({ onSignupSuccess }) {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target['confirm-password'].value;

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];

      if (users.some((user) => user.email === email)) {
        alert('Email already registered. Please login.');
        return;
      }

      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));

      alert('Signup successful! Please login.');

      if (typeof onSignupSuccess === 'function') {
        onSignupSuccess();
      }
    },
    [onSignupSuccess]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
      />
      <input
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        type="password"
        id="confirm-password"
        name="confirm-password"
        placeholder="Confirm Password"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
