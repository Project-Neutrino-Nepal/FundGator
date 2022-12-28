import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "./wrapper/ContactPage";

const ContactPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validate = () => {
    if (
      firstName === "" &&
      lastName === "" &&
      email === "" &&
      title === "" &&
      message === ""
    ) {
      toast.error("All fields are Required.");
      return false;
    }
    if (firstName === "") {
      toast.error("First Name is required");
    }
    if (lastName === "") {
      toast.error("Last Name is required");
    }
    if (email === "") {
      toast.error("Email is required");
    } else if (!regex.test(email)) {
      toast.error("Email is invalid");
      return false;
    }
    if (title === "") {
      toast.error("Title is required");
    }
    if (message === "") {
      toast.error("Message is required");
    }
    return true;
  };

  // form submit

  const ContactAdmin = async (e) => {
    // stop the form from reloading the page
    e.preventDefault();

    const data = {
      f_name: firstName,
      l_name: lastName,
      email: email,
      title: title,
      message: message,
    };
    if (validate()) {
      try {
        await axios
          .post("http://localhost:5000/users/api/contact-us", data)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message);
              setTimeout(function () {
                window.location.href = "/";
              }, 2000);
            } else {
              toast.error(res.data.message);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Wrapper className="  w-100 d-block d-lg-flex gap-5 justify-content-between px-3 ps-md-5 px-md-0 ">
      <ToastContainer />
      <section className="left-container container col-lg-4  d-flex flex-column justify-content-center aligin-center ">
        <h1>Contact us</h1>
        <p className="fw-bold fs-6 text-dark">
          Our friendly team would love to hear fromyou
        </p>
        <form className="needs-validation " novalidate>
          <div className="d-flex gap-2 w-100">
            <div className="mb-3 w-100">
              <label for="validationTooltip01" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control rounded-0 "
                id="validationTooltip01"
                placeholder="John"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div class="valid-feedback">Looks good!</div>
              <div id="validationTooltip01" class="invalid-feedback">
                Enter Your First Name.
              </div>
            </div>
            <div className="mb-3 w-100">
              <label for="validationTooltip02" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="validationTooltip02"
                placeholder="Doe"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <div id="validationTooltip02" class="invalid-feedback">
                Enter Your Last Name.
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label for="validationTooltip03" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="validationTooltip03"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="validationTooltip03" class="invalid-feedback">
              Enter Your Email.
            </div>
          </div>
          <div className="mb-3">
            <label for="validationTooltip04" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="validationTooltip04"
              placeholder="Account Re-activation"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <div id="validationTooltip04" class="invalid-feedback">
              Enter Title
            </div>
          </div>
          <div class="mb-3">
            <label
              for="exampleFormControlTextarea5"
              class="form
                -label"
            >
              Message
            </label>
            <textarea
              class="form-control rounded-0"
              id="exampleFormControlTextarea5"
              rows="3"
              placeholder="Enter Message"
              required
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div id="exampleFormControlTextarea5" class="invalid-feedback">
              Enter Message/Query
            </div>
          </div>
          <button
            className="btn btn-primary fw-bold w-100 rounded-2 bg-opacity-50"
            style={{ backgroundColor: "#0A4FA3" }}
            type="submit"
            onClick={ContactAdmin}
          >
            Send Message
          </button>
        </form>
      </section>
      <section className="right-container col-lg-6 m-5 m-lg-0 ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31397712412!2d85.3261328!3d27.708960349999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1672134947018!5m2!1sen!2snp"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="userlocation"
        ></iframe>
      </section>
    </Wrapper>
  );
};

export default ContactPage;
