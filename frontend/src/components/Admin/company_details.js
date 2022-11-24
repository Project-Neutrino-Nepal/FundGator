import React, { useState } from "react";
import illustration from "../../assets/image/illustration.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminCompany_profile from "./admin-company-profile";
const CompanyDetails = () => {
    const [key, setKey] = useState("profile");
  return (
    <>
      <div className="container-sm-fluid* mt-5">
        <div className="container col-9" style={{ marginTop: "100px" }}>
          <div className="row">
            <h3>Company Details</h3>
          </div>

          <div className="mt-3 mb-2 ">
            <span className="">
              <img
                className=" border "
                src="https://cdn.dribbble.com/users/3293507/screenshots/14667603/media/d8cbe035a61f64afdf6deabca5182842.jpg?compress=1&resize=400x300&vertical=top"
                alt="profile"
                style={{  width: "90px",height:"90px",borderRadius:"70%" }}
              />
            </span>
          </div>
          <div>
          <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 mt-3"
            >
              <Tab eventKey="profile" title="Profile">
                <AdminCompany_profile />
              </Tab>
              <Tab eventKey="" title="Portfolio">
              </Tab>
              <Tab eventKey="" title="Document">
                
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
export default CompanyDetails;
