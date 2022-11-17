import React, { useState } from "react";
import Wrapper from "../wrappers/Accordion";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

const Accordion3 = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow((show) => !show);
  };
  return (
    <Wrapper>
      <div className="btn-acc" onClick={toggle}>
        <span>How to start investing on FundGator?</span>
        {show ? <BiMinus className="icon" /> : <BsPlusLg className="icon" />}
      </div>
      <p className={show ? "" : "d-none"}>
        Investing on FundGator’s platform is easy.
      </p>

      <p className={show ? "" : "d-none"}>
        First of all, register and fill out your basic information. Once you’ve
        created your account, we suggest filling out your personal information,
        such as email and contact address, and then verify your identity with a
        KYC check. This is required to invest in all offerings on FundGator . If
        you are an accredited investor, we suggest you also verify your account
        at the same time as well.
      </p>

      <p className={show ? "" : "d-none"}>
        Once you have passed the KYC check, you can browse one of the campaigns
        that you find exciting. Evaluate the offering objectively and take some
        time to read all the terms and conditions on the assets’ page. You need
        to do your due diligence is necessary, for example, ask the issuer for
        clarification on any questions that might confuse you. Make sure you
        have a full grasp of all the information you might need to help you to
        make excellent decisions. Also, do not forget to review the risks of the
        offerings you select.
      </p>
    </Wrapper>
  );
};

export default Accordion3;
