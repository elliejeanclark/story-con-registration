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
          <div class="body">
            <h1 class="page-title"> This website hasn't really been implemented yet. So...Thanks for stopping by I guess. 😛 </h1>
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
          <div class="body">
            <h1 class="page-title"> Welcome to the Story-Registration Access! </h1>
            <p>Login to access registration information.</p>
            <button onClick={login}>Login</button>
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

