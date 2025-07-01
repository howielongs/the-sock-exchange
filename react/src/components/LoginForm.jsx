import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();         // Get login() from context
  const navigate = useNavigate();      // For redirecting
  const location = useLocation();      // To remember where user came from

  // If they were redirected from another page, this will store it
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate(from, { replace: true });  // Go back to original page or home
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
