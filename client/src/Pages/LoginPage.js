// LoginPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP } from "../Routes/Routes";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here
    alert("Sorry, this feature is not available right now! CI pvt ltd.");
    console.log(`Login with username: ${username} and password: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login To CurioFit</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">Email Id</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div className="login-footer">
        Don't have an account? <Link to={SIGNUP} className="signupLink">Sign Up</Link>
      </div>
        </form>
      </div>
      
    </div>
  );
};

export default LoginPage;