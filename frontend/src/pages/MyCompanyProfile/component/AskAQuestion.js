import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import commentlst from "../utils/commentlst";
import SingleComment from "./SingleComment";
import Wrapper from "../wrapper/AskAQuestion";
const AskQuestion = () => {
  const [question, setQuestion] = useState("");
 const [questions, setQuestions] = useState([]);
 const [profile, setProfile] = useState({});
 
  const { id } = useParams();
  
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };


  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };


 // to post question
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     question,
  //   };
  //   axios
  //     // .post(`http://localhost:5000/question/api/create-qn/:company`, data)
  //     .post(`http://localhost:5000/question/api/create-qn/${id}`, data, config)
  //     .then((res) => {
  //      // console.log(res);
  //       toast.success("Question posted successfully");
  //       // setQuestion([...question, res.data.data]);
  //       // setQuestion("");
  //     })
  //     .catch((err) => {
  //       //console.log(err);
  //       toast.error("An error occurred");
  //     });
  // };

   //to get profile
  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/api/get-profiles`, config)
      .then((res) => {
        const data = res.data.profiles;
        //console.log(data.user);
        const filter = data.filter(item => item.user._id === id)
        console.log(filter);
        setProfile(filter);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




  useEffect(() => {
    axios
      .get(`http://localhost:5000/question/api/qn-company/${id}`, config)
      .then((res) => {
        const data = res.data.questions;
        console.log(data);
        //const filter = data.filter(item => item.company === id)

        //console.log(res);
        setQuestions(data);
       // console.log(filter);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [config, id]);

  



  return (
    <Wrapper>
      <div className="comment-form">

        <ToastContainer />    
        <input 
        onChange={handleChange}
        value={question}
        type="text" placeholder="Ask a question" />
        <button
          type="submit"
        
        >Submit</button>
      </div>

      <section className="select-input">
        <div className="comment-list">
          {questions.map((item,index) => (
            <div key={index}>
            <SingleComment profile={profile} item={item} />

            </div>
          ))}
        </div>
      </section>
    </Wrapper>
  );
};

export default AskQuestion;
