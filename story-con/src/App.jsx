import React from 'react';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';
import './App.css';

function App() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div className="app">
      {isLoggedIn ? (
        <div>
          <header className="header">
            <nav className="navbar navbar-expand-lg" id="head-nav">
              <menu className="navbar-nav">
                <li className="nav-item">
                  Home
                </li>
                <li className="nav-item">
                  Update Data
                </li>
                <li className="nav-item">
                  Get Data
                </li>
              </menu>
            </nav>
          </header>
          <div className="body">
            <h1 className="page-title"> This website hasn't really been implemented yet. So...Thanks for stopping by I guess. 😛 </h1>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      ) : (
        <div>
          <header className="header">
            <nav className="navbar navbar-expand-lg" id="head-nav">
              <menu className="navbar-nav">
                <li className="nav-item">
                  Home
                </li>
              </menu>
            </nav>
          </header>
          <div className="body">
            <h1 className="page-title"> Welcome to the Story-Con Registration Access! </h1>
            <p>Please Login to access Registration Information.</p>
            <form id="login-form">
              <div className="form-group" id="form-field">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Your Email Here"/>
              </div>
              <div className="form-group" id="form-field">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Your Password Here"/>
              </div>
              <button id="login-button" type="submit" className="btn btn-primary" onClick={login}>Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Root;

