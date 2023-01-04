import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Portfolio = () => {
  const [fund, setFund] = useState([]);
  const [date, setDate] = useState([]);
  const [company, setCompany] = useState([]);
  const [amount, setAmount] = useState([]);
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

  // get data from backend
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/company/api/get-fund-by-company", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          let portfolios = res.data.portfolios;
          setAmount(portfolios?.map((portfolios) => portfolios.amount));
          setCompany(portfolios?.map((portfolios) => portfolios.company.name));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const series2 = [
    {
      name: "Investment Rs.",
      data: amount,
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
        <Chart options={options} series={series} type="line" width="1150" />
      </div>
      <div className="m-5">
        <h1>Portfolio By Company</h1>
        <Chart
          // change bg color of bar chart for each company

          options={{
            ...options2,
            colors: "#a103fc",
          }}
          series={series2}
          type="bar"
          width="1150"
        />
      </div>
    </>
  );
};

export default Portfolio;
