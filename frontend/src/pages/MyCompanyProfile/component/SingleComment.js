import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../wrapper/SingleComment";

const SingleComment = ({ item, profile }) => {
  const [show, setShow] = useState(false);
  const [reply, setReply] = useState("");

  const { id } = useParams();

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const [user, setuser] = useState({});

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
  }, []);

  //to reply to a question
  const handleReply = (e) => {
    e.preventDefault();
    const data = {
      answer: reply,
      company: id,
    };
    axios
      .put(
        `http://localhost:5000/question/api/reply-qn/${item._id}`,
        data,
        config
      )
      .then((res) => {
        console.log(res);
        toast.success("Reply posted successfully");
        setLoadReply(false);
       
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred");
      });
  };
  console.log(item);

  const [loadReply, setLoadReply] = useState(false);

  const openReply = () => {
    setLoadReply(true);
   
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
          </div>

          

          

          <div className="option">
            <BsThreeDots
              className="icon"
              onClick={() => setShow((show) => !show)}
            />

            <div className={show ? "options" : "options active"}>
              <span onClick={openReply}>reply</span>
              
            </div>
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
        

        {loadReply && (
          <div
            style={{
              margin: "10px 0px 10px 100px",
            }}
          >
            <input
              style={{
                border: "1px solid #4F8BC3",
                borderRadius: "12px",
                width:'400px',
                padding: "5px 10px",
                outline: "none",
                boxShadow:'0px',
                marginRight: "20px",

              }}
              onChange={handleChange}
              value={reply}
              type="text"
              placeholder="Reply"
            />
            <button

            style={{
               
                background:'#4F8BC3',
                borderRadius: "0px",
                padding: "7px 12px",
                outline: "none",
                color:'#fff',

                fontWeight:'500',
                border:'none',
                boxShadow:'0px',
                
              }}
            
            
            
            type="submit" onClick={handleReply}>
              Submit
            </button>
          </div>
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default SingleComment;