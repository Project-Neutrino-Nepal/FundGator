import React, { useState } from "react";
import Container from "./wrappers/LandingPage";
import Accordion from "./component/Accordion";
import Accordion2 from "./component/Accordion2";
import Accordion3 from "./component/Accordion3";
import Accordion4 from "./component/Accordion4";

import { Howto, Footer } from "./component";
import howtolst from "../../utils/howtolst";

const LandingPage = () => {
  const [show, setshow] = useState(false);

  const togglesidebar = () => {
    setshow((value) => !value);
  };

  return (
    <Container>
      <section className="one">
        <div className="left-container">
          <h1>Start Funding the Future Now</h1>
          <p>
            Access investment oppurtunities in the small business you belive in
          </p>
          <div className="btn-container">
            <button className="btn-started">Get Started</button>
            <button className="btn-works">How it Works</button>
          </div>
        </div>
        <div className="right-container"></div>
      </section>

      <section className="two">
        <h1>Frequently Asked Questions</h1>

        <Accordion />
        <Accordion2 />
        <Accordion3 />
        <Accordion4 />
      </section>

      <section className="three">
        <h1>How to Invest</h1>
        <div className="content">
          {howtolst.map((item) => {
            return (
              <div className="card-container">
                <Howto {...item} />;
              </div>
            );
          })}
        </div>
      </section>

      <section className="four">
        <h1>Big companies start small.</h1>
        <h2>Get in early and stay involved with Startfund today.</h2>
        <p>
          Browse all projects on Startfund and get comprehensive background
          information before choosing the ones you believe in. Good luck hunting
          "unicorns".
        </p>

        <button className="btn-started">Get Started</button>
      </section>

      <Footer />
    </Container>
  );
};

export default LandingPage;
