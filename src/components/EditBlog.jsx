import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Home.css'


const EditBlog = ({ userBlog, setuserBlog }) => {
  const navigate = useNavigate();
   let token=localStorage.getItem("token")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading,setLoading]=useState(false)
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError,setValidationError]=useState(false)
  console.log(userBlog);
    let [state]=useSearchParams()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login", { replace: true });
    }
    userBlog.map((data,index) => {
      if (index == state.get("index")) {
        setTitle(data.title)
        setDescription(data.description)
        setId(data._id)
      }   
    })
  }, []);
   
  const handleEditBlog = async (e) => {
       
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      setValidationError(true);
      setErrorMessage("Please Fill in all fields");
      return;
     }
    setLoading(true)
    setValidationError(false)
        const newBlog = {
            title,
            description,
    }
     try {
       const res = await fetch(`https://capstone-1-vpgi.onrender.com/blog/notes/update/blog/${id}`, {
            
            method: "PUT",
            body: JSON.stringify(newBlog),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            }
        })
           navigate('/User')

        const data = await res.json();
    
        if (!data.data) {
            console.log("Error updating blog");
        } else {
          setuserBlog([...userBlog, data.data]);
         
        }
     } catch (error) {
       console.error("Error Updating blog",error)
     } finally {
        setLoading(false)
     }

       
    }
    return (
        <div className="row d-flex justify-content-center">
      <h2 className="d-flex align-items-center justify-content-center Edit-Content">edit blog</h2>
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
             <h2 className='mb-2 Edit-Content'> description:</h2>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            placeholder="Add Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          </Form.Group>
          {validationError && <Alert variant='danger'>{errorMessage}</Alert>}
               <Button
            variant="primary"
            className='mt-4'
          onClick={handleEditBlog}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" role="status" /> Updating
            </>
          ) : (
            "Update"
          )}
        </Button>
      </Form>
    </div>
    );
};

export default EditBlog;

