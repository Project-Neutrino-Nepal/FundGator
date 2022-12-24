import React from "react";
import commentlst from "../utils/commentlst";
import Wrapper from "../wrapper/WhatInvestorSay";
const WhatInvestorSay = () => {
  return (
    <Wrapper>
      <div className="comment-form">

         
        <input 
       
        type="text" placeholder="Ask a question" />
        <button
          type="submit"
         
        >Submit</button>
      </div>
      <h2>What Investors Say</h2>

      <div className="comments">
          {commentlst.map((item) => {
            const { profilePicture, id, username } = item;
            return (
              <div key={id} className="comment">
                <img src={profilePicture} alt="" />
                <div className="info">
                  <span>{username}</span>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
                    tenetur sequi fugiat placeat, unde quis natus quisquam
                    perspiciatis doloremque eos cum assumenda.
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};

export default WhatInvestorSay;
