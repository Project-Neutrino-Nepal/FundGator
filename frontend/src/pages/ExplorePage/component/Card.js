import React from "react";
import Wrapper from "../wrapper/Card";
const Card = ({_id, name,email,short_pitch,address}) => {
  return (
    <Wrapper className="ca" key={_id}>
      <div className="cardy">
        <img src="https://github.com/mdo.png" alt="" />

        <div className="info-container">
          <h6>{}</h6>
          <img
            src="https://github.com/mdo.png "
            alt=""
            className="profile-pic"
          />
          <h4>{name}</h4>
          <p className="desc">{short_pitch}</p>
          <div className="category">
            <span>venture backend</span>
          </div>
          <hr />
          <p className="f-p">
            <span>$1.435,777</span> form investor
          </p>
          <p className="s-p">
            <span>$1.435,777</span> form investor
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
