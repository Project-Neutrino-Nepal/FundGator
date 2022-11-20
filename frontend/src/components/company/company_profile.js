import React, { useState } from "react";
import "../../css/company_profile.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import People from "./people";
import Overview from "./overview";
import Question from "./question";
import Update from "./updates";
const ComProfile = () => {
  const [key, setKey] = useState("overview");
  return (
    <>
      <div className="container mt-5 d-flex flex-wrap justify-content-around  ">
        <div className=" container  col-8 ">
          <div className="card m-3" style={{ width: 770 }}>
            <div className="card-body">
              <h4 className="card-title">John Doe</h4>
              <p className="card-text">
                Some example text some example text. John Doe is an architect
                and engineer
              </p>
              <img
                className="card-img-top"
                src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                alt="Card image"
                style={{ width: "100%" }}
              />
              <br />
              <div className="mt-3">
                <p>Location: Kathmandu, Nepal</p>
              </div>
            </div>
            <hr />

            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 mt-3"
            >
              <Tab eventKey="overview" title="overview" >
                <Overview />
              </Tab>
              <Tab eventKey="updates" title="updates">
                <Update />
              </Tab>
              <Tab eventKey="people" title="what people say">
                <People />
              </Tab>
              <Tab eventKey="question" title="Ask a question">
                <Question />
              </Tab>
            </Tabs>
          </div>
          </div>
          <div className="column ">
            {" "}
            <div className="text-end">
              {" "}
              <span className=" btn border m-3 mb-5  btn-sm p-2 text-white bg-primary text-center w-50 text-uppercase ">
              <i class="fa-solid fa-share text-white"></i>&nbsp; Share
              </span>{" "}
            </div>
            <div className="">
              <span className="card " style={{ height: "20vh", width: "45vh" }}>
                <p className="ms-4 me-4 fs-6 fw-semibold mt-3 mb-2" >Follow fundgator to be notified if they later decide to raise funding.</p>
                <span className="ms-5 me-5 btn btn-primary w-75 text-center mt-3 text-uppercase "><i class="fa-regular fa-heart"></i>&nbsp;Watch for updates</span>
              </span>
            </div>
          </div>
        
      </div>
    </>
  );
};

export default ComProfile;
