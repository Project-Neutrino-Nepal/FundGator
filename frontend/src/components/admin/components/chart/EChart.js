import { Col, Row, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function EChart() {
  const { Title, Paragraph } = Typography;
   // get data from backend
   const [fundGoal, setFundGoal] = useState([]);
   const [fundRaised, setFundRaised] = useState([]);
   const [date, setDate] = useState([]);
 
 
   useEffect(() => {
     try {
       axios
         .get("http://localhost:5000/company/api/get-fund-by-date")
         .then((res) => {
           let fundgoal = res.data.reason;
           let fundRaised = res.data.company;
 
           setFundGoal(fundgoal?.map((fundgoal) => fundgoal.amount));
           setFundRaised(
             fundRaised?.map((fundRaised) => fundRaised.fund_raised)
           );
           setDate(fundRaised?.map((fundRaised) => fundRaised.date));
           // setDate1(fundgoal?.map((fundgoal) => fundgoal.date));
         });
     } catch (error) {
       console.log(error);
     }
   }, []);
 

  const eChart = {
    series: [
      {
        name: "Total FundGoal",
        data: fundGoal,
        color: "#fff",
      },
      {
        name: "Total Fund Raised",
        data: fundRaised,
        color: "#fff",

      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: [moment(date).format("MMM Do YY")],
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return "Rs. " + val + " thousands";
          },
        },
      },
    },
  };

   
  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
       
    </>
  );
}

export default EChart;
