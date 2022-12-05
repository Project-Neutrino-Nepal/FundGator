import React from "react";
import flag from "../../assets/image/flag.svg";

const Question = () => {
  return (
    <>
      <div className="container mt-5 card ">
        <div className="row ">
          <div className="card mb-5 mt-5" style={{ width: "100%" }}>
            <div className="">
              <form action="">
                <input
                  type="text"
                  placeholder="Ask a question"
                  className="w-100 p-2 border-0"
                  style={{ backgroundColor: "#f2f2f2" }}
                />
              </form>
            </div>
            <div className="d-flex flex-wrap mt-3 ms-2 me-2 justify-content-between">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="disclosure"
                  checked
                />
                <label className="form-check-label" for="disclosure">
                  Disclosure: I have a financial relationship with fundgator
                </label>
              </div>

              <div className="btn btn-primary text-white text-center w-15">
                Submit
              </div>
            </div>

            <div className="ms-2 mb-4">
              <h6>I am:</h6>

              <div className="d-flex flex-wrap justify-content-start mt-2">
                <div className="form-check ms-2 me-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="investor"
                  />
                  <label className="form-check-label" htmlFor="investor">
                    Investor
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="stockholder"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="stockholder">
                    stockholder
                  </label>
                </div>
              </div>
            </div>
<hr />
<div className="d-flex justify-content-end mt-1">
    <span className="btn text-primary border w-25  text-center">Company FAQ</span> 

</div>
            <div
              className="d-flex flex-wrap 
              align-items-center justify-content-center mt-5"
            >
              <img
                src={flag}
                alt=""
                style={{ height: 150, width: 150 }}
                className="rounded-circle mt-3"
              />
            </div>
            <div className="text-center">
              <div className="text-center mt-4 fs-6 fw-semibold">
                fundgator doesn't have any questions yet
              </div>
              {/* <span className="btn btn-primary w-20 text-center mt-3 btn-center">INVITE A FRIEND</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
