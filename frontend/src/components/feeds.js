import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/feeds.css";
const Feeds = ({ feed }) => {
  console.log(feed);
  let time = new Date(feed.date).toLocaleDateString();
  // calculate day difference
  let dayDiff = Math.floor(
    (new Date().getTime() - new Date(feed.date).getTime()) / 1000 / 60 / 60 / 24
  );
  if (dayDiff === 0) {
    time = "Today";
  } else if (dayDiff === 1) {
    time = "Yesterday";
  } else {
    time = `${dayDiff} days ago`;
  }
  // count likes
  let likes = feed.likes.length;
  // count comments
  let comments = feed.comments.length;

 

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  console.log(feed._id);

  // like handler to post like
  const likeHandler = async () => {
    try {
      await axios
        .put("http://localhost:5000/posts/api/like-post/" + feed._id,feed.user, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          config,
        })
        .then((res) => {
          alert("Post created successfully");
          console.log(res.data);
        });
    } catch (err) {
      alert("Error in creating post");
      console.log(err);
    }
  };

  return (
    <>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-7">
          <div className="card">
            <div className="d-flex justify-content-between p-2 px-3">
              <div className="d-flex flex-row align-items-center">
                <img
                  src={feed.profile.avatar}
                  width={50}
                  className="rounded-circle"
                />
                <div className="d-flex flex-column ms-2">
                  <span className="font-weight-bold">
                    {feed.profile.legal_name}
                  </span>
                  <small className="text-primary">Collegues</small>
                </div>
              </div>
              <div className="d-flex flex-row mt-1 ellipsis">
                <small className="me-2">{time} &nbsp;</small>
                <i className="fa fa-ellipsis-h" />
              </div>
            </div>
            <div className="p-2 ">
              <p className="">
                {feed.text}
                <span className="btn btn-border-0 text-primary "></span>
              </p>
            </div>
            <img src={feed.image} className="img-fluid" />
            <div className="p-1">
              <span
                className="fs-6 ms-2 "
                style={{ textTransform: "capitalize" }}
              >
                &nbsp;{likes} Likes &emsp;. {comments} comments &emsp;. 20
                shares
              </span>
              <hr />
              <div className="d-flex flex-wrap justify-content-between align-items-center ms-2 me-2 ">
                <div className=" align-items-center">
                  <span>
                    <Link
                      className="btn btn-border-none text-primary"
                      onClick={() => {
                        likeHandler();
                      }}
                    >
                      <i className="fa fa-thumbs-up text-primary"></i> &nbsp;
                      Like
                    </Link>
                  </span>
                </div>
                <div className=" ">
                  <span>
                    <Link
                      className="btn btn-border-none text-primary"
                      onClick={() => {
                        console.log("comment");
                      }}
                    >
                      <i className="fa fa-comment text-primary "></i> &nbsp;
                      comment
                    </Link>
                  </span>
                </div>
                <div className=" ">
                  <span>
                    <Link className="btn btn-border-none text-primary">
                      <i className="fa fa-heart text-primary "></i> &nbsp;
                      favorite
                    </Link>
                  </span>
                </div>
                <div className=" ">
                  <span>
                    <Link className="btn btn-border-none text-primary">
                      <i className="fa fa-share text-primary  "></i> &nbsp;
                      share
                    </Link>
                  </span>
                </div>
              </div>
              <hr />
              <div className="comments">
                <div className="d-flex flex-row mb-2">
                  <img
                    src="https://i.imgur.com/9AZ2QX1.jpg"
                    width={40}
                    className="rounded-image"
                  />
                  <div className="d-flex flex-column ms-2">
                    <span className="name">Daniel Frozer</span>
                    <small className="comment-text">
                      I like this alot! thanks alot
                    </small>
                    <div className="d-flex flex-row align-items-center status">
                      <small>Like</small> <small>Reply</small>
                      <small>Translate</small> <small>18 mins</small>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row mb-2">
                  <img
                    src="https://i.imgur.com/1YrCKa1.jpg"
                    width={40}
                    className="rounded-image"
                  />
                  <div className="d-flex flex-column ms-2">
                    <span className="name">Elizabeth goodmen</span>
                    <small className="comment-text">Thanks for sharing!</small>
                    <div className="d-flex flex-row align-items-center status">
                      <small>Like</small> <small>Reply</small>
                      <small>Translate</small> <small>8 mins</small>
                    </div>
                  </div>
                </div>
                <div className="comment-input">
                  <input type="text" className="form-control" />
                  <div className="fonts">
                    <i className="fa fa-camera" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Feeds;
