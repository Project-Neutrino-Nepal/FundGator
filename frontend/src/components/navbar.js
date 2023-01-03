import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { io } from "socket.io-client";

import "../css/nav-search.css";
import SingleNotification from "./admin/components/layout/SingleNotification";
import SingleSearch from "./SingleSearch";

function Navbar() {
  const socket = io("http://localhost:5000");

  const [name, setName] = useState("");
  const [companyID, SetCompanyID] = useState("");
  const [companyName, SetCompanyName] = useState("");
  const [search, setSearch] = useState("");
  const [showsearch, setsearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setPreview] = useState({
    preview:
      "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/totw_network_profile_400.jpg",
    file: "",
  });

  const handleSearch = async (query) => {
    setSearch(query);
    console.log(query);

    if (!query || query === "") {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/profile/api/profiles?search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      setLoading(false);
      return toast.error("Something went wrong");
    }
  };
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
        setName(program.legal_name);
        setPreview({ ...image, preview: program.avatar });
      });
  });

  // get my company /api/get-my-companies

  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/get-my-companies", config)
      .then((res) => {
        const company = res.data.companies;
        company.map((company) => {
          SetCompanyID(company._id);
          SetCompanyName(company.name);
        });
      });
  });

  const admin = localStorage.getItem("admin");

  // notification
  const [shownotification, setnotification] = useState(false);

  const [addNotification, setAddnotification] = useState([]);

  const shownotificationHandler = () => {
    setnotification(!shownotification);
    setAddnotification([]);
  };
  const showSearchHandler = () => {
    setsearch(!showsearch);
  };

  useEffect(() => {
    //listens for the company list from the backend
    socket.on("sendMessage-admin", (company) => {
      console.log(company);
      setAddnotification(company);
    });
  });

  const logout = async (e) => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.assign("/signin");
  };

  if (localStorage.getItem("token") === null) {
    return (
      <>
        <ToastContainer />

        <nav
          className="navbar navbar-expand-lg navbar-dark  navbar-fixed-top"
          style={{ backgroundColor: "#0a4fa3" }}
        >
          <div className="container-fluid ms-4 me-4">
            <Link className="navbar-brand" to="/">
              FundGator
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="explore"
                  >
                    Explore
                  </Link>
                </li>
              </ul>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-2">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="contact-us"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/#two"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="nav-item border-start ms-2">
                  <Link
                    className="nav-link active ms-2"
                    aria-current="page"
                    to="signin"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="signup"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  } else if (localStorage.getItem("token") && admin === "false") {
    return (
      <>
        <ToastContainer />

        <nav
          className="navbar navbar-expand-lg  navbar-dark fixed-top mb-5"
          style={{ backgroundColor: "#0a4fa3" }}
        >
          <div className="container-fluid ms-4 me-4">
            <Link className="navbar-brand" to="/homepage">
              FundGator
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="explore"
                  >
                    Explore
                  </Link>
                </li>
              </ul>

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </form>

              <button
                className="btn btn-outline-success btn-sm"
                onClick={showSearchHandler}
              >
                Search
              </button>

              <div
                className={
                  showsearch
                    ? "position-absolute top-4 bg-white opacity-100"
                    : "d-none"
                }
                aria-hidden="true"
                style={{
                  transform: "translateY(225px) translateX(350px)",
                  zIndex: "2",
                  width: "max-content",
                  maxWidth: "500px",
                  minWidth: "500px",
                }}
              >
                <SingleSearch data={searchResults} />
              </div>
              {/* </li> */}

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className="nav-item me-3 mt-2 ">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="raise"
                  >
                    Raise funding
                  </Link>
                </li>

                {/* badge for notification */}
                <li className="nav-item me-3 mt-2">
                  <button
                    type="button"
                    class="btn position-relative"
                    onClick={shownotificationHandler}
                  >
                    <i className="fas fa-bell text-light" />
                    {addNotification.length > 0 && (
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {addNotification.length}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    )}
                  </button>
                  <div
                    className={
                      shownotification
                        ? "position-absolute top-4  bg-white shadow shadow-sm"
                        : "d-none"
                    }
                    style={{
                      transform: "translateY(37px) translateX(-300px)",
                      zIndex: "2",
                      width: "max-content",
                      maxWidth: "500px",
                      minWidth: "500px",
                      minHeight: "70px",
                    }}
                  >
                    <SingleNotification />
                  </div>
                </li>

                <li className="nav-item me-2 fs-4">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/chats"
                  >
                    <i className="fas fa-comment-dots" />
                  </Link>
                </li>
                {/* <li className="nav-item border-start ms-2"> */}

                <div className="dropdown border-start  ">
                  <a
                    href="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={image.preview ? image.preview : image}
                      alt=""
                      width={55}
                      height={55}
                      name={name}
                      className="rounded-circle me-2 ms-3 border border-grey border-2"
                    />

                    <strong>{name} </strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser1"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        aria-current="page"
                        to="profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        aria-current="page"
                        to="profile/Settings"
                      >
                        Settings
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <h6 className="dropdown-item fw-semibold" href="#">
                        COMPANY
                      </h6>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        aria-current="page"
                        to={`/company/${companyID}`}
                      >
                        {companyName}
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <a className="dropdown-item button " onClick={logout}>
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        &nbsp;&nbsp;&nbsp;Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  } else if (localStorage.getItem("token") && admin === "true") {
    return (
      <>
        <ToastContainer />

        <nav
          className="navbar navbar-expand-lg  navbar-dark fixed-top mb-5"
          style={{ backgroundColor: "#0a4fa3" }}
        >
          <div className="container-fluid ms-4 me-4">
            <Link className="navbar-brand" to="/dashboard">
              FundGator
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="explore"
                  >
                    Explore
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  // onChange={(e) => handleSearch(e.target.value)}
                />
              </form>

              <button
                className="btn btn-outline-success btn-sm"
                onClick={showSearchHandler}
              >
                Search
              </button>

              <div
                className={
                  showsearch
                    ? "position-absolute top-4 bg-white opacity-100"
                    : "d-none"
                }
                aria-hidden="true"
                style={{
                  transform: "translateY(225px) translateX(350px)",
                  zIndex: "2",
                  width: "max-content",
                  maxWidth: "500px",
                  minWidth: "500px",
                  minHeight: "70px",
                }}
              >
                <SingleSearch data={searchResults} />
              </div>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-2 fs-4">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/chats"
                  >
                    <i className="fas fa-comment-dots" />
                  </Link>
                </li>
                {/* <li className="nav-item border-start ms-2"> */}

                <div className="dropdown border-start  ">
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
                      width={55}
                      height={55}
                      className="rounded-circle me-2 ms-3"
                    />
                    <strong>{name} </strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser1"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        aria-current="page"
                        to="profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        aria-current="page"
                        to="profile/Settings"
                      >
                        Settings
                      </Link>
                    </li>

                    <hr />
                    <li>
                      <a className="dropdown-item button " onClick={logout}>
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        &nbsp;&nbsp;&nbsp;Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
