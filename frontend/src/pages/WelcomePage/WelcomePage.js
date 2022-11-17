import React from "react";
import LabelInput from "./component/LabelInput";
import Wrapper from "./wrapper/WelcomePage";

const WelcomePage = () => {
  return (
    <Wrapper>
      <div className="welcome">
        <h2 className="heading">Investor Information</h2>
        <p>To invest online, federal law requires that we collect some info</p>
        <LabelInput name={"Legal Name"} placeholder={"Enter Your Legal Name"} />
        <LabelInput name={"Country"} placeholder={"Enter Your Country"} />
        <LabelInput name={"Address"} placeholder={"Enter Your Address"} />

        <p>To invest online, federal law requires that we collect some info</p>
        <button className="btn-increase">INCREASE MY $2,200 LIMIT</button>
        <section className="public">
          <h4 className="heading">Public Infomration</h4>
          <p>show founders </p>
          <div className="information">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
              alt=""
            />
            <div className="inputs">
              <textarea
                name=""
                id="area"
                cols="30"
                rows="10"
                placeholder="Bio"
              ></textarea>
              <input type="text" placeholder="personal weslite" />
              <input type="text" placeholder="add skills" />
            </div>
          </div>
          <button className="btn-continue">SAVE & CONTINUE</button>
        </section>
      </div>
    </Wrapper>
  );
};

export default WelcomePage;
