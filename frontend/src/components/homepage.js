import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/homepage.css";
import Basenav from "./basenav";
import Feeds from "./feeds";

const Homepage = () => {
  const [name, setName] = useState("");
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
        let program = res.data.profile;
        setName(program.name);
        setPreview({ ...image, preview: program.avatar });
      });
  });

  return (
    <>
      <div className="basenav">
        <Basenav />
      </div>
      {/* <div className="d-flex flex-wrap"> */}
      <div
        className="  p-3 text-white mt-5 col-3 position-fixed"
        id="sidebar-width"
        style={{ backgroundColor: "#0a4fa3" }}
      >
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={image.preview}
              alt=""
              width={65}
              height={65}
              className="rounded-circle me-2 mt-2"
            />
            <strong>{name}</strong>
          </a>

          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="/raise">
                Raise fund
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/profile/Settings">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/homepage" className="nav-link active">
              <i className="fa fa-home" />
              <span className="ms-2">Feeds</span>
            </Link>
          </li>
          <li>
            <Link to="/profile/Portfolio" className="nav-link text-white">
              <i className="fa fa-dashboard" />

              <span className="ms-2">My Investment</span>
            </Link>
          </li>
          <li>
            <Link to="/profile/Portfolio" className="nav-link text-white">
              <i className="fa fa-first-order" />

              <span className="ms-2">By Fundgator</span>
            </Link>
          </li>
          <li>
            <Link to="/profile/Portfolio" className="nav-link text-white">
              <i className="fa fa-bookmark" />
              <span className="ms-2">My Watchlist</span>
            </Link>
          </li>
          <li>
            <Link to="/profile/Portfolio" className="nav-link text-white">
              <i className="fa fa-cog" />
              <span className="ms-2">Add Post</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="container-fluid col-9 mt-2  " id="feeds-position">
        <Feeds />
        <Feeds />

        {/* </div> */}
      </div>
    </>
  );
};

export default Homepage;
