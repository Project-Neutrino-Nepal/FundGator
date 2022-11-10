import React, { useState } from "react";
import Wrapper from "../wrappers/Accordion";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

const Accordion2 = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow((show) => !show);
  };
  return (
    <Wrapper>
      <div className="btn-acc" onClick={toggle}>
        <span>
          How much can I invest? What is the minimum investment amount?
        </span>
        {show ? <BiMinus className="icon" /> : <BsPlusLg className="icon" />}
      </div>
      <p className={show ? "" : "d-none"}>
        Every fundraising project/company on FundGator will often have to set
        its own funding goal, which will vary in range, often starting at $100,
        from which the maximum investment amount will be set. For an investor
        who invests in a regulated CF offering, the investment can be as low as
        $2,200, or 5% less than their net worth or annual income, or as high as
        $107,000. Based on each offering, the current minimum investment amount
        is as low as $100.
      </p>

      <p className={show ? "" : "d-none"}>
        Note: Each asset is limited on the platform by the amount invested.
      </p>
    </Wrapper>
  );
};

export default Accordion2;
