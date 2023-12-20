import React, { useState } from 'react';
import './style/Login.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Update the path accordingly

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser(); // Get the login function from the user context

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
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        // Handle non-success status codes
        console.error('Request failed with status:', response.status);
        setError('Invalid username or password.');
        return;
      }
  
      const data = await response.text(); // Read the response as text
  
      console.log('Raw response data:', data);
  
      // Split the concatenated JSON responses
      const jsonResponses = data.split('}{');
  
      // Process each JSON response separately
      jsonResponses.forEach((jsonData, index) => {
        // Reconstruct the JSON format
        if (index < jsonResponses.length - 1) {
          jsonData += '}';
        }
        if (index > 0) {
          jsonData = '{' + jsonData;
        }
  
        // Now try to parse the response as JSON
        try {
          const parsedData = JSON.parse(jsonData);
          console.log('Parsed JSON data:', parsedData);
  
          if (parsedData.success) {
            // Login successful, set user context
            console.log('Login successful');
            login({
              username: parsedData.username,
              role: parsedData.role,
            });
  
            // Redirect based on user role
            if (parsedData.isAdmin) {
              // Redirect to the admin page after setting the user context
              navigate('/admin');
            } else {
              // Redirect to the user page after setting the user context
              navigate('/users');
            }
          } else {
            console.error('Login failed:', parsedData.message);
            setError('Invalid username or password.');
          }
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          setError('An unexpected error occurred. Please try again later.');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
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