import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import Wrapper from "../wrapper/InvestmentTerm";

const InvestmentTerm = () => {
  const [show, setShow] = useState(false);
  return (
    <Wrapper onClick={() => setShow((show) => !show)}>
      <div className="header">
        <div className="heading">
          <span>INVESTMENT TERM</span>
          <AiFillCaretDown className={show ? "icon active":"icon "} />
        </div>
        <p>
          <strong>35M</strong> valuationcap <strong>Future equity</strong>
        </p>
      </div>

      <div className={show ? "accordion-box" : "d-none"}>
        <p className={show ? "" : "d-none"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi optio
          rerum soluta reprehenderit eveniet!
        </p>
        <Link className="link">learn about lorem</Link>
      </div>
    </Wrapper>
  );
};

export default InvestmentTerm;
