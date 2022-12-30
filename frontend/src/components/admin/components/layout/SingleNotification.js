import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Wrapper from "../wrapper/Header";
import { AiFillDelete } from "react-icons/ai";
import  { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const SingleNotification = () => {
  const [dropdown, setdropdown] = useState(false);
  const [isdelete, setdelete] = useState(false);
  const ondelete = (e) => {
    e.stopPropagation();
    setdelete(true);
    console.log("delete");
  };

  const [addCompany, setAddCompany] = useState([]);
  useEffect(() => {
    //listens for the company list from the backend
    socket.on("sendMessage-admin1", (company) => {
      console.log(company);
      setAddCompany(company);
    });
  
  },);
  console.log(addCompany);

  return (
    <Wrapper className={!isdelete ? "notify w-100 p-2 rounded-2" : "d-none"}>
      {addCompany.map((company) => (
        <div  className="d-flex aligin-items-center w-100 gap-2 notify-items">
          <img src={company.image} alt="" srcset="" width={70} height={70} />
          <p>{company.companyName} has been added to the list of companies</p>
          <div
            className="position-relative notify-edit d-flex flex-column text-nowrap  text-center align-items-center justify-content-center"
            width={70}
          >
            <p style={{ zIndex: "1" }}>1h</p>
            <BsThreeDots
              className="icon"
              onClick={() => setdropdown((prev) => !prev)}
            />

            <div
              className={
                dropdown
                  ? "droplst position-absolute bottom-0 start-0 bg-white shadow-sm"
                  : "d-none"
              }
            >
              <div
                className="d-flex align-items-center droplst-item  bg-opacity-100 gap-2"
                onClick={ondelete}
              >
                <AiFillDelete className="text-black-50 " />
                <div className="d-flex flex-column text-start op  w-100">
                  <p className="fw-bold ">Delete</p>
                  <p>Delete this Notification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Wrapper>
  );
};

export default SingleNotification;
