// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Admin from './Admin';
import Newuser from './Newuser';
import User from './Users';
import { UserProvider } from './UserContext'; // Import UserProvider

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/newuser" element={<Newuser />} />
            <Route path="/users" element={<User />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
