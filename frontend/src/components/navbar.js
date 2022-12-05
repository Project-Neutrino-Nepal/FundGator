import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/nav-search.css";
import axios from "axios";

function Navbar() {

    const [name, setName] = useState("");
 

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
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark navbar-fixed-top">

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
                  <Link className="nav-link active" aria-current="page" to="explore">
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
                  <Link className="nav-link active" aria-current="page" to="comProfile">
                    Raise funding 
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link active" aria-current="page" to="overview">

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
  }
  if (localStorage.getItem("token")) {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top mb-5">
          <div className="container-fluid ms-4 me-4">
            <Link className="navbar-brand" to="Homepage">
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
                <li className="nav-item me-2">
                  <Link className="nav-link active" aria-current="page" to="#">
                    FAQ
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
                      src="https://github.com/mdo.png"
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
                      <a className="dropdown-item" href="#">
                        COMPANY
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        &nbsp;&nbsp;&nbsp;Fundgator
                      </a>
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
