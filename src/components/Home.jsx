import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './Home.css'
import Footer from './Footer';

const Home = (props) => {
    const [blog, setBlog] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/Login",{replace: true})
        }
        let token = localStorage.getItem("token");
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/blog/notes/all", {
                method: "GET",
                headers: {
                    "x-auth-token": token,
                },
            });
            const data = await res.json();
            if (!data.data) {
                console.log("error", data.error);
                
            } else {
                setBlog(data.data);
            }
        };
        fetchData();
        
    }, [])
    
    return (

       
        <div >
        {blog && (
          <div>  
      {blog?.map((data) => (
        <Card className='col-lg-6  home-container'  key={data._id}>
          <Card.Body>
            <Card.Title><h2 className='title'>{data.title}:</h2></Card.Title>
            <Card.Text><p className='description'>{data.description }</p></Card.Text>
                  <Card.Text><h6 className='username'>Posted By:{data.user.username}</h6></Card.Text>
                <Card.Text><p className='date'>{data.date }</p></Card.Text>

          </Card.Body>
        </Card>
      ))
                    }
                </div>
                
            )}
            <div>
                <Footer/>
            </div>

        </div>
       
    );
};  

export default Home;