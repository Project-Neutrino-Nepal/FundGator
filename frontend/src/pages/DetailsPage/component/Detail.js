import { SearchOutlined } from "@ant-design/icons";
import { Card, Col, Input, Progress, Row, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper/Detail";

const columns = [
  {
    title: "Profile",
    dataIndex: "profile",
    key: "profile",
  },
  {
    title: "Legal Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => (text ? text : "N/A"),
    // search in row with name
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search Name`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  },
  {
    title: "Email",
    dataIndex: "function",
    key: "function",
  },
  {
    title: "Amount Invested",
    dataIndex: "amount",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },

  {
    title: "Fund Completion",
    dataIndex: "completion",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
];
const Detail = ({ company }) => {
  const Revenue = company.fundRaised;
  const FundGoal = company.fundGoal;
  const ID = company.id;
  const [investors, setInvestors] = useState([]);
  const RevenueGrowth = (Revenue / FundGoal) * 100;

  const marketCap = RevenueGrowth * 1000000;

  // get top investor of the company
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/get-investors/" + ID, config)
      .then((res) => {
        let investors = res.data.investors;
        setInvestors(investors);
        console.log(investors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = investors.map((investor) => {
    return {
      key: investor._id,
      profile: (
        <img
          src={investor.profile.avatar}
          alt="investor"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
      name: investor.profile.legal_name
        ? investor.profile.legal_name
        : investor.profile.name,
      function: investor.profile.email,
      completion: (
        <Progress
          percent={(investor.amount / FundGoal) * 100}
          size="small"
          strokeColor="#4caf50"
        />
      ),
      amount: investor.amount,
    };
  });

  return (
    <Wrapper>
      <section className="financial">
        <h3>Financial</h3>
        <div className="financial__details">
          <div className="financial__details--table">
            <table className="broder-5 table">
              <tbody>
                <tr>
                  <td>Revenue</td>
                  <td>{Revenue}</td>
                </tr>
                <tr>
                  <td>Revenue Growth</td>
                  <td>{RevenueGrowth}</td>
                </tr>
                <tr>
                  <td>Market Cap</td>
                  <td>{marketCap}</td>
                </tr>
                <tr>
                  <td>Equity Sold</td>
                  <td>{(Revenue / FundGoal) * 100}</td>
                </tr>
                <tr>
                  <td>Equity Released</td>
                  <td>{company.releasedEquity}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tabled" id="AdminInvestor">
            <Row gutter={[24, 0]}>
              <Col xs="24" xl={24}>
                <Card
                  bordered={false}
                  className="criclebox tablespace mb-24"
                  title="Investor Table"
                >
                  <div className="table-responsive">
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={true}
                      className="ant-border-space"
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Detail;
