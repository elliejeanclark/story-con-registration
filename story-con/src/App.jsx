import React from 'react';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';
import './App.css';

function App() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div className="app">
      {isLoggedIn ? (
        <header className="header">
          <h1>This website hasn't really been implemented yet. So...Thanks for stopping by I guess. 😛</h1>
          <button onClick={logout}>Logout</button>
        </header>
      ) : (
        <header className="header">
          <h1>Welcome to the Story-Registration Access!</h1>
          <p>Login to access registration information.</p>
          <button onClick={login}>Login</button>
        </header>
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

