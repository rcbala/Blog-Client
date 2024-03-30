import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMsessage] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
    
    const handleAddBlog = async (e) => {
      e.preventDefault();
      if (!title || !description) {
        setError("* Fields Are Mandatory");
        setTimeout(() => {
          setError("");
        },2000)
        return;
      }
      setLoading(true);
      setError("");
      setSuccessMsessage("");
      console.log("Before setting success message");
        

        const newBlog = {
            title,
            description,
        }

      try {
              setApiLoading(true)
              const res = await fetch("https://capstone-1-vpgi.onrender.com/blog/notes/create/blog", {
                method: "POST",
                body: JSON.stringify(newBlog),
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": token,
                },
              });
              if (!res.ok) {
                 throw new Error("Failed To Add Blog")
              }
              const data = await res.json();
              setuserBlog([...userBlog, data.data]);
              setLoading(false);
              setTitle("");
              setDescription("");
              setSuccessMsessage("Blog Added Successfully!"); 
              setTimeout(() => {
                setSuccessMsessage("");
              },5000)
              console.log("successfuly added");

              // navigate("/")


            } catch (error) {
              setError(error.message || "Failed To Add Blog");
              setTimeout(() => {
                setError("");
              },2000)
             
              
      }
      finally {
                setLoading(false);
        setApiLoading(false)           
        
      }
      if (apiLoading) {
         return<LoadingPage />
     }
     
  }
          
            
  return (
  <div>
   
    <div className="row d-flex justify-content-center">
      <h2  className="d-flex align-items-center justify-content-center Edit-Content">add blog</h2>
      <Form className="mb-3 col-lg-6">
        <Form.Group controlId="formTitle" className="mt-5 mb-3">
                     <h2 className='mb-2 Edit-Content'> title:</h2>

          <Form.Control
            type="text"
            value={title}
            placeholder="Add Titile *"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
                     <h2 className='mb-2 Edit-Content'> description:</h2>

          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            placeholder="Add Description *"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <div className="mt-2">
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && (
          <Alert variant="success">
            {successMessage}
          </Alert>
          )}
          </div>
        <Button className="mt-4" variant="primary" type="submit" onClick={handleAddBlog} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Create"}
        </Button>
      </Form>
      </div>
      </div>
  );
};

export default AddBlog;
