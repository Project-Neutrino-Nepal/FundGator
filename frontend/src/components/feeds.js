import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../css/feeds.css";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal.js";
const Feeds = ({ feed, changemodel, modelvalue }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const currentuser = localStorage.getItem("userInfo");
  const loginuser = currentuser ? JSON.parse(currentuser) : null;
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  let time = new Date(feed.date).toLocaleDateString();
  // calculate min difference
  let minDiff = Math.floor(
    (new Date().getTime() - new Date(feed.date).getTime()) / 1000 / 60
  );

  // calculate hour difference
  let hourDiff = Math.floor(
    (new Date().getTime() - new Date(feed.date).getTime()) / 1000 / 60 / 60
  );

  // calculate day difference
  let dayDiff = Math.floor(
    (new Date().getTime() - new Date(feed.date).getTime()) / 1000 / 60 / 60 / 24
  );

  // show time
  let showTime = "";
  if (minDiff < 60) {
    showTime = minDiff + " min ago";
  } else if (hourDiff < 24) {
    showTime = hourDiff + " hour ago";
  } else {
    showTime = dayDiff + " day ago";
  }

  // set time
  time = showTime;

  const [likes, setLike] = useState(feed.likes.length);
  const [isLiked, setIsLiked] = useState(feed.isLiked);
  const [post, setPost] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(feed.comments.length);

  // get current user id
  const currentUser = localStorage.getItem("id");

  useEffect(() => {
    setIsLiked(feed.likes.includes(currentUser));
  }, [currentUser, feed.likes]);
  // like handler to like and unlike post and update likes count and isLiked state

  const likeHandler = async () => {
    try {
      await axios

        .put("http://localhost:5000/posts/api/like-post/" + feed._id, null, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          let post = res.data.post;
          // setLike(post.likes.length);
          // setIsLiked(post.isLiked);
          // console.log(post);
        });
    } catch (err) {}
    if (isLiked) {
      setLike(likes - 1);
      setIsLiked(false);
    } else {
      setLike(likes + 1);
      setIsLiked(true);
    }
  };

  // comment handler
  const commentHandler = async () => {
    const data = {
      text: commentText,
    };
    try {
      await axios
        .put("http://localhost:5000/posts/api/comment-post/" + feed._id, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            let post = res.data.post;
            setPost(post);
            setCommentText("");
          },
          [commentText, setCommentText]
        );
    } catch (err) {
      console.log(err);
    }
    setComments(comments + 1);
  };

  return (
    <>
      <div className="row d-flex align-items-center justify-content-center mb-2">
        <div className="col-md-7">
          <div className="card">
            <div className="d-flex justify-content-between p-2 px-3">
              <div
                className="d-flex flex-row align-items-center btn"
                onClick={() => {
                  window.location.href = `/profile/${feed.user}`;
                }}
              >
                <img
                  src={feed.profile.avatar}
                  width={50}
                  height={50}
                  className="rounded-circle"
                  alt=""
                />
                <div className="d-flex flex-column ms-2">
                  <span className="font-weight-bold">
                    {feed.profile.legal_name}
                  </span>
                  <small className="text-primary">{feed.profile.skills}</small>
                </div>
              </div>
              <div className="d-flex flex-row mt-1 ellipsis">
                <small className="me-2">{time} &nbsp;</small>

                {loginuser.user._id === feed.user && (
                  <div className="dropdown">
                    <a
                      href="#"
                      className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                      id="dropdownUser1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BsThreeDots size={20} color="#111" />
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-dark text-small shadow"
                      aria-labelledby="dropdownUser1"
                    >
                      <li
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        // onClick={() => setShow(true)}
                        onClick={() => modelvalue(feed)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2"
                      >
                        Edit
                        {/* <EditPost
                        show={show}
                        id={feed._id}
                        onHide={() => setShow(false)}
                      /> */}
                      </li>

                      {/* <li>
                      <Link
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShow(true)}
                      >
                        Edit
                        <EditPost
                          show={show}
                          id={feed._id}
                          onHide={() => setShow(false)}
                        />
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShow(true)}
                        >
                          Edit
                          <EditPost
                            show={show}
                            id={feed._id}
                            onHide={() => setModalShow(false)}
                          />
                        </Link>
                      </li> */}

                      <li>
                        <Link
                          className="dropdown-item"
                          aria-current="page"
                          to="deletepost"
                        >
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="p-2 ">
              <p align="justify">
                {feed.text
                  ? feed.text.length > 300
                    ? feed.text.substring(0, 300) + " ...... Read more"
                    : feed.text
                  : ""}
                <span className="btn btn-border-0 text-primary "></span>
              </p>
            </div>
            {feed.image ? (
              <img src={feed.image} className="img-fluid" alt="" />
            ) : (
              <video src={feed.video} className="img-fluid" controls={true} />
            )}

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
                    {isLiked ||
                    feed.likes.includes(
                      JSON.parse(localStorage.getItem("userInfo")).user._id
                    ) ? (
                      <Link
                        className="btn btn-border-none text-primary bg-light"
                        onClick={() => {
                          likeHandler();
                        }}
                      >
                        <i className="fa fa-thumbs-up text-primary"></i> &nbsp;
                        Liked
                      </Link>
                    ) : (
                      <Link
                        className="btn btn-border-none"
                        onClick={() => {
                          likeHandler();
                        }}
                      >
                        <i className="fa fa-thumbs-up"></i> &nbsp; Like
                      </Link>
                    )}
                  </span>
                </div>

                <div className=" ">
                  <span>
                    <Link
                      className="btn btn-border-none"
                      onClick={() => {
                        console.log("comment");
                      }}
                    >
                      <i className="fa fa-comment "></i> &nbsp; comment
                    </Link>
                  </span>
                </div>
                <div className=" ">
                  <span>
                    <Button
                      onClick={() => setModalShow(true)}
                      className="bg-none"
                    >
                      <i className="fa fa-share  "></i>&nbsp; Share
                    </Button>

                    <MyVerticallyCenteredModal
                      show={modalShow}
                      feed={feed}
                      onHide={() => setModalShow(false)}
                    />
                  </span>
                </div>
              </div>

              <hr />
              <div className="comments">
                {feed.comments.map((comment) => {
                  return (
                    <div className="mb-2">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div>
                            <img
                              src={comment.profile.avatar}
                              width={40}
                              className="rounded-image"
                              alt=""
                            />
                          </div>
                          <div className="d-flex flex-column ms-2">
                            <span className="name">
                              {comment.profile.legal_name}
                            </span>
                            <small className="comment-text">
                              {comment.text}
                            </small>
                          </div>
                        </div>

                        <div className="d-flex flex-row status">
                          <small>{moment(comment.date).fromNow()}</small>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="comment-input">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                  />
                  <div className="fonts">
                    <Link
                      onClick={() => {
                        commentHandler();
                      }}
                    >
                      <i className="fa fa-send-o"></i>
                    </Link>
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
