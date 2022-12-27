import React from "react";
import Wrapper from "./wrapper/ContactPage";
const ContactPage = () => {
  return (
    <Wrapper className="  w-100 bg-white d-block d-lg-flex gap-5 justify-content-between px-3 ps-md-5 px-md-0 ">
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
            />
            <div id="validationTooltip03" class="invalid-feedback">
              Enter Your Email.
            </div>
          </div>
          <div className="mb-3">
            <label for="validationTooltip04" className="form-label">
              PhoneNumber
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="validationTooltip04"
              placeholder="xxxxxxxxxx"
              required
            />
            <div id="validationTooltip04" class="invalid-feedback">
              Enter Your Phone Number.
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
            ></textarea>
            <div id="exampleFormControlTextarea5" class="invalid-feedback">
              Enter Message
            </div>
          </div>
          <button
            className="btn btn-primary fw-bold w-100 rounded-2 bg-opacity-50"
            style={{ backgroundColor: "#0A4FA3" }}
            type="submit"
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
