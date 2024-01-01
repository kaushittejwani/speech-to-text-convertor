import React from 'react';
import { useState } from 'react';
import Login from './login';
import Container from './Container';
import Header from './Header';
import "./Login.css"

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [data, setData] = useState(null);

  async function registerUser(event) {
    console.log("hy1")
    event.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });
    console.log("hy2")
    const result = await response.json();
    console.log(result);
    console.log("hy3")
    if (name && email && phone && password) {
      setIsRegistered(true);
      setData(result);
    }

    setPhone('');
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div>
      <Header/>
      {data ? (
        <div>
          <Container data={data} />
        </div>
      ) : (
        <div className="box-form">
          <form onSubmit={registerUser} className="right">
            <h1>Registration Form</h1>
            <label>Name</label>&nbsp;
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" /><br /><br />

            <label>Email</label>&nbsp;
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /><br /><br />

            <label>Phone</label>&nbsp;
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone no" /><br /><br />

            <label>Password</label>&nbsp;
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" /><br /><br />
            <button type="submit">Register</button>
          </form>

          <div className="left">
            <div className="overlay">
              <h2>REGISTRAION FORM</h2>
              <span>
                <h2>NOW YOU SPEAK I WRITE FOR YOU</h2>
                <h2>EXPLORE THE NEW WAY TO SAVE NOTES</h2>
                <h2>REGISTER NOW</h2>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
