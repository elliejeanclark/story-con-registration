import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignupPage from './signup/SignupPage.jsx';
import LoginPage from './login/Login.jsx';
import BookTicketsPage from './bookTickets/BookTickets.jsx';
import ViewTicketInfo from './viewTicketInfo/ViewTicketInfo.jsx';
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
            <li>
              <Link to="/book-tickets" className="nav-link">Book Tickets</Link>
            </li>
            <li>
              <Link to="/view-ticket-info" className="nav-link">View Ticket Info</Link>
            </li>
          </menu>
        </nav>
      </header>

      {/* Body (Dynamic Content based on Route) */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/book-tickets" element={<BookTicketsPage />} />
        <Route path="/view-ticket-info" element={<ViewTicketInfo />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Made by Elinor Clark 2025</p>
      </footer>
    </div>
  );
}

export default App;