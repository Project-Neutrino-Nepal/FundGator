import { MinusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function LineChart() {
  const { Title, Paragraph } = Typography;

  // get data from backend
  const [fundGoal, setFundGoal] = useState([]);
  const [fundRaised, setFundRaised] = useState([]);
  const [date1, setDate1] = useState([]);
  const [date, setDate] = useState([]);


  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/company/api/get-fund-by-date")
        .then((res) => {
          let fundgoal = res.data.reason;
          let fundRaised = res.data.company;
          // console.log(fundgoal);
          // console.log(fundRaised);
          
          setFundGoal(fundgoal?.map((fundgoal) => fundgoal.amount));
          setFundRaised(
            fundRaised?.map((fundRaised) => fundRaised.fund_raised)
          );
          // setDate(fundRaised?.map((fundRaised) => fundRaised.date));
          // setDate1(fundgoal?.map((fundgoal) => fundgoal.date));

        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const lineChart = {
    series: [
      {
        name: "Total FundGoal",
        data: fundGoal,
        offsetY: 0,
      },
      {
        name: "Total Fund Raised",
        data: fundRaised,
        offsetY: 0,
      },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },

      legend: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        // categories: [
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        //   "Oct",
        // ],
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Active Users</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
