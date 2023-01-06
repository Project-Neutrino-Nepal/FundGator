import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import Wrapper from "./admin/components/wrapper/Header";

const InvestorNotification = () => {
  const [shownotification, setnotification] = useState([]);
  

   
  useEffect(() => {
    axios
      .get("http://localhost:5000/notification/api/get-verifynotification")
      .then((res) => {
        console.log(res.data.verifynotification);
        let data = res.data.verifynotification;
        setnotification(data);
      });
  }, []);

  // ?sort=updatedAt:desc
  return (
    <Wrapper
      className="notify w-100 p-2 rounded-2"
      style={{ height: "400px", overflowY: "scroll" }}
    >
      {shownotification.map((company) => (
        <div
          id="shownotification"
          className="d-flex shdow-sm border border-sm aligin-items-center w-100 gap-2 notify-items m-1"
        >
          <img
            src={company.company.image}
            alt=""
            srcset=""
            width={70}
            height={70}
          />

          {company.company.verified === true ? (
            <p>
              <span className="fs-6 fw-semibold">{company.company.name}</span>{" "}
              <br />
              has been verified, please explore the company!
            </p>
          ) : (
            <p>
              <span className="fs-6 fw-semibold">{company.company.name}</span>{" "}
              <br />
              has been rejected, please explore the company!
            </p>
          )}
          <div
            className="position-relative notify-edit mt-4  d-flex flex-column text-nowrap ms-4 ps-2"
            width={70}
          >
            <p style={{ zIndex: "1" }}>
              {" "}
              <Link to={`/company/${company.company._id}`}>
                <i className="fa-solid fa-eye text-info"></i>
              </Link>
              &emsp; {moment(company.company.updatedAt).fromNow()}
            </p>
          </div>
        </div>
      ))}

      {shownotification.length === 0 && (
        <div className="d-flex aligin-items-center w-100 gap-2 notify-items justify-content-center ">
          <p>No Notification</p>
        </div>
      )}
    </Wrapper>
  );
};

export default InvestorNotification;
