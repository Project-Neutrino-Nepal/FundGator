import React from "react";
import commentlst from "../utils/commentlst";
import SingleComment from "./SingleComment";
import Wrapper from "../wrapper/AskAQuestion";
const AskAQuestion = () => {
  return (
    <Wrapper>
      <div className="comment-form">
        <input type="text" placeholder="Ask a question" />
        <button>Submit</button>
      </div>

      <section className="select-input">
        <select name="" id="options">
          <option value="popular">popular</option>
          <option value="latest"> latest </option>
        </select>

        {commentlst.map((item) => {
          return <SingleComment />;
        })}
      </section>
    </Wrapper>
  );
};

export default AskAQuestion;
