import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignupPage from './signup/SignupPage.jsx';
import LoginPage from './login/Login.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="navbar navbar-expand-lg" id="head-nav">
          <menu className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
          </menu>
        </nav>
      </header>

      {/* Body (Dynamic Content based on Route) */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Made by Elinor Clark 2025</p>
      </footer>
    </div>
  );
}

export default App;