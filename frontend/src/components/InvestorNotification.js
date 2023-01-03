import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper/Header";
import { io } from "socket.io-client";
import axios from "axios";
import { Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const socket = io("http://localhost:5000");

const InvestorNotification = () => {
  const [shownotification, setnotification] = useState([]);
  const [addCompany, setAddCompany] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/notification/api/get-notification")
      .then((res) => {
        console.log(res.data.notification);
        let data = res.data.notification;
        setnotification(data);
      });
  }, []);

  //  when the load more button is clicked then get the remove the data form addCompany and and set the addCompany by the shownotification data
  const loadmore = () => {
    setAddCompany([]);
    // hide the addCompany div
    document.getElementById("addcompany").classList.add("d-none ");

    // display the value of shownotification instead of addCompany
    document.getElementById("shownotification").classList.display = "block";

    // hide the load more button
    document.getElementById("loadmore").style.display = "none";
  };

  useEffect(() => {
    //listens for the company list from the backend through socket io
    socket.on("sendMessage-investor1", (company) => {
      console.log(company);
      setAddCompany(company);
    });
  });

  // get notification from backend through api

  return (
    <Wrapper
      className="notify w-100 p-2 rounded-2"
      style={{ height: "400px", overflowY: "scroll" }}
    >
      {/* if addCompany then map add company else map setnotificaton */}
      {addCompany.length > 0
        ? addCompany.map((company) => (
            <div
              id="addcompany"
              className="d-flex shadow-sm aligin-items-center w-100 gap-2 notify-items m-1"
            >
              <img
                src={company.image}
                alt=""
                srcset=""
                width={70}
                height={70}
              />
              <p>
                {company.companyName} <br />
                has been added to the list of companies
              </p>
              <div
                className="position-relative notify-edit mt-4  d-flex flex-column text-nowrap ms-4 ps-2"
                width={70}
              >
                <p style={{ zIndex: "1" }}>
                  {" "}
                  <Link
                    to={`/dashboard/company-details/${company.companyID}`}
                  >
                    <i className="fa-solid fa-eye text-info"></i>
                  </Link>
                  &emsp; <small> {moment(company.date).fromNow()}</small>
                 
                </p>
              </div>
            </div>
          ))
        : shownotification.map((company) => (
            <div
              id="shownotification"
              className="d-flex shadow-sm aligin-items-center w-100 gap-2 notify-items m-1"
            >
              <img
                src={company.company.image}
                alt=""
                srcset=""
                width={70}
                height={70}
              />
              <p>
                {company.company.name} <br />
                has been added to the list of companies
              </p>
              <div
                className="position-relative notify-edit mt-4  d-flex flex-column text-nowrap ms-4 ps-2"
                width={70}
              >
                <p style={{ zIndex: "1" }}>
                  {" "}
                  <Link
                    to={`/dashboard/company-details/${company.company._id}`}
                  >
                    <i className="fa-solid fa-eye text-info"></i>
                  </Link>
                  &emsp; {moment(company.company.date).fromNow()}
                </p>
              </div>
            </div>
          ))}
      {addCompany.length > 0 && (
        <div className="d-flex aligin-items-center justify-content-center w-100 gap-2 notify-items ">
          <Button id="loadmore" onClick={loadmore}>
            Load more...
          </Button>
        </div>
      )}
      {shownotification.length === 0 && (
        <div className="d-flex aligin-items-center w-100 gap-2 notify-items ">
          <p>No Notification</p>
        </div>
      )}
    </Wrapper>
  );
};

export default InvestorNotification;
