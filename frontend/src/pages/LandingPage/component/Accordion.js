import React, { useState } from "react";
import Wrapper from "../wrappers/Accordion";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

const Accordion = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow((show) => !show);
  };
  return (
    <Wrapper>
      <div className="btn-acc" onClick={toggle}>
        <span>Who can invest ?</span>
        {show ? <BiMinus className="icon" /> : <BsPlusLg className="icon" />}
      </div>
      <p className={show ? "" : "d-none"}>
        FundGator welcomes anyone who is of legal age (18+) and can meet the
        legal requirements. As an inclusive and non-discriminatory organization,
        we also accept people from different backgrounds and levels of investing
        experience. Our platform embraces individual, institutional, and
        accredited investors. Note: Each asset is limited on the platform by the
        amount invested.
      </p>

      <p className={show ? "" : "d-none"}>
        Note: Each asset is limited on the platform by the amount invested.
      </p>
    </Wrapper>
  );
};

export default Accordion;
