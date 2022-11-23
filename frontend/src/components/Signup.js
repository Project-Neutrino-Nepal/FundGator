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

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validate = () => {
    if (name === "") {
      toast.error("Please fill all the fields");
      return false;
    }

    if (name === "") {
      toast.error("Name is required");
      return false;
    }
    if (email == "") {
      toast.error("Email is required");
    } else if (!regex.test(email)) {
      toast.error("Email is invalid");
      return false;
    }

    if (password === "") {
      toast.error("Password is required");
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (confirmpassword === "") {
      toast.error("Confirm Password is required");
      return false;
    }
    if (password !== confirmpassword) {
      toast.error("Password and Confirm Password must be same");
      return false;
    }
    return true;
  };

  // on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    if (validate()) {
      try {
        await axios
          .post("http://localhost:5000/users/api/register", data)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message,
              setTimeout(function(){ window.location.assign("/signin")}, 2000 ));
            }
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-form mt-5">
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
            <div>
              {" "}
              <a href="#" className="btn btn-danger btn-lg ms-2 me-2">
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
              placeholder="Name"
              id="name"
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
