import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Company from "./company";
const { Meta } = Card;

function WatchList() {
  const [companies, setCompany] = useState([]);

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
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-12 mt-5">
            <h1> No Watchlist</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-12 mt-5">
            <h1>Watchlist</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap   ">
              {companies.map((company) => (
                <Link to={`/detail/${company._id}`}>
                  <Company key={company._id} company={company} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WatchList;
