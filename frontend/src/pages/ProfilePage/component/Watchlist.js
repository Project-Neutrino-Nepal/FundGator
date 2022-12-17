import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Company from "../../../components/company";
const { Meta } = Card;

function Watchlist() {
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

  return (
    <div className="container mt-5">
      <h2>Companies Watchlist</h2>

      <div className="d-flex flex-wrap   ">
        {companies.map((company) => (
          <Link to={`/detail/${company._id}`}>
            <Company key={company._id} company={company} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
