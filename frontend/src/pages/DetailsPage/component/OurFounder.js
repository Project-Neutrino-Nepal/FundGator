import React from "react";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";
import Wrapper from "../wrapper/OurFounder";
const OurFounder = ({
  name,
  image,
  email,
  position,
  description,
  linkedin,
  facebook,
}) => {
  console.log(facebook);
  return (
    <Wrapper>
      <img src={image} alt={name} />

      <div className="info">
        <div className="userinfo">
          <span>{name}</span>
          <span>{email}</span>
        </div>
        <span>{position}</span>
        <Link className="icon" to={facebook}>
          <AiFillFacebook />
        </Link>
        <Link className="icon" to={linkedin}>
          <AiFillLinkedin />
        </Link>
        <p></p>
      </div>
    </Wrapper>
  );
};

export default OurFounder;
