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
        <p>Invest as little as $100</p>

        <Cardlist item={cardlst} heading={"New This Week"} to={"/profile"} />
        
    </Wrapper>
  );
};

export default ExplorePage;
