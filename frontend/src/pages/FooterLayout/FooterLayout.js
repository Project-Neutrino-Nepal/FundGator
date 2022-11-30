import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../LandingPage/component";
const FooterLayout = () => {
  return (
    <div>
      <div className="dashboard-content">
        <Outlet />
      </div>
      <div className="footy">
        <Footer/>
      </div>
    </div>
  );
};

export default FooterLayout;
