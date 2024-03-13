import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Button, Nav } from 'react-bootstrap';
import './NavBar.css'; 
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Navbar = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/Login")
  }
  return (
    <BootstrapNavbar  bg="dark"   className="mb-4 nav sticky-top">
      <BootstrapNavbar.Brand as={Link} to="/">
        <h2 className='logo'>Rc Tech</h2>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/Register">
          <h6 className='nav-link-hover'>Register</h6>  
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
              <h6  className='nav-link-hover'>Login</h6>
          </Nav.Link>
          <Nav.Link as={Link} to="/">
              <h6  className='nav-link-hover'>Home</h6>
          </Nav.Link>
          <Nav.Link as={Link} to="/Add/Blog">
              <h6  className='nav-link-hover'>AddBlog</h6>
          </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <h6  className='nav-link-hover'>Logout</h6>
          </Nav.Link>
        
          <Col xs={1} md={1}>
            <Nav.Link as={Link} to="/User">
              <Image src='' roundedCircle style={{ width: '40px' }} />
              </Nav.Link>
        </Col>
        </Nav>
      </BootstrapNavbar.Collapse>
    
    </BootstrapNavbar>
  );
};

export default Navbar;
