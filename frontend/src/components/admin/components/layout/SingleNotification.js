import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Wrapper from "../wrapper/Header";
import { AiFillDelete } from "react-icons/ai";

const SingleNotification = () => {
  const [dropdown, setdropdown] = useState(false);
  const [isdelete, setdelete] = useState(false);
  const ondelete = (e) => {
    e.stopPropagation();
    setdelete(true);
    console.log("delete");
  };
  return (
    <Wrapper className={!isdelete ? "notify w-100 p-2 rounded-2" : "d-none"}>
      <div className="d-flex aligin-items-center w-100 gap-2 notify-items">
        <img
          src="https://i.pinimg.com/736x/81/24/86/812486fb48c7bb85068e85e3ac2048ce.jpg"
          alt=""
          srcset=""
          width={70}
          height={70}
        />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed commodi
          sapiente dolore?
        </p>
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
    </Wrapper>
  );
};

export default SingleNotification;
