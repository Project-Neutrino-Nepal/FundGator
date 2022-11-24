import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import {
  BankandCards,
  Cash,
  Notification,
  Portfolio,
  Settings,
  TaxDocument,
  Watchlist,
} from "./component";
import tabs from "./utils/tabs";
import Wrapper from "./wrapper/ProfilePage";

const ProfilePage = () => {
  const options = {
    dropdown: false,
    tab: "tax document",
    activeindex: 0,
  };
  const [activeindex, setActive] = useState(1);
  const [dropdown, setDropdown] = useState(false);
  const [image, setPreview] = useState({
    preview: "https://github.com/mdo.png",
    file: "",
  });

  const closedropdown = (text, index) => {
    setActive(index);
    setDropdown(false);
  };

  const editprofile = () => {
    setActive(6);
  };

  const onuploadimg = (e) => {
    console.log(e.target.value);
    setPreview({ ...image, file: e.target.files[0] });
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function () {
        setPreview({ ...image, preview: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const { id } = useParams();
  useEffect(() => {
    if (id === "Portoflio") {
      setActive(1);
    } else if (id === "Cash") {
      setActive(2);
    } else if (id === "BankCards") {
      setActive(3);
    } else if (id === "TaxDocuments") {
      setActive(4);
    } else if (id === "Watchlist") {
      setActive(5);
    } else if (id === "Settings") {
      setActive(6);
    } else if (id === "Notifications") {
      setActive(7);
    }
  }, []);
  const [name, setName] = useState("");

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // fetching Profile data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile/api/my-profile", config)
      .then((res) => {
        let program = res.data.profile;
        setName(program.name);
      });
  });

  return (
    <Wrapper>
      <section className="infocontainer mt-5">
        <div className="userinfo">
          <div className="edit-img">
            <img
              src={image.preview}
              alt="profile_avatar"
              className="rounded-circle "
            />
            <div className="upload-img">
              <input
                type="file"
                name=""
                id=""
                className="file-upload"
                onChange={onuploadimg}
              />
              <AiFillEdit className="icon" />
            </div>
          </div>
          <div className="info">
            <h5>{name}</h5>

            <p onClick={editprofile}>Edit Profile</p>
          </div>
        </div>

        <p
          className="dropdown"
          onClick={() => setDropdown((dropdown) => !dropdown)}
        >
          {tabs.map((item, index) => {
            return (
              <span
                className={activeindex === item.id ? "tabs active" : "d-none"}
                key={item.id}
              >
                {item.text}
              </span>
            );
          })}
          <RiArrowDropDownLine className={dropdown ? "icon active" : "icon "} />
        </p>

        <div className={dropdown ? "tab-container2 active" : "tab-container2"}>
          {tabs.map((item, index) => {
            return (
              <Link
                to={`/profile/${item.text}`}
                className={activeindex === item.id ? "tabs active" : "tabs"}
                key={item.id}
                onClick={() => closedropdown(item.text, item.id)}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
      </section>

      <section className={dropdown ? "tab-container active" : "tab-container"}>
        {tabs.map((item, index) => {
          return (
            <Link
              to={`/profile/${item.text}`}
              className={activeindex === item.id ? "d-none" : "tabs"}
              key={item.id}
              onClick={() => closedropdown(item.text, item.id)}
            >
              {item.text}
            </Link>
          );
        })}
      </section>

      <section className="content">
        {activeindex === 1 ? <Portfolio /> : null}
        {activeindex === 2 ? <Cash /> : null}
        {activeindex === 3 ? <BankandCards /> : null}
        {activeindex === 4 ? <TaxDocument /> : null}
        {activeindex === 5 ? <Watchlist /> : null}
        {activeindex === 6 ? <Settings /> : null}
        {activeindex === 7 ? <Notification /> : null}
      </section>
    </Wrapper>
  );
};

export default ProfilePage;
