import React, { useState } from "react";
import Wrapper from "../wrappers/Accordion";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

const Accordion4 = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow((show) => !show);
  };
  return (
    <Wrapper>
      <div className="btn-acc" onClick={toggle}>
        <span>
          How will my investment charged? What is the process? When my
          investment will be charged?
        </span>
        {show ? <BiMinus className="icon" /> : <BsPlusLg className="icon" />}
      </div>
      <p className={show ? "" : "d-none"}>
        Once you have selected a payment method, acknowledged the terms, and
        clicked the "Invest" button (the one on the investing page), your
        investment will be processed immediately and transferred to an escrow
        account. If the offering meets the minimum fundraising goal, the funding
        automatically closes to success. Once the campaigns are completed, all
        collected investments from the various investors are transferred from
        the escrow account to the issuer. However, if the investment does not
        reach its minimum funding goal, your payment will be refunded back
        through the original payment channel.
      </p>
    </Wrapper>
  );
};

export default Accordion4;
