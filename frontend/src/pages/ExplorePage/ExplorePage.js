import React from "react";
import Cardlist from "./component/Cardlist";
import Wrapper from "./wrapper/ExplorePage";
import cardlst from "../../utils/cardlst";

const ExplorePage = () => {
  return (
    <Wrapper>
        <h2 id="explorePage">
          Invest in founders <span>building the future</span>
        </h2>
        <p>Invest as little as Rs.1000</p>
        
        <Cardlist  heading={"New This Week"}  />
        
    </Wrapper>
  );
};

export default ExplorePage;
