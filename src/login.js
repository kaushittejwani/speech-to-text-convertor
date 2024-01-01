import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import Header from './Header';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const userData = await response.json();

    if (userData) {
      setData(userData);
      alert(response)
    }else{
      setEmail('');
      setPassword('');
    }

    alert("login successfully");
    setEmail('');
    setPassword('');
  }

  useEffect(() => {}, [email]); // You can add logic here if needed

  return (
    <div>
      {data ? (
        <div>
          <Container data={data} />
        </div>
      ) : (
        <div>
          <Header />
          <div className="box-form">
            <div className="left">
              <div className="overlay">
                <h1>Login Form</h1>
                <span>
                  <p>Your awesome login page content goes here!</p>
                </span>
              </div>
            </div>
            <div className="right">
              <h5>Login</h5>
              <p>More awesome login form content...</p>
              <div className="inputs">
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />

                <button type="submit" onClick={loginUser}>Login</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
