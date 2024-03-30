

import React from 'react';
import { Navbar, Nav, Container,Dropdown} from 'react-bootstrap';
import './Navbar.css';
import images from "../images/download.jpeg"
import { Link, useNavigate } from 'react-router-dom';

const BlogNavbar = (props) => {

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/Login")
  }
    return (



    <Navbar  bg="white" variant="light" expand="lg" className='Blog-MyNavbar sticky-top'>
      <Container>
        <Navbar.Brand as={Link } to="/" className=" custom-nav-head">BLOG APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav">
              <Nav.Link as={Link } to="/" className="custom-nav-link">Home</Nav.Link>
             
             </Nav>
                        <Nav className='ms-auto'>
                        <Dropdown >
                        
              <Dropdown.Toggle id="dropdown-custom" className="custom-dropdown-toggle">
                <img src={images} alt="Dropdown" className="rounded-circle dropdown-image" />
                            </Dropdown.Toggle>
                                <Dropdown.Header className="nav-link1">My Account</Dropdown.Header>
              <Dropdown.Menu className="custom-dropdown-menu">
                  <Dropdown.Item as={Link } to="/User" className="custom-nav-link1">ACCOUNT</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/Add/Blog" className="custom-nav-link1">ADD BLOG</Dropdown.Item>
                   <Dropdown.Item as={Link} to="/" className="custom-nav-link1">HOME</Dropdown.Item>
                  <Dropdown.Item  onClick={handleLogout } className="custom-nav-link2">LOG OUT</Dropdown.Item>
               
              </Dropdown.Menu>
            </Dropdown>
                         </Nav> 
         
       
     
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
};

export default BlogNavbar;