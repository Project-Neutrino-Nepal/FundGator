import React from "react";
import Wrapper from "../wrapper/Card";
const Card = ({
  _id,
  name,
  email,
  short_pitch,
  address,
  image,
  profile,
  phone,
  tax_ID_No,
  tax_document,
  company_document,
  company_logo,
  company_video,
  company_website,
  company_facebook,
  company_twitter,
  company_linkedin,
  company_instagram,
  raising_fund,
  fund_raised,
  fund_goal,
}) => {
  return (
    <Wrapper className="ca" key={_id}>
      <div className="cardy">
        <img src={image} alt="" />

        <div className="info-container">
          <img src={profile.avatar} alt="" className="profile-pic" />
          <h4>{name}</h4>
          <h6 style={{ textTransform: "none" }}>{email}</h6>
          <p>{address}</p>
          <p className="desc">{short_pitch}</p>

          <div className="category">
            <span>venture backend</span>
            <span>
              {raising_fund === true ? "Rasing Fund" : "Rasing Closed"}
            </span>
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
