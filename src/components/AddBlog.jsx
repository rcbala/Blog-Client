import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddBlog = ({userBlog,setuserBlog}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login", { replace: true });
    }
  }, []);
    let token=localStorage.getItem("token")
  const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const handleAddBlog = async (e) => {
              e.preventDefault()
        const newBlog = {
            title,
            description,
        }

        const res = await fetch("https://capstone-1-vpgi.onrender.com/blog/notes/create/blog", {
            
            method: "POST",
            body: JSON.stringify(newBlog),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            }
        })
                console.log("datasend");
      navigate('/')    
      console.log("navigate from");
        const data = await res.json();
        if (!data.data) {
            console.log("error");
        } else {
            setuserBlog([...userBlog, data.data]);
        }
            
  }
          
            
  return (
    <div className="row d-flex justify-content-center">
      <h2  className="d-flex align-items-center justify-content-center Edit-Content">Add Blog</h2>
      <Form className="mb-3 col-lg-6">
        <Form.Group controlId="formTitle" className="mt-5 mb-3">
                     <h2 className='mb-2 Edit-Content'> Title:</h2>

          <Form.Control
            type="text"
            value={title}
            placeholder="Add Titile"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
                     <h2 className='mb-2 Edit-Content'> Description:</h2>

          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            placeholder="Add Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleAddBlog}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default AddBlog;
