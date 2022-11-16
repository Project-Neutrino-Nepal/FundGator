import React, { useState, useEffect } from "react";
import Wrapper from "./wrapper/ProfilePage";
import tabs from "./utils/tabs";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  BankandCards,
  Cash,
  Notification,
  Portfolio,
  Settings,
  TaxDocument,
  Watchlist,
} from "./component";

import { Link, useParams } from "react-router-dom";
const ProfilePage = () => {
  const options = {
    dropdown: false,
    tab: "tax document",
    activeindex: 0,
  };
  const [activeindex, setActive] = useState(1);
  const [dropdown, setDropdown] = useState(false);
  const closedropdown = (text, index) => {
    setActive(index);
    setDropdown(false);
  };

  const editprofile = () => {
    setActive(6);
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
  return (
    <Wrapper>
      <section className="infocontainer">
        <div className="userinfo">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <div className="info">
            <h5>John Doe</h5>
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
