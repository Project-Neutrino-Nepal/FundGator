import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Wrapper from "../wrapper/SingleComment";
import { BsThreeDots } from "react-icons/bs";
import ReplyComment from "./ReplyComment";

const SingleComment = ({ item, profile }) => {
  const [show, setShow] = useState(false);
  const pa = useRef(null);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const [user, setuser] = useState({});
  const [vreply, setreply] = useState("");
  const [drop, setdrop] = useState(false);

  const [allreplies, setallreplies] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/api/get-profile/${item.user}`, config)
      .then((res) => {
        console.log(res);
        setuser(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(item);
  }, []);

  const replytouser = (username) => {
    setdrop((prev) => !prev);
    setreply(`@${username}`);
  };

  const onreplysubmit = () => {
    setdrop(false);
  };

  return (
    <Wrapper>
      <div className="info">
        <div className="user-img">
          <img
            src="https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
          />
          <span>{user.name}</span>
        </div>
        <div className="option">
          <BsThreeDots
            className="icon"
            onClick={() => setShow((show) => !show)}
          />

          <div className={show ? "options" : "options active"}>
            <span>edit</span>
            <span>delete</span>
            <span>Report</span>
          </div>
        </div>
      </div>

      <div className="comment">
        <p>{item.question}</p>
      </div>
      <p className="fw-bold"  onClick={() => replytouser(user.name)} role="button">
        Reply
      </p>
      <div className={drop ? "reply-input" : "d-none"}>
        <div className="d-flex">
          <img
            className="rounded-circle  "
            width={30}
            height={30}
            src={
              "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
            alt=""
          />
          <input
            ref={pa}
            type="text"
            value={vreply}
            placeholder="add a reply"
            className="form-control border-0 border-bottom-4 border-bottom rounded-0"
            onChange={(e) => setreply(e.target.value)}
          />
        </div>
        <div className="d-flex ms-auto mt-2 justify-content-end ">
          <button
            className="btn border-0 bg-transparent"
            onClick={() => setdrop(false)}
          >
            cancel
          </button>

          <button
            className="btn border-0 rounded-pill bg-black bg-opacity-10 fw-bold"
            onClick={onreplysubmit}
          >
            Reply
          </button>
        </div>
      </div>
      <span
        className="ms-1 text-primary  "
        role="button"
        onClick={() => setallreplies((prev) => !prev)}
      >
        {!allreplies ? "view all 10 Replies" : "show less"}
      </span>

      <div className={allreplies ? "" : "d-none"}>
        {[...Array(8)].map((value) => {
          return <ReplyComment item={item} />;
        })}
      </div>
    </Wrapper>
  );
};

export default SingleComment;
