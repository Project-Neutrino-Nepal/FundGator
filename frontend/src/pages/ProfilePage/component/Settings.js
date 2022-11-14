import React from "react";
import Wrapper from "../wrapper/Setting";
const Settings = () => {
  return (
    <Wrapper>
      <div className="left-container">
        <p>Account</p>
        <p>Investor Limits</p>
        <p>Publice Profile</p>
        <p>Public Profile</p>
      </div>
      <div className="right-container">
        <section className="account"></section>
        <section className="investorinfo">

        </section>
        <section className="investorlimit"></section>
        <section className="publicprofile"></section>

      </div>
    </Wrapper>
  );
};

export default Settings;
