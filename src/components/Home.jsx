import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './Home.css'
import Footer from './Footer';
import LoadingPage from './LoadingPage';

const Home = (props) => {
    const [blog, setBlog] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/Login", { replace: true })
        }
        let token = localStorage.getItem("token");
          const fetchData = async () => {
        try {
            const res = await fetch("https://capstone-1-vpgi.onrender.com/blog/notes/all", {
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
                
            }  } catch (error) {
               console.error("Error fetching data",data.error)
        } finally {
            setLoading(false)
        }
      
            
          
        };
        fetchData();
        
    }, []);

    if (loading) {
         return<LoadingPage />
     }
    
    return (

       
        <div >
        {blog && (
          <div>  
      {blog?.map((data) => (
        <Card className='col-lg-6  home-container'  key={data._id}>
          <Card.Body>
            <Card.Title><h2 className='title'>{data.title}:</h2></Card.Title>
            <Card.Text><p className='description'>{data.description }</p></Card.Text>
                  <Card.Text><h6 className='username'>posted by:{data.user.username}</h6></Card.Text>
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