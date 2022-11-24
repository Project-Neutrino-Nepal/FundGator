import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import People from "../company/people";
import Overview from "../company/overview";
import Question from "../company/question";
import Update from "../company/updates";
const AdminCompany_profile = () => {
  const [key, setKey] = useState("overview");
  return (
    <>
        <div className=" container   mt-5">
          <div className="card m-3 ps-3" style={{ width: '80%' }}>
            <div className="card-body ">
              <h4 className="card-title fs-4 fw-semibold">John Doe</h4>
              <p className="card-text">
                Some example text some example text. John Doe is an architect
                and engineer
              </p>
              <img
                className="card-img-top "
                src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                alt="Card image"
                style={{ width: "100%",height:'45vh' }}
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
              <Tab eventKey="overview" title="overview">
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
    </>
  );
};

export default AdminCompany_profile;
