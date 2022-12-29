import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Company from "./Company";
import Wrapper from "./wrapper/UserProfilePage";

const UsersProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  let { id } = useParams();

  const [image, setPreview] = useState({
    preview:
      "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/totw_network_profile_400.jpg",
    file: "",
  });

  const [companies, setCompanies] = useState([]);
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // fetching Profile data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile/api/get-other-profiles/" + id, config)
      .then((res) => {
        let program = res.data.profile;
        setName(program.legal_name);
        setEmail(program.email);
        setBio(program.bio);
        setAddress(program.address);
        setSkills(program.skills);
        setCreatedDate(program.createdAt);
        setPreview({ ...image, preview: program.avatar });
      });
  });

  // fetching Company data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/get-company-by-user/"+ id, config)
      .then((res) => {
        let companies = res.data.company;
        setCompanies(companies);
      });
  });

  return (
    <Wrapper>
      <div
        className="left-container"
        id="ProfilePage"
        style={{ color: "white" }}
      >
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
        <div className="info">
          <h4 className="text-white">Personal Information</h4>
          <div className="info-data ">
            <div className="data">
              <h5 className="text-white">Email</h5>
              <p>{email}</p>
            </div>
            <div className="data ">
              <h5 className="text-white">Bio</h5>
              <p>{bio}</p>
            </div>
            <div className="data">
              <h5 className="text-white">Address</h5>
              <p>{address}</p>
            </div>
          </div>

          <h5 className="text-white">Member since</h5>
          <p>{new Date(createdDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="right-container">
        <h1>interested in..</h1>
        <p>{skills}</p>
        <h1>My Companies</h1>
        <div className="">
          <div className="d-flex flex-wrap   ">
            {companies.map((company) => (
              <Link to={`/company/${company._id}`}>
                <Company key={company._id} company={company} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UsersProfilePage;
