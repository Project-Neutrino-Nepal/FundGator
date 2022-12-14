import React from "react";
import folderimg from "../../../assets/image/file.svg";
import Wrapper from "../wrapper/Portfolio"
const Portfolio = () => {
  return (
    <Wrapper>
      <img src={folderimg} alt=""  className="fileimg"/>
      <p>build your own startup</p>
      <button>Explore Companies</button>
    </Wrapper>
  );
};

export default Portfolio;
