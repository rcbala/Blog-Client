import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css"
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import HOME from './components/Home';
import User from './components/User';
import AddBlog from './components/AddBlog';
import EditBlog from './components/EditBlog';



const APP = (props) => {
 
  const [userBlog, setuserBlog] = useState([]);
  return (
    <BrowserRouter >
      <NavBar />
    
         
      <Routes>
        <Route path='/Login' element = {<Login />}></Route>
        <Route path='/Register' element = {<Register />}></Route>
        <Route path='/' element = {<HOME />}></Route>
        <Route path='/User' element={<User
          userBlog={userBlog}
          setuserBlog={setuserBlog}
        />}></Route>
        <Route path='/Add/Blog' element={<AddBlog
           userBlog={userBlog}
          setuserBlog={setuserBlog}
          
        />}></Route>
        <Route path='/Edit/Blog' element={<EditBlog
           userBlog={userBlog}
          setuserBlog={setuserBlog}
        />}></Route>
      

      </Routes>      
    
    
    </BrowserRouter>
  );
};

export default APP;