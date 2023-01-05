import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/signup.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validate = () => {
    if (email === "" && password === "") {
      toast.error("All fields are Required.");
      return false;
    }
    if (email === "") {
      toast.error("Email is required");
    } else if (!regex.test(email)) {
      toast.error("Email is invalid");
      return false;
    }

    if (password === "") {
      toast.error("Password is required");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };
  // login with linkedIn

  // login with google

  function heandelLogin(response) {
    if (response.credential) {
      console.log(response.credential);
      var userObject = jwt_decode(response.credential);
      console.log(userObject);
      LoginUser(userObject);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "333233854581-6m8c1bgpvs06pvs668dn8lcl636ljre5.apps.googleusercontent.com",
      callback: heandelLogin,
    });
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.log("Login with Google is not available");
      }
    });

    // button click
    google.accounts.id.renderButton(document.getElementById("googleButton"), {
      theme: "filled_blue",
      width: 250,
      height: 50,
      longtitle: true,
      type: "standard",
    });
  }, []);

  // form submit

  const LoginUser = async (userObject) => {
    console.log(userObject, "userObject");
    if (userObject) {
      const data = {
        email: userObject.email,
        name: userObject.name,
        googleId: userObject.sub,
        avatar: userObject.picture,
      };
      try {
        await axios
          .post("http://localhost:5000/users/api/google-login", data)
          .then((res) => {
            if (res.data.success) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("admin", res.data.user.admin);
              localStorage.setItem("userInfo", JSON.stringify(res.data));

              toast.success(
                res.data.message,
                setTimeout(function () {
                  if (res.data.user.admin === true) {
                    if (res.data.user.isFirstTime === true) {
                      window.location.href = "/welcome";
                      localStorage.setItem("token", res.data.token);
                    } else {
                      window.location.href = "/dashboard";
                      localStorage.setItem("token", res.data.token);
                      localStorage.setItem("id", res.data.user._id);
                      localStorage.setItem("admin", res.data.user.admin);
                    }
                  } else {
                    if (res.data.user.isFirstTime === true) {
                      window.location.href = "/welcome";
                      localStorage.setItem("token", res.data.token);
                    } else {
                      window.location.href = "/homepage";
                    }
                  }
                }, 2000)
              );
            }
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      const data = {
        email: email,
        password: password,
      };
      if (validate()) {
        try {
          await axios
            .post("http://localhost:5000/users/api/login", data)
            .then((res) => {
              if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("admin", res.data.user.admin);
                localStorage.setItem("userInfo", JSON.stringify(res.data));

                toast.success(
                  res.data.message,
                  setTimeout(function () {
                    if (res.data.user.admin === true) {
                      if (res.data.user.isFirstTime === true) {
                        window.location.href = "/welcome";
                        localStorage.setItem("token", res.data.token);
                      } else {
                        window.location.href = "/dashboard";
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("id", res.data.user._id);
                        localStorage.setItem("admin", res.data.user.admin);
                      }
                    } else {
                      if (res.data.user.isFirstTime === true) {
                        window.location.href = "/welcome";
                        localStorage.setItem("token", res.data.token);
                      } else {
                        window.location.href = "/homepage";
                      }
                    }
                  }, 2000)
                );
              }
            });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <>
      <div className="container-sm-fluid  bg-image mt-0 bg-white ">
        <ToastContainer />
        <div className="signup-form ">
          <form id="loginForm">
            <h3 className="fs-3 fw-semibold">Hi! Welcome in FundGator</h3>
            <p className="hint-text">
              Get Login with your social media account or email address
            </p>
            <div className="d-flex justify-content-center flex-wrap  social-btn text-center">
              <div>
                <a
                  className="btn btn-primary btn-lg ms-2 me-2"
                  onClick={() => {
                    window.location.href =
                      "http://localhost:5000/auth/linkedIn";
                  }}
                >
                  <i className="fa-brands fa-linkedin-in" />
                  LinkedIn
                </a>
              </div>
              <div id="googleButton"></div>
            </div>
            <div className="or-seperator">
              <b>or</b>
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
              <p className="btn btn-border-0 mt-2 text-primary fw-light ">
                <Link to="/reset-password">Forgot password?</Link>
              </p>
            </div>
          </form>
          <div className="text-center">
            New to FundGator? <Link to="/signup">SingUp here</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
