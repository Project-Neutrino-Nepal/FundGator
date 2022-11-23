import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Wrapper from "../wrapper/LeadInvestor";
const LeadInvestor = () => {
  const [show, setShow] = useState(false);

  return (
    <Wrapper onClick={() => setShow((show) => !show)}>
      <div className="heading">
        <span>Lead Investor</span>
        <AiFillCaretDown className={show ? "icon active" : "icon "} />
      </div>
      <div className="user-info">
        <img src="https://github.com/mdo.png" alt="" srcset="" />
        <div className="content">
          <span>name</span>
          <p className={show ? "active" : ""}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem qui
            eos tenetur eaque praesentium voluptates, dicta possimus sapiente
            necessitatibus voluptas, amet rem! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Beatae rem iusto aliquid!
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default LeadInvestor;
