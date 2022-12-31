import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Wrapper from "../wrapper/Header";
import { AiFillDelete, AiFillEyeInvisible } from "react-icons/ai";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const SingleNotification = () => {
  const [dropdown, setdropdown] = useState(false);

  const [addCompany, setAddCompany] = useState([]);
  useEffect(() => {
    //listens for the company list from the backend
    socket.on("sendMessage-admin1", (company) => {
      console.log(company);
      setAddCompany(company);
    });
  });
  console.log(addCompany);

  return (
    <Wrapper
      className="notify w-100 p-2 rounded-2"
      style={{ height: "400px", overflowY: "scroll" }}
    >
      {addCompany.map((company) => (
        <div className="d-flex aligin-items-center w-100 gap-2 notify-items ">
          <img src={company.image} alt="" srcset="" width={70} height={70} />
          <p>{company.companyName} 
          has been added to the list of companies</p>
          <div
            className="position-relative notify-edit d-flex flex-column text-nowrap  text-center align-items-center justify-content-center"
            width={70}
          >
            <p style={{ zIndex: "1" }}>1h</p>
          </div>
        </div>
      ))}
    </Wrapper>
  );
};

export default SingleNotification;
