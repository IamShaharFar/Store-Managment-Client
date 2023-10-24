import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login({setIsLogged}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.includes("@")) {
      alert("Please provide a valid email.");
      return;
    }

    try {
      const token = await loginUser(email, password);
      console.log("Token:", token);
      if(token){
          alert("Login successful!");
          setIsLogged(true);
          navigate('/'); 
      }else{
        alert("login failed")
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
        if(token){
            alert("Login successful!");
            console.log("Token:", token);
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('tokenTimestamp', Date.now().toString());
        }else{
          alert("login failed")
        }


        // Handle the successful login, e.g., navigate to a different page or update the UI

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


  return (
    <div className="login">
      {/* Add other input fields as needed */}
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
