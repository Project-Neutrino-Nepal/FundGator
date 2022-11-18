import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "../css/homepage.css";
import Feeds from "./feeds";
const Homepage = () => {
  return (
    <>
    {/* <div className="d-flex flex-wrap"> */}
      <div
        className="  p-3 text-white bg-dark  col-3 position-fixed"
      id="sidebar-width">
        <div className="dropdown">
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
              width={65}
              height={65}
              className="rounded-circle me-2"
            />
            <strong> Ram</strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                Raise fund
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            
          </ul>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="" className="nav-link active" aria-current="page">
              <i className="fa fa-home" />
              <span className="ms-2">Feeds</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <i className="fa fa-dashboard" />
              <span className="ms-2">My Investment</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <i className="fa fa-first-order" />
              <span className="ms-2">By FundGator</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <i className="fa fa-bookmark" />
              <span className="ms-2">My Watchlist</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <i className="fa fa-cog" />
              <span className="ms-2">Add Post</span>
            </a>
          </li>

        </ul>
      </div>
      <div className="container-fluid col-9 mt-2  " id='feeds-position'>
        <Feeds/>
        <Feeds/>
        

        {/* </div> */}
    </div>
       

                        

                        
    </>
  );
};

export default Homepage;
