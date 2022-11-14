import React, { useState } from "react";
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
const ProfilePage = () => {
  const options = {
    dropdown: false,
    tab: "tax document",
    activeindex: 0,
  };
  const [activeindex, setActive] = useState(1);
  const [dropdown, setDropdown] = useState(false);
  const [tab, setTab] = useState("tax document");
  const tablist = tabs.filter((item) => item.text !== tab);
  const closedropdown = (text, index) => {
    setActive(index);
    setTab(text);
    setDropdown(false);
  };
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
            <p>Edit Profile</p>
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
              <span
                className={activeindex === item.id ? "tabs active" : "tabs"}
                key={item.id}
                onClick={() => closedropdown(item.text, item.id)}
              >
                {item.text}
              </span>
            );
          })}
        </div>
      </section>

      <section className={dropdown ? "tab-container active" : "tab-container"}>
        {tablist.map((item, index) => {
          return (
            <span
              className={activeindex === index ? "tabs active" : "tabs"}
              key={item.id}
              onClick={() => closedropdown(item.text, item.id)}
            >
              {item.text}
            </span>
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
