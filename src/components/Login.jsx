import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Row } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
 import './Login.css';
import { Link, useNavigate } from 'react-router-dom';




const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {

    const payload = {
      email,
      password,
    };
    const res = await fetch("http://localhost:3000/blog/user/login", {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      },
     
    });
    const data = await res.json();
    if (data.token) {
      setErrorMessage(" ");
      localStorage.setItem('token', data.token);
      navigate("/");
    }
    else {
       setErrorMessage(data.error)
    }


    //   try {
    
  //     const response = await axios.post('http://localhost:3000/blog/user/login', {
  //       email,
  //       password,
  //     });

  //     const { token } = response.data;
  //     localStorage.setItem('token', token);

  //     navigate('/')

      
  //   } catch (error) {
  //     setErrorMessage('invalid username(or)wrong password');
  //   }
  };

    return (

      <Container className="d-flex align-items-center justify-content-center vh-50vh Login_form">
      <Form className="text-center">
        <h2 className='Login' >Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Control className='input'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className='input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button onClick={handleLogin} variant="success">
          <FaUser /> Login
          </Button>
          <p className="mt-3 forgot">
            
         <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </Form>
        </Container>
        
  );
};

export default Login;
