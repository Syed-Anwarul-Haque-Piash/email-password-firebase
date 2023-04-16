import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth=getAuth(app)
const Login = () => {
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("");

   const handleLogin=(e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email,password);
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        setError("string has two uppercase letters")
        return
    }
    else if(!/(?=.*[0-9].*[0-9])/.test(password)){
        setError("string has two digits.")
        return
    }
    signInWithEmailAndPassword(auth ,email, password)
   .then(result=>{
    const loggedUser=result.user;
    console.log(loggedUser)
    setSuccess("user login successful")
    setError("")
   })
   .catch(error=>{
    setError(error.message)
   })
   }
   

  return (
    <div className="mx-auto w-50 mt-5">
      <h2>Please Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" required
           />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Accept terms and condition" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p>Are you new user? Please <Link to="/register">Register</Link></p>
      <p className="text=danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
