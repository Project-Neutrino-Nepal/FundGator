import React from "react";
const ARD = () => {
  return (
    <div className="pb-3">
      <iframe
        id="doc"
        title="doco"
        className=" w-100 "
        style={{height:"900px"}}
        src="https://www.issuelab.org/resources/15957/15957.pdf"
        frameborder="0"
      ></iframe>
      <div className="buttons mt-2 d-flex justify-content-between ">
        <button className="btn btn-primary col-3">Delete</button>
        <button className="btn btn-success col-3">Approve</button>
        <button className="btn btn-danger  col-3">Reject</button>
      </div>
    </div>
  );
};
export default ARD;


