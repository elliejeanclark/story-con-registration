import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginPage() {

    const { login } = useAuth(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="app">
        <div className="body">
          <h1 className="page-title"> Register for Adorable Petite Dino's! </h1>
          <h5>Please Login or Sign Up to Get Started!</h5>
          <div id="forms">
            <form id="login-form">
              <p className="login-form-text">Returning User? Login Here!</p>
              <div className="form-group" id="form-field">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Your Email Here"/>
              </div>
              <div className="form-group" id="form-field">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Your Password Here"/>
              </div>
              <button id="login-button" type="submit" className="btn btn-primary" onClick={login}>Login</button>
              <p className="login-form-text">New here? Sign up below!</p>
              <Link to="/signup">
                <button id="signup-button" type="submit" className="btn btn-primary">Sign Up</button>
              </Link>
            </form>
            <form>
            </form>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;