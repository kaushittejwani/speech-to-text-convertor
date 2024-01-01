
import './App.css';
import { Link, Routes, useState } from 'react-router-dom'
import Register from './Register';
import Login from './login';
import { BrowserRouter, Route } from 'react-router-dom';
import Container from './Container';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Register />}>Register</Route>
          <Route path="/login" exact element={<Login />}>login</Route>
          <Route path="/container" exact element={<Container/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;