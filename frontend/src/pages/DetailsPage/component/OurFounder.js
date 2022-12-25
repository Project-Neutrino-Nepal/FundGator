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
  return (
    <Wrapper>
      {/* <img src={image} alt={name} /> */}

      <div className="info">
        <div className="userinfo">
          <span>{name}</span>
          <span>{email}</span>
        </div>
        <span
        className="me-2 fs-5"
        >{position}</span>
        <Link className="icon fs-4 me-2" to={facebook}>
          <AiFillFacebook />
        </Link>
        <Link className="icon fs-4" to={linkedin}>
          <AiFillLinkedin />
        </Link>
        <p></p>
      </div>
    </Wrapper>
  );
};

export default OurFounder;
