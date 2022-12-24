import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Wrapper from "../wrapper/SingleComment";
import { toast, ToastContainer } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";

const SingleComment = ({ item, profile }) => {
  
  const [show,setShow] = useState(false);
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
      answer:reply,
      company:id
    };
    axios
      .put(`http://localhost:5000/question/api/reply-qn/${item._id}`, data, config)
      .then((res) => {
        console.log(res);
        toast.success("Reply posted successfully");
       
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred");
      });
  };
console.log(item);

  return (
    <Wrapper>
       <Wrapper>
      <div className="info">
        <div className="user-img">
          <img
            src="https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
          />
          <span>{user.name}</span>
          
        </div>
        {/* <div className="option">
         <BsThreeDots className="icon" onClick={()=> setShow(show => !show)} />

          <div className={show?"options":"options active"}>
          
            <span >edit</span>
            <span>delete</span>
           <span>Report</span>
          </div>
        </div> */}
      </div>

      <div className="comment">
       
        <p>
          {item.question}
        </p>
        <p>{item.answer}</p>

        <input 
        onChange={handleChange}
         value={reply}
        type="text" placeholder="Reply" />
        <button
          type="submit"
          onClick={handleReply}
        
        >Submit</button>
      </div>
    </Wrapper>
      
    


        


      
      
                



    </Wrapper>
  );
};

export default SingleComment;
