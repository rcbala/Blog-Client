import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert,Spinner } from 'react-bootstrap';
import { FaUserPlus,} from 'react-icons/fa'; 
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  

  const handleUserNameValid = (e) => {
    const UsernameValue = e.target.value;
    setUsername(UsernameValue);
    setUsernameValid(UsernameValue.trim().length > 0);
   
  };

  const handleEmailValid = (e) => {
    const UserEMail = e.target.value;
    setEmail(UserEMail);
    setEmailValid(UserEMail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/));
   
  };

  const handlePasswordValid = (e) => {
    const UserPassword = e.target.value;
    setPassword(UserPassword);
    setPasswordValid(UserPassword.length >= 6);
   
  };

  const ErrorTimeout = (errorMessage, timeout) => {
    
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage("");
    },timeout)
    
  }

  const handleSignup = async () => {
    

    if (!usernameValid) {
      ErrorTimeout("Please enter the username",2000)
    
      return;
    }
      
    if (!emailValid) {
     ErrorTimeout("Please Enter The Valid Email Address",2000)
      return;
    }

    if (!passwordValid) {
      ErrorTimeout("password must be 6 character or long",2000)
      return;
    }

    setLoading(true);
    try {
      
      const response = await axios.post('https://capstone-1-vpgi.onrender.com/blog/user/signup', {
        username, 
        email,
        password,
      });

        console.log(response.data);
        navigate('/Login')
      
    } catch (error) {
      ErrorTimeout('Error during signup. Please try again.',2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='Signup'>
      <Form className="text-center register-container">
        <h2 className="mb-4 SignUp text-center">signup</h2>
        <Form.Group controlId="formBasicUsername" className="input-group ">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
      
            onChange={handleUserNameValid}
                  />
                  
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="input-group">
        
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
           
            onChange={handleEmailValid}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="input-group">

          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            
            onChange={handlePasswordValid}
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {loading ? (
                    <Button variant="primary" className='signup-button' disabled={!usernameValid || !emailValid || !passwordValid || loading}>
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
                    <Button onClick={handleSignup} variant="primary" className='signup-button'>
                        <FaUserPlus /> Signup
                    </Button>
                )}
        
      <p className="mt-3 Login">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
