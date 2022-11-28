import { Button, Card, Col, Input, Row, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>

        <Input
          placeholder={`Search Name`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    }


    
    
  },
  {
    title: "Email",
    dataIndex: "function",
    key: "function",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (text) => (text ? text : "N/A"),
  },
  {
    title: "PAN No",
    dataIndex: "pan_No",
    key: "pan_No",
    // if pan_No is not available then show N/A
    render: (text) => (text ? text : "N/A"),
  },
  {
    title: "Member Since",
    key: "employed",
    dataIndex: "employed",
    // first sort by date, then by name
    sorter: (a, b) => a.employed.localeCompare(b.employed),
    // show the date in a readable format
    render: (text) => new Date(text).toLocaleDateString(),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (text) => (text ? text : "N/A"),
  },
  {
    title: "Actions",
    key: "action",
    // render the action buttons with green and red colors on hover
    render: (text, record) => (
      <Space size="middle">
        <a style={{ color: "red" }}>Suspend</a>
      </Space>
    ),
  },
];

function InvestorAdmin() {
  const [profiles, setProfiles] = useState([]);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // fetching Profile data from API and map multiple times to show in table
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile//api/get-profiles", config)
      .then((res) => {
        const profiles = res.data.profiles;
        setProfiles(profiles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = profiles.map((profile) => {
    return {
      key: profile._id,
      profile: (
        <img
          src={profile.avatar}
          alt="profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
      name: profile.legal_name ? profile.legal_name : profile.name,
      function: profile.email,
      employed: profile.createdAt,
      phone: profile.phone,
      pan_No: profile.pan_No,
    };
  });

  return (
    <>
      <div className="tabled">
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
    </>
  );
}

export default InvestorAdmin;
