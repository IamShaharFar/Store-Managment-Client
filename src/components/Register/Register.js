import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !userName) {
      alert('Please fill out all fields.');
      return;
    }
    if (!email.includes('@')) {
      alert('Please provide a valid email.');
      return;
    }

    try {
        const response = await axios.post("http://localhost:3000/auth/register", {
            username: userName,
            email: email,
            password: password,
        });

        if (response.status === 201) {
            alert('Registration successful!');
        } else {
            alert('Error registering. Please try again.');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            alert('User already exists.');
        } else {
            alert('Server error. Please try again later.');
        }
    }
};

  return (
    <div className="register">
      {/* Add other input fields as needed */}
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type='text' placeholder='User Name'onChange={(e) => setUserName(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
