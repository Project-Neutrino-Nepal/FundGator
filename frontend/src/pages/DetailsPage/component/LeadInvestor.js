import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Wrapper from "../wrapper/LeadInvestor";
const LeadInvestor = (ID) => {
  const id = ID.company;
  const [show, setShow] = useState(false);
  const [investors, setInvestors] = useState([]);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/get-investors/" + id, config)
      .then((res) => {
        const investors = res.data.investors;
        // sort investors by amount invested
        investors.sort((a, b) => b.amount_invested - a.amount_invested);

        setInvestors(investors);
        console.log(investors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Wrapper onClick={() => setShow((show) => !show)}>
      <div className="heading">
        <span>Lead Investor</span>
        <AiFillCaretDown className={show ? "icon active" : "icon "} />
      </div>
      <div className="user-info">
        {investors.map((investor) => (
          <>
            <img src={investor.profile.avatar} alt="" srcset="" />
            <div className="content">
              <span className="fs-5">{investor.profile.legal_name}</span>
              <p className={show ? "active" : ""}>{investor.profile.bio}</p>
            </div>
          </>
        ))}
      </div>
    </Wrapper>
  );
};

export default LeadInvestor;
