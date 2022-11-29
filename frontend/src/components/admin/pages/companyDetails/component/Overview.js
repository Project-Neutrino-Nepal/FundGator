import React from "react";
import highlights from "../utils/highlights";
import Wrapper from "../wrapper/Overview";
import OurFounder from "./OurFounder";

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
        <h1>Our Founders</h1>

        <div className="lists">
          <OurFounder />
          <OurFounder />
          <OurFounder />
        </div>
      </section>

      <section className="about">
        <h1> About Product</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis ducimus dolor laboriosam pariatur? Quas dolore consectetur
          aspernatur saepe libero suscipit aut tenetur est ut hic, corrupti
          explicabo, unde obcaecati tempora fugiat. Distinctio cum veniam quod
          totam harum, dicta accusantium magnam esse in incidunt maiores a quos,
          odio maxime molestiae. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Dolorum repellat, impedit consequuntur similique
          vitae maxime eos nesciunt soluta aliquam autem doloremque minus facere
          tempora sapiente blanditiis? Animi expedita doloremque repellat?
        </p>
      </section>
    </Wrapper>
  );
};

export default Overview;
