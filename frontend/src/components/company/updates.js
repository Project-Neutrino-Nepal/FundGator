import React from "react";
import flag from "../../assets/image/flag.svg";

const Update = () => {
  return (
    <>
      <div className="container mt-5 card col-7 ">
        <div className="row ">
          <div className="card mb-5 mt-3" style={{ width: "100%" }}>
            <div
              className="d-flex flex-wrap 
              align-items-center justify-content-center mt-5"
            >
              <img
                src={ flag }
                alt=""
                style={{ height: 150, width: 150 }}
                className="rounded-circle mt-3"
              />
            </div>
            <div className="text-center">
            <div className="text-center mt-4 fs-6 fw-semibold">fundgator has not posted any updates yet</div>
            <span className="btn btn-primary w-20 text-center mt-3 btn-center">Post update</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
