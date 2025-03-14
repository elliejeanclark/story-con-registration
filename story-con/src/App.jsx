import React from 'react';
import { AuthProvider } from './AuthContext';
import './App.css';

function App() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <AuthProvider>
      <div className="app">
        {isLoggedIn ? (
          <header className="header">
            <p>This website hasn't really been implemented yet. So...Thanks for stopping by I guess. 😛</p>
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
    </AuthProvider>
  );
}

export default App;
