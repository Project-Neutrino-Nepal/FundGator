import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Wrapper from "../wrapper/SingleComment";
import { BsThreeDots } from "react-icons/bs";

const SingleComment = ({ item }) => {
  const [like, setlike] = useState({ liked: false, likecount: 0 });
  const [show,setShow] = useState(false)
  const likecomment = () => {
    setlike({liked:true,likecount:like.likecount + 1});
  };

  const unlikecomment = () => {
    setlike({liked:false,likecount:like.likecount - 1});
  };
  return (
    <Wrapper>
      <div className="info">
        <div className="user-img">
          <img
            src="https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
          />
          <span>name</span>
        </div>
        <div className="option">
          Oct 16 <BsThreeDots className="icon" onClick={()=> setShow(show => !show)} />

          <div className={show?"options":"options active"}>
            <span>edit</span>
            <span>delete</span>
           <span>Report</span>
          </div>
        </div>
      </div>

      <div className="comment">
        <div className="heart">
          {like.liked ? (
            <AiFillHeart className="liked" onClick={unlikecomment} />
            ) : (
            <AiOutlineHeart className="notliked" onClick={likecomment} />
          )}
          <div>{like.likecount}</div>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae iure
          cumque molestiae?
        </p>
      </div>
    </Wrapper>
  );
};

export default SingleComment;
