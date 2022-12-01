import React, { useState } from "react";
import Wrapper from "./wrapper/RaisePage";
import raise from "../../assets/image/raise.png";
import { useNavigate } from "react-router-dom";

const RaisePage = () => {
  const [border, setBorder] = useState(false);
  const [companyname, setcompanyname] = useState("");
  const handleChange = (e) => {
    setcompanyname(e.target.value);
  };
  const navigate = useNavigate();
  return (
    <Wrapper className="">
      <section className="left-container ">
        <h1>
          Start Rasing money in <span>15 minutes</span>
        </h1>
        <p>
          We take the pain out of raising money. Raise $50K to $5M from
          superfans & angel investors who believe in you.
        </p>
        <div className={border ? "entercompany active" : "entercompany"}>
          <input
            type="text"
            placeholder="company name"
            onChange={handleChange}
            value={companyname}
            onFocus={() => setBorder(true)}
            onBlur={() => setBorder(false)}
          />
          <button
            className="btn-raise"
            onClick={() => navigate(`/companyRegister/${companyname}`)}
          >
            Start Raising now
          </button>
        </div>
      </section>

      <section className="right-container ">
        <img src={raise} alt="" />
      </section>
    </Wrapper>
  );
};

export default RaisePage;
