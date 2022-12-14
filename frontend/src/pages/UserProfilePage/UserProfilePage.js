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
  const [image, setPreview] = useState({
    preview: "https://github.com/mdo.png",
    file: "",
  });

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
        setPreview({ ...image, preview: program.avatar });

      });
  });

  return (
    <Wrapper>
      <div className="left-container"  id="ProfilePage" style={{color:'white'}}>
        <img
          src={image.preview}
          style={{ width: "155px", height: "155px" }}
          alt=""
          className="profilepic"
        />
        <h2 className="text-white">{name}</h2>

        <Link to="Settings" className="btn-edit">
          edit profile
        </Link>
        <div className="info" >
          <h4 className="text-white">Personal Information</h4>
          <div className="info-data " >
            <div className="data" >
              <h5 className="text-white">Email</h5>
              <p>{email}</p>
            </div>
            <div className="data " >
              <h5 className="text-white">Bio</h5>
              <p>{bio}</p>
            </div>
            <div className="data">
              <h5 className="text-white">Address</h5>
              <p>{address}</p>
            </div>
          </div>

          <h5 className="text-white">Member since</h5>
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
