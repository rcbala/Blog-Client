import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FaUserPlus,} from 'react-icons/fa'; 
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://capstone-1-vpgi.onrender.com/blog/user/signup', {
        username, 
        email,
        password,
      });

        console.log(response.data);
        navigate('/Login')
      
    } catch (error) {
      setErrorMessage('Error during signup. Please try again.');
    }
  };

  return (
    <Container className='Signup'>
      <Form className="container">
        <h2 className="mb-4 SignUp">Signup</h2>
        <Form.Group controlId="formBasicUsername" className="input-group ">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
                  />
                  
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="input-group">
        
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="input-group">

          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button onClick={handleSignup} variant="primary">
          <FaUserPlus /> Signup
              </Button> 
      <p className="mt-3 Login">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
