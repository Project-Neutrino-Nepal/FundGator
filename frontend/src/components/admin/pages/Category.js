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

function Category() {
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

  //   image upload
  const [imgfile, uploadimg] = useState([]);
  console.log("Image FIles", imgfile);
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      uploadimg((imgfile) => [
        ...imgfile,
        URL.createObjectURL(e.target.files[0]),
      ]);
    }
  };

  const [category, setCategory] = useState([]);
  //    add category to database
  const addCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("image", e.target.image.files[0]);
    try {
      axios
        .post(
          "http://localhost:5000/admin/api/create-category",
          formData,
          config
        )
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
              className="criclebox tablespace mb-4"
              title="Category"
            >
              {/* add category field */}
              <div className=" ms-5 m-4">
                <h5 className="mb-3 fw-semibold">Add Category here</h5>

                <Form
                  name="basic"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 8 }}
                  //   initialValues={{ remember: true }}
                  //   onFinish={onFinish}
                  //   onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <span className="  ">
                    <Form.Item
                      label="Category Name"
                      name="category"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <hr />

                    <div className="d-flex mb-3 ms-5">
                      <div>
                        <h6 className="mb-3 fw-semibold">upload image</h6>

                        <input type="file" onChange={imgFilehandler} />
                      </div>

                      <div>
                        <h6 className="mb-3 fw-semibold">preview</h6>

                        {imgfile.map((elem) => {
                          return (
                            <>
                              <span key={elem}>
                                <img
                                  src={elem}
                                  height="200"
                                  width="200"
                                  alt="med1"
                                />
                              </span>
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <hr />

                    <Form.Item wrapperCol={{ offset: 1, span: 4 }}>
                      <Button className="ms-0 m-3 w-50" type="primary" htmlType="submit">
                        Submit
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

export default Category;
