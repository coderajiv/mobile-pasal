import React, { useState, useEffect } from 'react';

function AuthPage({ onLogin }) {
  const [currentView, setCurrentView] = useState('login');
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load users and login state on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  // On successful login
  const handleLogin = (user) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setIsLoggedIn(true);
    if (onLogin) onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        {/* Tabs only show if not logged in */}
        {!isLoggedIn && (
          <div className="flex mb-8 border-b-2 border-gray-200">
            <button
              onClick={() => setCurrentView('login')}
              className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 ${
                currentView === 'login'
                  ? 'text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentView('signup')}
              className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 ${
                currentView === 'signup'
                  ? 'text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Views */}
        {isLoggedIn ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">Welcome!</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        ) : currentView === 'login' ? (
          <LoginForm switchView={setCurrentView} onLogin={handleLogin} users={users} />
        ) : (
          <SignupForm switchView={setCurrentView} users={users} setUsers={setUsers} />
        )}

        {/* Optional debug */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-xs">
          <p className="font-semibold mb-2">Registered users:</p>
          {users.length === 0 ? (
            <p className="text-gray-500">No users registered yet</p>
          ) : (
            users.map((user, i) => (
              <div key={i} className="mb-1">
                <span className="text-blue-600">{user.email}</span> - {user.fullName || 'No name'}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// LoginForm component
function LoginForm({ switchView, onLogin, users }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage('');

    // Fake delay to simulate async call
    await new Promise((res) => setTimeout(res, 500));

    const user = users.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (user) {
      setMessage('Login successful!');
      onLogin(user);
    } else {
      setMessage('Invalid email or password.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

      <input
        type="email"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      {message && (
        <div
          className={`p-3 text-center font-medium rounded-lg ${
            message.includes('successful') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        Don&apos;t have an account?{' '}
        <span
          onClick={() => switchView('signup')}
          className="text-blue-600 cursor-pointer underline hover:text-blue-800"
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

// SignupForm component
function SignupForm({ switchView, users, setUsers }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    if (users.some((u) => u.email.trim().toLowerCase() === email.trim().toLowerCase())) {
      setMessage('Email already registered.');
      setIsSubmitting(false);
      return;
    }

    // Simulate async
    await new Promise((res) => setTimeout(res, 500));

    const newUser = { fullName, email: email.trim().toLowerCase(), password };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setMessage('Account created! Redirecting to login...');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setTimeout(() => switchView('login'), 1500);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
      />

      <input
        type="email"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <input
        type="password"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />

      {message && (
        <div
          className={`p-3 text-center font-medium rounded-lg ${
            message.includes('created') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        Already have an account?{' '}
        <span
          onClick={() => switchView('login')}
          className="text-blue-600 cursor-pointer underline hover:text-blue-800"
        >
          Log in
        </span>
      </p>
    </div>
  );
}

export default AuthPage;
