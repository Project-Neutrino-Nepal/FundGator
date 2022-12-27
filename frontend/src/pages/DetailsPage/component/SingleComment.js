import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Wrapper from "../wrapper/SingleComment";
import { BsThreeDots } from "react-icons/bs";
import { useMergeRefs } from "@chakra-ui/react";

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
      <Wrapper>
        <div className="info">
          <div className="user-img">
            <img
              src={user.avatar}
              alt=""
            />
            <span>{user.name}</span>
            <div className="comment">
              <p
                style={{
                  margin: "2px 0px 0px 10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  background: "none",
                }}
              >
                {`Q: ` + item.question}
              </p>
            </div>
            <div>
            {/* {
                moment(item.createdAt).format("DD-MM-YYYY")
              } */}

            </div>
           
          </div>

          {/* {
                moment(item.createdAt).format("DD-MM-YYYY")
              } */}

          <div className="option">
            <BsThreeDots
              className="icon"
              onClick={() => setShow((show) => !show)}
            />

            {/* <div className={show ? "options" : "options active"}>
             
              
            </div> */}
            
             
            
          </div>
          
        </div>

        <section>
          <div
            className="answer"
            style={{
              margin: "0px 0px 0px 50px",
              fontWeight: "500",
              fontSize: "20px",
              background: "none",
            }}
          >
            <p
              style={{
                background: "none",
                fontSize: "18px",
                margin: "0px 0px 0px 60px",
              }}
            >
              {item.answer && `R: ` + item.answer}
            </p>
          </div>
        </section>

        
          
      </Wrapper>
    </Wrapper>
    
  );
};

export default SingleComment;
