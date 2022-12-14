import React from "react";
import Wrapper from "../wrapper/OurFounder";
const OurFounder = ({
  name,
  image,
  email,
  position,
  description,
  linkedin,
  twitter,
  facebook,
}) => {
  return (
    <Wrapper>
      <img src={image}
       alt={name} />

        
      <div className="info">
        <div className="userinfo">
          <span>{name}</span>
          <span>{email}</span>
          <span>{position}</span>
        </div>
        <p>
        </p>
      </div>
    </Wrapper>
  );
};

export default OurFounder;
