import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert,Spinner } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
 import './Login.css';
import { Link, useNavigate } from 'react-router-dom';




const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const ErrorTimeout = (errorMessage,timeout) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage("")
    },timeout)
  }

  const handleLogin = async () => {
    if (!email) {
      ErrorTimeout("Please Enter The Email!",2000)
      return;
    }
    if (!password) {
     ErrorTimeout("Please Enter The password!",2000)
    }
    setLoading(true);
    try {
      
          const payload = {
      email,
      password,
    };
    const res = await fetch("https://capstone-1-vpgi.onrender.com/blog/user/login", {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      },
     
    });
    const data = await res.json();
    if (data.token) {
      ErrorTimeout(" ");
      localStorage.setItem('token', data.token);
      navigate("/");
    }
    else {
       ErrorTimeout(data.error,2000)
    }
    } catch (error) {
      ErrorTimeout("Error During Login.",2000)
    } finally {
      setLoading(false)
    }
   

  };

    return (

      <Container className="d-flex align-items-center justify-content-center  Login_form">
      <Form className="text-center">
        <h2 className='Login' >LOGIN</h2>
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
         {loading ? (
          <Button variant="success" className='login-button' disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>
        ) : (
          <Button onClick={handleLogin} variant="success" className='login-button mt-4'>
            <FaUser /> Login
          </Button>
          )
          }
             <p className="mt-3 signup-here">
          you don't have Account? <Link to="/Register">Signup here</Link>
        </p>
      </Form>
        </Container>
        
  );
};

export default Login;
