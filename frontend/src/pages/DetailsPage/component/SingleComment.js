import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Wrapper from "../wrapper/SingleComment";
import { BsThreeDots } from "react-icons/bs";

const SingleComment = ({ item, profile }) => {
  
  const [show,setShow] = useState(false);
  
  
 
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
        <div className="option">
         <BsThreeDots className="icon" onClick={()=> setShow(show => !show)} />

          <div className={show?"options":"options active"}>
            <span>edit</span>
            <span>delete</span>
           <span>Report</span>
          </div>
        </div>
      </div>

      <div className="comment">
       
        <p>
          {item.question}
        </p>
      </div>
    </Wrapper>
      
    


        


      
      
                



    </Wrapper>
  );
};

export default SingleComment;
