import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Portfolio = () => {
  const [fund, setFund] = useState([]);
  const [date, setDate] = useState([]);
  const [company, setCompany] = useState([]);
  // get data from backend
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/company/api/get-fund/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          let portfolios = res.data.portfolios;
          let company = res.data.company;
          setFund(portfolios?.map((portfolio) => portfolio.amount));
          setDate(portfolios?.map((portfolio) => portfolio.date));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const series = [
    {
      name: "Investment",
      data: fund,
    },
  ];
  const options = {
    chart: { id: "bar-chart" },
    xaxis: {
      categories: date.map((date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      }),
    },
  };

  const series2 = [
    {
      name: "Investment",
      data: fund,
    },
  ];
  const options2 = {
    chart: { id: "bar-chart" },
    xaxis: {
      categories: company,
    },
  };


  return (
    <>
      <div className="m-5">
        <h1>Overall Portfolio</h1>
        <Chart options={options} series={series} type="line" width="950" />
      </div>
      <div className="m-5">
        <h1>Portfolio By Category</h1>
        <Chart options={options2} series={series2} type="bar" width="950" />
      </div>
    </>
  );
};

export default Portfolio;
