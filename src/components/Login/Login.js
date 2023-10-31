import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginLogo from "./logo/loginlogo.png";
import "./Login.css";

function Login({ setIsLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.includes("@")) {
      alert("Please provide a valid email.");
      return;
    }

    try {
      const token = await loginUser(email, password);
      console.log("Token:", token);
      if (token) {
        setIsLogged(true);
        navigate("/");
      } else {
        alert("login failed");
      }
      // Handle the successful login, e.g., navigate to a different page or update the UI
    } catch (error) {
      console.error("Login error:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  async function loginUser(email, password) {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: email,
        password: password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("tokenTimestamp", Date.now().toString());
      } else {
        alert("login failed");
      }

      return token;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Invalid credentials");
      } else {
        alert("Server error");
      }
      console.error("Error logging in:", error);
      return null;
    }
  }

  const togglePasswordVisibility = (show) => {
    if (passwordRef.current) {
      passwordRef.current.type = show ? "text" : "password";
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <img src={loginLogo} alt="Store" className="store-image" />
        <h1>Store Manager Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              ref={passwordRef} // Attach the ref
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className="fas fa-eye"
              onMouseEnter={() => togglePasswordVisibility(true)}
              onMouseLeave={() => togglePasswordVisibility(false)}
            ></i>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
