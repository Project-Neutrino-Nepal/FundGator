import React from "react";
import Chart from "react-apexcharts";

const Portfolio = () => {
  const series = [
    //data on the y-axis
    {
      name: "Investment",
      data: [],
    },
  ];
  const options = {
    //data on the x-axis
    chart: { id: "bar-chart" },
    xaxis: {
      categories: [],
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
        <Chart options={options} series={series} type="bar" width="950" />
      </div>
    </>
  );
};

export default Portfolio;
