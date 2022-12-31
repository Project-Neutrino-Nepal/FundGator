import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper/Header";
import { io } from "socket.io-client";
import axios from "axios";
import { Button } from "antd";

const socket = io("http://localhost:5000");

const SingleNotification = () => {
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
    setAddCompany(shownotification);
    // make load more button disappear
    document.getElementById("loadmore").style.display = "none";
  };

  useEffect(() => {
    //listens for the company list from the backend through socket io
    socket.on("sendMessage-admin1", (company) => {
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
            <div className="d-flex aligin-items-center w-100 gap-2 notify-items m-1">
              <img
                src={company.image}
                alt=""
                srcset=""
                width={70}
                height={70}
              />
              <p>
                {company.name}
                has been added to the list of companies
              </p>
              <div
                className="position-relative notify-edit d-flex flex-column text-nowrap  text-center align-items-center justify-content-center"
                width={70}
              >
                <p style={{ zIndex: "1" }}>1h</p>
              </div>
            </div>
          ))
        : shownotification.map((company) => (
            <div className="d-flex aligin-items-center w-100 gap-2 notify-items m-1">
              <img
                src={company.company.image}
                alt=""
                srcset=""
                width={70}
                height={70}
              />
              <p>
                {company.company.name}
                has been added to the list of companies
              </p>
              <div
                className="position-relative notify-edit d-flex flex-column text-nowrap  text-center align-items-center justify-content-center"
                width={70}
              >
                <p style={{ zIndex: "1" }}>1h</p>
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

export default SingleNotification;
