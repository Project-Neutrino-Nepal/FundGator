import axios from "axios";
import React, { useState } from "react";
import Wrapper from "./wrapper/WelcomePage";

const WelcomePage = () => {
  const [legalName, setLegalName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [skills, setSkills] = useState("");

  const UpdateProfiles = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    const data = {
      legal_name: legalName,
      country: country,
      address: address,
      bio: bio,
      website: website,
      skills: skills,
    };

    axios
      .put("http://localhost:5000/profile/api/update-profile", data, config)
      .then((response) => {
        alert("Profile Updated");
        window.location.assign("/Homepage")
        console.log(response.dataPost);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Wrapper>
      <form id="profileUpdate" style={{margin:'80px'}}>
        <div className="welcome mt-5">
          <h2 className="heading">Investor Information</h2>
          <p>
            To invest online, federal law requires that we collect some info
          </p>
          <div className="inputs m-2">
            <label  className="m-2"> LegalName:&nbsp;&nbsp;&nbsp; </label>
            <input className="p-1"
              type="text"
              placeholder="Enter Your Legal Name"
              id="legalName"
              value={legalName}
              onChange={(e) => {
                setLegalName(e.target.value);
              }}
            />
            <br />
            <label className="m-2"> Country:&nbsp;&nbsp;&nbsp; &emsp; &nbsp;</label>
            <input className="p-1"
              type="text"
              placeholder="Enter Your Country"
              id="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
            <br />
            <label className="m-2"> Address:&nbsp;&nbsp;&nbsp; &emsp; &nbsp;</label>
            <input className="p-1"
              type="text"
              placeholder="Enter Your Address"
              id="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>

          <p>
            To invest online, federal law requires that we collect some info
          </p>
          <button className="btn-increase">INCREASE MY $2,200 LIMIT</button>
          <section className="public">
            <h4 className="heading">Public Infomration</h4>
            <p>show founders </p>
            <div className="information">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                alt=""
              />
              <div className="inputs">
                <textarea
                  name=""
                  id="bio"
                  cols="30"
                  rows="10"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <input
                  type="text"
                  placeholder="personal weslite"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="add skills"
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn-continue"
              id="updateButton"
              onClick={UpdateProfiles}
            >
              SAVE & CONTINUE
            </button>
          </section>
        </div>
      </form>
    </Wrapper>
  );
};

export default WelcomePage;
