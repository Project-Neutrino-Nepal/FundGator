import {
  Button,
  Card,
  Col,
  Input,
  message,
  Progress,
  Row,
  Space,
  Table,
} from "antd";

import { Link } from "react-router-dom";

// Images
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const columns = [
  {
    title: "PROFILE",
    dataIndex: "profile",
  },
  {
    title: "COMPANIES NAME",
    dataIndex: "name",
    // search company by name
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
            type="danger"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record.name.toLowerCase().includes(value.toLowerCase()),

    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Fund Goal",
    dataIndex: "fund_goal",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },

  {
    title: "Fund Raised",
    dataIndex: "fund_raised",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "STATUS",
    dataIndex: "status",
  },
  {
    title: "Fund Completion",
    dataIndex: "completion",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "ACTION",
    dataIndex: "action",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
];

function CompanyAdmin() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [company, setCompany] = useState([]);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // fetching Profile data from API and map multiple times to show in table
  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/all-companies", config)
      .then((res) => {
        const companies = res.data.company;
        setCompany(companies);
        console.log(companies.verified);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const comapnyData = company.map((company) => {
    return {
      key: company._id,
      profile: (
        <img
          src={company.image}
          alt="profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
      name: company.name,
      age: company.budget,
      address: company.address,
      fund_goal: company.fund_goal,
      status: company.verified ? "Verified" : "Not Verified",
      fund_raised: company.fund_raised,
      completion: (
        <Progress
          percent={(company.fund_raised / company.fund_goal) * 100}
          size="small"
          strokeColor="#4caf50"
        />
      ),
      action: (
        <div className="d-flex flex-wrap justify-content-evenly">
          <Link to={`/dashboard/company-details/${company._id}`}>
            <i className="fa-solid fa-eye text-info"></i>
          </Link>
          <Link to={`/admin/company/${company._id}`}>
            <i className="fa-solid fa-trash text-danger"></i>
          </Link>
        </div>
      ),
    };
  });

  return (
    <>
      <div className="tabled" id="adminCompany">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Company Table"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={comapnyData}
                  pagination={false}
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

export default CompanyAdmin;
