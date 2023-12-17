import React, { useState } from 'react';
import './style/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8888/api/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const responseBody = await response.text();
      console.log('Response Body:', responseBody);

      if (!response.ok) {
        // Handle non-success status codes
        console.error('Request failed with status:', response.status);
        setError('Invalid username or password.');
        return;
      }

      // Parse the response body as JSON only once
      const data = JSON.parse(responseBody);

      if (data.success) {
        // Login successful, redirect based on user role
        console.log('Login successful');

        if (data.isAdmin) {
          // Redirect to the admin page
          navigate('/admin');
        } else {
          // Redirect to the user page
          navigate('/users');
        }
      } else {
        console.error('Login failed:', data.message);
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="login-main">
      <div className="login-center">
        <div className="login-image"></div>
        <div className="loginTOP">
          <div className="login-logo"></div>
          <div className="login-title">
            <h1 className="register-h1">LOGIN</h1>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="inputFI">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="inputFI2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="buttonss">
              <button type="submit" className="button1">
                LOGIN
              </button>
            </div>
            <div className="loginB"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
