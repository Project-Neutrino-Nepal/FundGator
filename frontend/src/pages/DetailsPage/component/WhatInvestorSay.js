import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../wrapper/AskAQuestion";

const WhatInvestorSay = () => {
  const [feedbacks, setfeedbacks] = useState([]);
  const [feedback, setfeedback] = useState("");
  const { id } = useParams();

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // post feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      feedback,
    };
    axios
      .post(
        `http://localhost:5000/feedback/api/create-feedback/${id}`,
        data,
        config
      )
      .then((res) => {
        toast.success("Feedback posted successfully");
        setfeedbacks([...feedbacks, res.data.data]);
        setfeedback("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setfeedback("");
      });
  };

  // post upvote
  const handleUpvote = (id) => {
    const data = {
      id,
    };
    axios
      .put(`http://localhost:5000/feedback/api/upvote/`, data, config)
      .then((res) => {
        toast.success("Upvoted successfully");
        setfeedbacks([...feedbacks, res.data.feedback]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  // get feedbacks

  useEffect(() => {
    axios
      .get(`http://localhost:5000/feedback/api/get-feedbacks/${id}`, config)
      .then((res) => {
        const data = res.data.feedbacks;
        setfeedbacks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <h2>What Investors Say</h2>
      <div className="comment-form">
        <input
          type="text"
          placeholder="Write a comment"
          value={feedback}
          onChange={(e) => setfeedback(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="comments">
        <div className="comment">
          {feedbacks ? (
            feedbacks.map((feedback) => {
              return (
                <>
                  <div className="d-flex flex-wrap justify-content-between mt-4">
                    <div className="comment d-flex flex-wrap">
                      <div>
                        <img
                          src={feedback.profile.avatar}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          alt={feedback.user.name}
                        />
                      </div>
                      <div className="info ms-2">
                        <span className="fs-5 fw-semibold ">
                          {feedback.user.name}
                        </span>
                        <p className="fs-6">{feedback.feedback}</p>
                      </div>
                    </div>
                    <div>
                      <span className="fs-6">
                        {moment(feedback.date).format("DD-MM-YYYY")}
                      </span>
                      &emsp;
                      <br />
                      <span className="fs-6">
                        {moment(feedback.date).format("hh:mm a")}
                      </span>
                      &emsp; &emsp;
                     
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <h4 className="mt-5">No feedbacks yet</h4>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default WhatInvestorSay;
