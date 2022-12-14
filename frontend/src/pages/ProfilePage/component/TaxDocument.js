import React from "react";
import Wrapper from "../wrapper/Portfolio";
import doc from "../../../assets/image/doc.svg";
const TaxDocument = () => {
  return (
    <Wrapper>
      <img src={doc} alt="" className="doc marginup" />
      <p className="heading">You currently have no tax events.</p>
    </Wrapper>
  );
};

export default TaxDocument;
