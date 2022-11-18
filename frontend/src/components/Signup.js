import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  // on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmpassword);
    const data = {
      name,
      email,
      password,
    };

    if (password !== confirmpassword) {
      toast.error("Password does not match");
      return;
    }

    try {
      await axios
        .post("http://localhost:5000/users/api/register", data)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-form ">
        <form id="registerForm" action="" method="">
          <h3 className="fs-3 fw-semibold">Hi! Welcome in FundGator</h3>
          <p className="hint-text">
            Sign up with your social media account or email address
          </p>
          <div className="d-flex justify-content-center flex-wrap  social-btn text-center">
            <div>
               <a href="#" className="btn btn-primary btn-lg ms-2 me-2">
              <i className="fa fa-linkedin" /> LinkedIn
            </a>
            </div>
            <div> <a href="#" className="btn btn-danger btn-lg ms-2 me-2">
              <i className="fa fa-google" /> Google
            </a>
            </div>

           

            
          </div>
          <div className="or-seperator">
            <b>or</b>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control input-lg"
              name="name"
              placeholder="name"
              id="name"
              required="required"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control input-lg"
              name="email"
              placeholder="Email Address"
              id="email"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control input-lg"
              name="password"
              placeholder="Password"
              id="password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control input-lg"
              name="confirm_password"
              placeholder="Confirm Password"
              id="confirmpassword"
              required="required"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group text-center  ">
            <button
              type="submit"
              className="btn btn-success btn-lg  btn-block signup-btn w-50 "
              id="registerBtn"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account? <Link to="/signin">Login here</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
