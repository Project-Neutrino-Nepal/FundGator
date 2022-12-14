import React from "react";
import "../css/feeds.css";
const Feeds = () => {
  return (
    <>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-7">
            <div className="card">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center">
                  <img
                    src="https://i.imgur.com/UXdKE3o.jpg"
                    width={50}
                    className="rounded-circle"
                  />
                  <div className="d-flex flex-column ms-2">
                    <span className="font-weight-bold">Jeanette Sun</span>
                    <small className="text-primary">Collegues</small>
                  </div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis">
                  <small className="me-2">20 mins &nbsp;</small>
                  <i className="fa fa-ellipsis-h" />
                </div>
              </div>
              <div className="p-2 ">
                  <p className="">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Magni saepe facilis, atque illo libero molestiae voluptatum
                    praesentium sed fugiat obcaecati consectetur adipisci
                    molestias ullam? Nobis minus vitae id tempora tempore?  <span className="btn btn-border-0 text-primary ">see more...</span>
                  </p>
              </div>
              <img
                src="https://i.imgur.com/xhzhaGA.jpg"
                className="img-fluid"
              />
              <div className="p-1">
                <span className="fs-6 ms-2 " style={{textTransform:'capitalize'}}>
                  <i className="fa fa-thumbs-up " />&nbsp;10 Likes &emsp;. 200 comments &emsp;. 20 shares
                </span>
                <hr />
                <div className="d-flex flex-wrap justify-content-between align-items-center ms-2 me-2 ">
                  <div className=" align-items-center">
                    <span > <i className="fa fa-thumbs-up"></i> &nbsp; Like</span>
                  </div>
                  <div className=" ">
                    <span className="fa fa-comment" />
                    &nbsp; comment
                  </div>
                  <div className=" ">
                    <span className="fa fa-heart text-primary" />
                    &nbsp; favoutite
                  </div>
                  <div className=" ">
                    <span > <i className="fa fa-share "></i> &nbsp; share </span>
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
                      <small className="comment-text">
                        Thanks for sharing!
                      </small>
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
