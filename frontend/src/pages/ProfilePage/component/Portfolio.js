import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import folderimg from "../../../assets/image/file.svg";
import Wrapper from "../wrapper/Portfolio";
const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/portfolio/api/my-portfolio", config)
      .then((res) => {
        const portfolio = res.data.portfolio;
        setPortfolio(portfolio);
      });
  }, []);

  console.log(portfolio);
  // portfolio then show this
  if (portfolio.length === 0) {
    return (
      <Wrapper>
        <img src={folderimg} alt="" className="fileimg" />
        <p>build your own startup</p>
        <Link to="/explore">
          <button>Explore Companies</button>
        </Link>
      </Wrapper>
    );
  }
  // if portfolio not found then show this
  else
    return (
      <Wrapper>
        {portfolio.map((portfolio) => (
          <div className="post-box-list">
            <div className="post-box d-flex flex-nowrap ">
              <img src={portfolio.company.image} alt="" />
              <div className="user-info border border-0 border-end ">
                <div className="info">
                  <span className="username">{portfolio.company.name}</span>
                </div>
                <p className="description">{portfolio.company.description}</p>
              </div>
              {/* add card that has amount invested, date of investment, and button to withdraw */}

              <div className="card w-50 justify-content-center">
                <div className="card-body">
                  <p className="fs-5">
                    Amount Invested
                    <span className="fs-6">:&nbsp;Rs.{portfolio.amount}</span>
                  </p>
                  <p className="fs-5">
                    Invested On
                    <span className="fs-6">
                      :&nbsp;{new Date(portfolio.date).toLocaleDateString()}
                    </span>
                  </p>
                  <div className="d-flex flex-nowrap">
                    <button className="btn btn-success m-2" 
                    style={{backgroundColor: "green"}}
                    >Withdraw</button>
                    <button className="btn btn-primary m-2">Re Invest</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Wrapper>
    );
};

export default Portfolio;
