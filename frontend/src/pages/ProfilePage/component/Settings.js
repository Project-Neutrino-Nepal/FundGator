import React, { useState } from "react";
import Wrapper from "../wrapper/Setting";
import UserInput from "./smallcomponent/UserInput";
const Settings = () => {
  const item = {
    email: "Dpa@gmail.com",
    Phone:"12345678910",
    Birthday:"",
    Nationality:"",
  };

  const [formvalue, setform] = useState(item);
  const onsave = ({ name, value }) => {
    setform({ ...formvalue, [name]: value });
    console.log("saved");
  };
  return (
    <Wrapper>
      <div className="left-container">
        <p>Account</p>
        <p>Investor Limits</p>
        <p>Publice Profile</p>
        <p>Public Profile</p>
      </div>
      <div className="right-container">
        <section className="account">
          <h1>Account</h1>
          <UserInput
            name={"email"}
            value={formvalue.email}
            question={"whats your email"}
            onsave={onsave}
            type={"email"}
            placeholder={"Enter Your Email"}
          />
          <div className="passwordreset hover">
            <span>Password</span>
            <span>Reset</span>
          </div>
          <div className="btn-delete hover">
            <span>Delete Account</span>
          </div>
        </section>
        <section className="investorinfo">
          <h4>Investorinfo</h4>
          <UserInput
            name={"Phone"}
            value={formvalue.Phone}
            question={"whats your PhoneNumber ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter your PhoneNumber"}
          />

          <UserInput
            name={"Birthday"}
            value={formvalue.Birthday}
            question={"whats your Birthday ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"mm//dd//yyyy"}
          />

          <UserInput
            name={"Nationality"}
            value={formvalue.Nationality}
            question={"Contry of Nationality ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter you Nationality"}
          />
        </section>
        <section className="investorlimit"></section>
        <section className="publicprofile"></section>
      </div>
    </Wrapper>
  );
};

export default Settings;
