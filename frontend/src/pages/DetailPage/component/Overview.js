import React from "react";
import highlights from "../utils/highlights";
import Wrapper from "../wrapper/Overview";
const Overview = () => {
  return (
    <Wrapper>
      <section className="lists">
        <h1>Highlights</h1>
        {highlights.map((item, index) => {
          return (
            <div className="list">
              <div className="number">{index + 1}</div> {item.text}
            </div>
          );
        })}
      </section>

      <section className="our-team">
        
      </section>
    </Wrapper>
  );
};

export default Overview;
