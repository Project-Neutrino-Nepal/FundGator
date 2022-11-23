import React from "react";
import Wrapper from "../wrapper/OurFounder";
const OurFounder = () => {
  return (
    <Wrapper>
      <img
        src="https://images.unsplash.com/photo-1512850692650-c382e34f7fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=468&q=80"
        alt=""
      />
      <div className="info">
        <div className="userinfo">
          <span>John Doe</span>
          <span>Founder & CEO</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          illum adipisci, sint voluptatum, placeat veniam quidem magnam
          necessitatibus quaerat numquam maiores voluptas.
        </p>
      </div>
    </Wrapper>
  );
};

export default OurFounder;
