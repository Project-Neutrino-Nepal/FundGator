import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      // stop the form from reloading the page
      const data = {
        email: email,
      };
      console.log(data);
      await axios
        .put("http://localhost:5000/users/api/reset-password", data)
        .then((res) => {
          if (res.data.success === true) {
            alert("Password Reset Link Sent to Your Email");
            window.location.replace("/signin");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="form-fileds d-flex bg-white   justify-content-between "
      style={{ height: "100vh" }}
    >
      <section className="left-container col-12 col-lg-6    ">
        <form className=" container col-lg-8  bg-white  mt-5 " noValidate>
          <h1 className="fw-bolder pt-5">Don't Worry</h1>
          <p className=" text-black-50  fw-bold ">
            We are here to help you recover your password. Enter the email
            address you used when you joined and we'll send you instructions to
            reset your password.
          </p>
          <div className="my-3" controlId="formGridContent">
            <label htmlFor="emailid">Email</label>
            <input
              className="form-control rounded-0"
              placeholder="Enter Valid Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between  ">
            <div
              className="d-flex gap-2 fs-5 align-items-center "
              role={"button"}
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack />
              Back
            </div>
            <button
              type="submit"
              className="my-3 btn btn-primary rounded-1"
              onClick={ResetPassword}
            >
              Reset Password
            </button>
          </div>
        </form>
      </section>

      <section className="right-container d-none h-100  d-lg-flex col-lg-5 bg-danger justify-content-end  ">
        <img
          src="https://images.unsplash.com/photo-1520322082799-20c1288346e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwyNTQxMjQ0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-100 h-100"
          height={670}
          style={{ objectFit: "cover" }}
        />
      </section>
    </div>
  );
}

export default ResetPassword;
