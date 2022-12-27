import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper/Card";
const Card = ({
  _id,
  name,
  email,
  address,
  image,
  profile,
  content,
  raising_fund,
  fund_raised,
}) => {
  const [website, setWebsite] = useState("");
  const [fund_goal, setFund_goal] = useState("");
  const [tags, setTags] = useState([]);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // get reason details using id from params
  useEffect(() => {
    axios
      .get("http://localhost:5000/reason/api/get-reasons/" + _id, config)
      .then((res) => {
        let reasons = res.data.reasons;
        setWebsite(reasons.companylink);
        setFund_goal(reasons.amount);
        setTags(reasons.tag);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper className="ca " key={_id}>
      <div className="cardy shadow shadow-sm">
        <img src={image} alt="" />

        <div className="info-container">
          <img src={profile.avatar} alt="" className="profile-pic" />
          <h4>{name}</h4>
          <h6 style={{ textTransform: "none" }}>{email}</h6>
          <p>{email}</p>

          <p className="desc">
            {content
              ? content.length > 100
                ? content.substring(0, 100) + "..."
                : content
              : ""}
          </p>

          <div className="category">
            <span>
              {raising_fund === true ? "Rasing Fund" : "Rasing Closed"}
            </span>
            {tags.map((tag) => {
              return <span>{tag.name}</span>;
            })}
          </div>
          <hr />
          <p className="f-p">
            <span>Rs.{fund_goal}</span> Fund Goal
          </p>
          <p className="s-p">
            <span>Rs.{fund_raised}</span> Fund Raised
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
