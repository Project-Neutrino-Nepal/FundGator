import axios from "axios";
import React, { useState, useEffect } from "react";

import Wrapper from "../wrapper/Setting";
import UserInput from "./smallcomponent/UserInput";

//backend integration of profile page
function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");

  const [formvalue, setform] = useState();
  const onsave = ({ name, value }) => {
    setform({ ...formvalue, [name]: value });
    console.log("saved");
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => { 
    axios.get("http://localhost:5000/profile/api/my-profile",config).then((res) => {
      const profile = res.data.profile;
      setform(profile);
      setEmail(profile.email);
      setBio(profile.bio);
      setCountry(profile.country)
      setName(profile.legal_name);
      
    });
  }, [formvalue]);



 
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
              value={email}
              question={"whats your Email?"}
              onsave={onsave}
              type={"email"}
              placeholder={email}
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
              name={"Legal Name"}
              value={name}
              question={"whats your Name ?"}
              onsave={onsave}
              type={"text"}
              placeholder={name}
            />
            <UserInput
              name={"bio"}
              value={bio}
              question={"Share your bio?"}
              onsave={onsave}
              type={"text"}
              placeholder={bio}
            />

            <UserInput
              name={"country"}
              value={country}
              question={"Contry of country?"}
              onsave={onsave}
              type={"text"}
              placeholder={country}
            />
          </section>
          <section className="investorlimit"></section>
          <section className="publicprofile"></section>
        </div>
      </Wrapper>
    );
  }

  


export default Settings;
