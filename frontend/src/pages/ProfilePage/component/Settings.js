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
  // const [website, setWebsite] = useState("");
  // const [tax_ID_No, setTax_ID_No] = useState("");
  // const [passport_No, setPassport_No] = useState("");
  // const [passport_Expiry, setPassport_Expiry] = useState("");
  // const [passport_Issue_country, setPassport_Issue_country] = useState("");
  // const [passport_Issue_date, setPassport_Issue_date] = useState("");
  // const [address, setAddress] = useState("");
  // const [status, setStatus] = useState("");
  // const [skills, setSkills] = useState("");
  // const [legal_name, setLegal_name] = useState("");
  // const [phone, setPhone] = useState("");


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
      // setWebsite(profile.website);
      // setTax_ID_No(profile.tax_ID_No);
      // setPassport_No(profile.passport_No);
      // setPassport_Expiry(profile.passport_Expiry);
      // setPassport_Issue_country(profile.passport_Issue_country);
      // setPassport_Issue_date(profile.passport_Issue_date);
      // setAddress(profile.address);
      // setStatus(profile.status);
      // setSkills(profile.skills);
      // setLegal_name(profile.legal_name);
      // setPhone(profile.phone);

      
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

          {/* <UserInput
            name={"TaxID"}
            value={tax_ID_No}
            question={"Whats your Tax Id ?"}
            onsave={onsave}
            type={"text"}
            placeholder={tax_ID_No}
          />
          <UserInput
            name={"passwordNo"} 
            name1={"passport_No"}
            name2={"pissuingcountry"}
            name3={"pissuedate"}
            value={passport_No}
            value1={passport_Issue_country}
            value2={passport_Issue_date}
            value3={passport_Expiry}
            onsave={onsave}
          /> */}
          </section>
          {/* <section className="investorlimit">
            <h4>Investor Limits</h4>
            <UserInput
            name={"AnnualIncome"}
            value={formvalue.AnnualIncome}
            question={"Whats your Annual Income ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter AnnualIncom"}
          />
          <UserInput
            name={"NetWorth"}
            value={formvalue.NetWorth}
            question={"Whats your NetWorth ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter NetWorth"}
          />
          </section> */}
          <section className="publicprofile"></section>
        </div>
      </Wrapper>
    );
  }

  


export default Settings;
