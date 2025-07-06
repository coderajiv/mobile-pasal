import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import AuthPage from './Components/authentication/AuthPage';
import ProtectedRoute from './Components/Layout/ProtectedRoute';
import Homepage from './Components/Dashboard/Homepage';
import Dashboard from './Components/Dashboard/Dashboard';
import Contact from './Components/Dashboard/Contact';
import Logout from './Components/authentication/Logout';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        {/* Public route - AuthPage handles login/signup */}
        {!isLoggedIn && (
          <Route path="/*" element={<AuthPage onLogin={() => setIsLoggedIn(true)} />} />
        )}

        {/* Protected routes */}
        {isLoggedIn && (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Logout onLogout={() => setIsLoggedIn(false)} />
                </ProtectedRoute>
              }
            />
          </>
        )}

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/"} replace />} />
      </Routes>
      {isLoggedIn && <Footer />}
    </>
  );
}
