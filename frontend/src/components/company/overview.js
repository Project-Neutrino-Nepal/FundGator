
import axios from "axios";
import React, { useEffect, useState } from "react";



const Overview = () => {
  const [reason, setReason] = useState();
  useEffect(() => {
    axios.get("http://localhost:5000/company/api/all-companies").then((res) => {
    
      setReason(res.data);
    });
  }, []);

  console.log("test");
  return (
    <>
      <div className="container mt-5 card ">
        <div className="row ">
          <div className="card mb-5 mt-3" style={{ width: '100%' }}>
            <h4 className="mt-4 fw-semibold">Highlights</h4> <br></br>
            <div className="d-flex flex-wrap">
              <div>
                <p
                  className="   border border-dark text-dark text-center me-2 fs-5 fw-semibold "
                  style={{ borderRadius: 100, height: 35, width: 35 }}
                >
                  1
                </p>
              </div>
              <div>
                <p className="fs-5 ">
                  {reason?.forEach((reason) => {
                    return (
                      <div>
                        <p>{reason.reason0}</p>
                      </div>
                    )
                  })}
                </p>
                 
              </div>
            </div>
            <hr />
            <div className="d-flex flex-wrap">
              <div>
                <p
                  className="  border border-dark text-dark text-center me-2 fs-5 fw-semibold "
                  style={{ borderRadius: 100, height: 35, width: 35 }}
                >
                  2
                </p>
              </div>
              <div>
                <p className="fs-5 ">This is very helpful in fund generatig</p>
              </div>
            </div>
            <hr />
            <div className="mb-3">
              <h4 className="mt-3 fs-4 fw-semibold">Our Founder</h4>
              <div className="d-flex flex-wrap">
                <div>
                <img
                  src="http://www.yogaiya.in/wp-content/uploads/2018/03/Swami-Ramdev.jpg"
                  alt=""
                  style={{ height: 85, width: 85 }}
                  className="rounded-circle mt-3"
                />
                </div>
                
                <div className="mt-5 ">
                  {" "}
                  <p className="fs-5 fw-semibold ms-3 ">
                    Ramdev Baba
                    <span className="fa-solid fa-ellipsis ms-2 fs-4  fw-semibold"></span>
                  </p>
                </div>
              </div>
            </div>
        <div className="mt-4">
            <hr />
            <h4 className="mt-3 fs-4 fw-semibold">Downloads</h4>
            <div>
                <p className="fs-6 fw-semibold mt-4 text-decoration-underline " > company registration document.png</p>
            </div>

        </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
