import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Portfolio = () => {
  const [fund, setFund] = useState([]);
  const [date, setDate] = useState([]);
 
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
          setFund(portfolios?.map((portfolio) => portfolio.amount));
          setDate(portfolios?.map((portfolio) => portfolio.date));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const series = [
    {
      name: "Investment Rs.",
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

  

  return (
    <>
      <div className="m-5">
        <h1>Overall Portfolio</h1>
        <Chart options={options} series={series} type="line" width="1150" />
      </div>
    </>
  );
};

export default Portfolio;
