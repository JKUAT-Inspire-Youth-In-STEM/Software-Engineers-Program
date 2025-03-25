import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [signupMessage, setSignupMessage] = useState<string | null>(null);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signup"
            element={<SignUp setSignupMessage={setSignupMessage} />}
          />
          <Route
            path="/signin"
            element={<SignIn onLogin={handleLogin} signupMessage={signupMessage} />}
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard token={token} onLogout={handleLogout} /> : <Navigate to="/signin" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;