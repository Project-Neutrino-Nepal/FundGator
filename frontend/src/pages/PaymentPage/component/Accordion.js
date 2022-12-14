import React, { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import Wrapper from "../wrapper/Accordion";
const Accordion = ({ item }) => {
  const [show, setshow] = useState(false);
  const { question, answer } = item;
  return (
    <Wrapper className="acco">
      <div className="drop   " onClick={() => setshow(!show)}>
        <div className="d-flex accor-content gap-2">
          <BsFillPlayFill
            className={!show ? "  icony  " : " icony fa-rotate-90 active "}
          />
          <p className="question lh-1">{question}</p>
        </div>
        <p className={show ? "question2 " : "d-none"}>{answer}</p>
      </div>
    </Wrapper>
  );
};

export default Accordion;
