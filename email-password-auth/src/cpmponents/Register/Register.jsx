import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleEmailChange = (e) => {
    //console.log(e.target.value);
    //setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    //console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("")
    setError("")
    const password = e.target.password.value;
    const email = e.target.email.value;
    console.log(password, email);
    if(!/(?=.*[A-Z])/.test(password)){
        setError("Invalid password.Password must be a uppercase")
        return
    }
    else if(/(?=.*[0-9].*[0-9])/.test(password)){
        setError("Password should be at least 2 numbers")
        return
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("")
        e.target.reset();
        setSuccess("User created successfully");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setSuccess("");
      });
  };
  return (
    <div className="mx-auto w-50">
      <h2>Please Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-50 mb-4 mt-2 rounded"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          required
        />
        <br />
        <input
          className="w-50 mb-4 rounded"
          onBlur={handlePasswordChange}
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          required
        />
        <br />
        <p className="text-danger">{error}</p>
        <input className="btn btn-primary" type="submit" value="register" />
        <p>Already have an account? Please <Link to="/login">Login</Link></p>
        <p className="text-success">{success}</p>
      </form>
    </div>
  );
};

export default Register;
