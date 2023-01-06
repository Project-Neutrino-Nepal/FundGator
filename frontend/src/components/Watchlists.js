import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Company from "./company";
const { Meta } = Card;

function WatchList() {
  const [companies, setCompany] = useState([]);

  const removeAll = () => {
    try {
      axios
        .delete(
          "http://localhost:5000/company/api/clear-watchlist",

          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success(
            "All companies have been removed from your watchlist",
            setTimeout(() => {
              this.setState({ companies: [] });
              window.location.reload();
            }, 2000)
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/get-watchlist/", config)
      .then((res) => {
        let company = res.data.watchlist;
        setCompany(company);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (companies.length === 0) {
    return (
      <div className="container">
        <div className="row ">
          <div className="col-11">
            <h1> No Watchlist</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <toastContainer />
        <div className="d-flex flex-wrap justify-content-between">
          <div className="col-7">
            <h1>
              {companies.length}
              &emsp; Watchlist
            </h1>
          </div>
          <div>
            <button
              className="btn btn-danger fs-6"
              onClick={() => {
                removeAll();
              }}
            >
              Delete All
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap   ">
              {companies.map((company) => (
                <Company key={company._id} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WatchList;
