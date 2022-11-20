import React from "react";
import Wrapper from "../wrapper/Card";
const Card = ({id,image,desc,heading,createdby,profilepicture}) => {
  return (
    <Wrapper className="ca" key={id} >
      <div className="cardy">
          <img
            src={image}
            alt=""
          />

          <div className="info-container">
            <h6>{createdby}</h6>
            <img src={profilepicture} alt="" className="profile-pic" />
            <h4>
              {heading}
            </h4>
            <p className="desc">
              {desc}
            </p>
            <div className="category">
              <span>venture backend</span>
              <span>venture backend</span>
              <span>venture backend</span>
            </div>
            <hr />
            <p className="f-p"><span>$1.435,777</span> form investor</p>
            <p className="s-p"><span>$1.435,777</span> form investor</p>
          </div>
      </div>
    </Wrapper>
  );
};

export default Card;
