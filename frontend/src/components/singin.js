import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../css/signup.css";

// 

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  // form submit

  const LoginUser = async (e) => {
    try {
      e.preventDefault();
      // stop the form from reloading the page
      const data = {
        email: email,
        password: password,
      };
      console.log(data);
      await axios
        .post("http://localhost:5000/users/api/login", data)
        .then((res) => {
          if (res.data.token) {
            console.log(res);

            var token = res.data.token;
            console.log(token);
            localStorage.setItem("token", token);
            localStorage.setItem("userID", res.data.user._id);
            window.location.replace("/");
          }
          setEmail("");
          setPassword("");
          res.data.success === true
            ? toast.success(res.data.message)
            : toast.error(res.data.message);
          // setSuccess(true);
        });
    } catch (err) {
      if (err === "  Request failed with status code 401") {
        toast.info("please verify your email address");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-form ">
        <form action="" method="" id="loginForm">
          <h3 className="fs-3 fw-semibold">Hi! Welcome in FundGator</h3>
          <p className="hint-text">
            Get Login with your social media account or email address
          </p>
          <div className="social-btn text-center">
            <a href="#" className="btn btn-primary btn-lg">
              <i className="fa fa-linkedin" /> LinkedIn
            </a>

            <a href="#" className="btn btn-danger btn-lg">
              <i className="fa fa-google" /> Google
            </a>
          </div>
          <div className="or-seperator">
            <b>or</b>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control input-lg"
              id="email"
              name="email"
              placeholder="Email Address"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control input-lg"
              id="password"
              name="password"
              placeholder="Password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group"></div>
          <div className="form-group text-center  ">
            <button
              type="submit"
              className="btn btn-success btn-lg  btn-block signup-btn w-75 "
              id="loginBtn"
              onClick={LoginUser}
            >
              Sign In
            </button>
            <br />
            <h5 className="btn btn-border-0 mt-2 text-info  ">
              Forgot password?
            </h5>
          </div>
        </form>
        <div className="text-center">
          New to FundGator? <Link to="/signup">SingUp here</Link>
        </div>
      </div>
    </>
  );
}
