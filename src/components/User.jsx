import React, { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Home.css";

const User = ({ userBlog, setuserBlog }) => {
  const navigate = useNavigate();
 
 
   let token = localStorage.getItem("token");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login", { replace: true });
    }
 
    const fetchUserData = async () => {
        
      const res = await fetch("https://capstone-1-vpgi.onrender.com/blog/notes/user/data", {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });
      const data = await res.json();
      if (!data.data) {
        console.log("error", data.error);
      } else {
        setuserBlog(data.data);
      }
    };
    fetchUserData();
  }, []);
    
    async function handleDelete(id) {
        
        const res = await fetch(`https://capstone-1-vpgi.onrender.com/blog/notes/delete/blog/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            }
        })
        const data = await res.json()
        const newUserBlog = userBlog.filter((data) => data._id !== id)
      setuserBlog([...newUserBlog]);
      if (res.ok) {
       toast.success("Blog Deleted Successfully")
      } else {
        toast.error("Failed to Blog Deleted")
        
      }
      
      console.log(data);

      
      
      
    }     
  
  return (
    <div>
      <ToastContainer/>
      <div>
        <h2 className="d-flex align-items-center justify-content-center User-Blog">
          USER BLOG
        </h2>
          <div className="d-flex align-items-center justify-content-center">
        <Button
          className=" col-lg-1 "
          variant="outline-primary"
          
          onClick={() => navigate("/Add/Blog")}
        >
          ADD Blog
          </Button>
          </div>
      </div>

      

      {userBlog && (
        <div>
          {userBlog?.map((data,index) => (
            <Card className="col-lg-6 mt-5 home-container" key={data._id}>
              <Card.Body>
                <Card.Title>
                  <h2 className="title">{data.title}:</h2>
                </Card.Title>
                <Card.Text>
                  {<p className="description">{data.description}</p>}
                </Card.Text>
                <Card.Text>
                  {<h6 className="username">Posted By:{data.user.username}</h6>}
                </Card.Text>
                <Card.Text>
                  <p className="date">{data.date}</p>
                </Card.Text>
              </Card.Body>
              <div className="mb-2  ">
                <div className="Button-User">
                          <Button
                              className="USER-Edit"
                              variant="outline-success"
                              onClick={()=>navigate(`/Edit/Blog?index=${index}`)}
                          >
                    Edit
                  </Button>
                          <Button
                              className="USER-Edit"
                              variant="outline-danger"
                              onClick={()=>handleDelete(data._id)}
                          >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
     
    </div>
  );
};

export default User;
