import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper/UserProfilePage";

const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [createdDate, setCreatedDate] = useState("");

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
        console.log(res.data.profile);
        let program = res.data.profile;
        setName(program.name);
        setEmail(program.email);
        setBio(program.bio);
        setAddress(program.address);
        setSkills(program.skills);
        setCreatedDate(program.createdAt);
      });
  });

  return (
    <Wrapper>
      <div className="left-container">
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="profilepic"
        />
        <h2>{name}</h2>

        <Link to="Settings" className="btn-edit">
          edit profile
        </Link>
        <div className="info">
          <h4>Personal Information</h4>
          <div className="info-data">
            <div className="data">
              <h5>Email</h5>
              <p>{email}</p>
            </div>
            <div className="data">
              <h5>Bio</h5>
              <p>{bio}</p>
            </div>
            <div className="data">
              <h5>Address</h5>
              <p>{address}</p>
            </div>
          </div>

          <h5>Member since</h5>
          <p>{createdDate}</p>
        </div>
      </div>

      <div className="right-container">
        <h1>interested in..</h1>
        <p>{skills}</p>

        <h1>company</h1>
        <p></p>
      </div>
    </Wrapper>
  );
};

export default UserProfilePage;
