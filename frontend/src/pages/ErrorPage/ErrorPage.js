import React from "react";
import robot from "../../assets/image/robot.jpg";
import bt from "../../assets/image/button.png";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex pt-5"
      style={{ height: "100vh", backgroundColor: "white" }}
    >
      <div className="container d-flex pt-5">
        <section className="left-container col-lg-6 p-5 ">
          <h1 className="fw-bold display-3 m-0">404</h1>
          <p className="fw-bold fs-3 m-0">OooPs!</p>
          <p className="fw-bold fs-3 m-0">Page Not Found</p>
          <p className="fs-5 m-0 text-black-50 ">
            This page doesn't exist or was removed!
          </p>
          <p className="fs-5 text-black-50">We suggest your back to home</p>
          <img src={bt} alt="" role="button" onClick={() => navigate(-1)} />
        </section>
        <section className="right-container col-lg-6 d-none d-md-flex">
          <img src={robot} alt="" srcset="" />
        </section>
      </div>
    </div>
  );
};
export default ErrorPage;