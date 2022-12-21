import { Button, Card, Col, Form, Input, Row, Space, Table } from "antd";

import { Link } from "react-router-dom";

// Images
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { title: "Image", dataIndex: "image" },

  {
    title: "Categories Name",
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
    title: "Date",
    dataIndex: "fund_raised",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },

  {
    title: "ACTION",
    dataIndex: "action",
  },
];

function Tag() {
  const [company, setCompany] = useState([]);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const deleteCompany = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:5000/company/api/delete-company/" + id, config)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  // fetching Profile data from API and map multiple times to show in table
  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/all-companies", config)
      .then((res) => {
        const companies = res.data.company;
        setCompany(companies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const comapnyData = company.map((company) => {
    return {
      key: company._id,
      image: <img src={company.image} alt="company" width="50" height="50" />,
      name: company.name,

      action: (
        <div className="d-flex flex-wrap justify-content-evenly">
          <Link to={`/dashboard/company-details/${company._id}`}>
            <i className="fa-solid fa-eye text-info"></i>
          </Link>
          <a onClick={() => deleteCompany(company._id)}>
            <i className="fa-solid fa-trash text-danger"></i>
          </a>
        </div>
      ),
    };
  });

  return (
    <>
      <ToastContainer />
      <div className="tabled" id="adminCompany">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Tags"
            >
              {/* add category field */}
              <div className=" ms-5 m-4">
                <h5 className="mb-3 fw-semibold">Add tags here</h5>

                <Form
                  name="basic"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                  //   initialValues={{ remember: true }}
                  //   onFinish={onFinish}
                  //   onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <span className="d-flex  ">
                    <Form.Item
                      wrapperCol={{ span: 20 }}
                      label="Add Tags"
                      name="tag"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
                      <Button type="primary" htmlType="submit">
                        Add Tags
                      </Button>
                    </Form.Item>
                  </span>
                </Form>
              </div>
              <hr />
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={comapnyData}
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

export default Tag;
