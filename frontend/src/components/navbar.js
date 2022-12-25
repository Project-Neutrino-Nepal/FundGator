import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/nav-search.css";

function Navbar() {
  const [name, setName] = useState("");
  const [companyID, SetCompanyID] = useState("");
  const [companyName, SetCompanyName] = useState("");
  const [image, setPreview] = useState({
    preview:
      "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/totw_network_profile_400.jpg",
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

  const logout = async (e) => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.assign("/signin");
  };

  if (localStorage.getItem("token") === null) {
    return (
      <>
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
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />

                <button
                  className="btn btn-outline-success btn-sm"
                  type="submit"
                >
                  Search
                </button>
              </form>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-2">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="comProfile"
                  >
                    Raise funding
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="overview"
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
                />

                <button
                  className="btn btn-outline-success btn-sm"
                  type="submit"
                >
                  Search
                </button>
              </form>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-2">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="raise"
                  >
                    Raise funding
                  </Link>
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
                />

                <button
                  className="btn btn-outline-success btn-sm"
                  type="submit"
                >
                  Search
                </button>
              </form>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-2">
                  <Link className="nav-link active" aria-current="page" to="#">
                    Raise funding
                  </Link>
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
                      <h6 className="dropdown-item fw-semibold" href="#">
                        COMPANY
                      </h6>
                    </li>
                    <li>
                      {/* {companies.map((company) => (
                        <Link
                          className="dropdown-item"
                          aria-current="page"
                          to={`/company/${company._id}`}
                        >
                          {company.name}
                        </Link>
                      ))} */}
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
