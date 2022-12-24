import { Button, Card, Col, Form, Input, Row, Space, Table } from "antd";

import { Link, useParams } from "react-router-dom";

// Images
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const columns = [
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
    dataIndex: "date",

    sorter: (a, b) => a.name.localeCompare(b.name),
  },

  {
    title: "ACTION",
    align: "center",
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

  // delete category
  const deleteCategory = (id) => {
    console.log(id);
    axios

      .delete("http://localhost:5000/admin/api/delete-category/" + id, config)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/api/get-all-categories", config)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const { id } = useParams();
  // get category by id
  const [category, setCategory] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/api/get-category/" + id, config)
      .then((res) => {
        setCategory(res.data.category.name);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log(category);

  // update category by id
  const updateCategory = (e) => {
    e.preventDefault();
    const data = {
      name: categoryName,
    };
    axios
      .put(
        "http://localhost:5000/admin/api/update-category/" + id,
        data,
        config
      )
      .then((res) => {
        console.log(res);
        toast.success(
          res.data.message,
          setTimeout(() => {
            window.location.assign("/dashboard/categoryPage");
          })
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  //    add category to database
  const [categoryName, setCategoryName] = useState();
  const addCategory = (e) => {
    e.preventDefault();
    const data = {
      name: categoryName,
    };
    try {
      axios
        .post("http://localhost:5000/admin/api/create-category", data, config)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error("Please enter category name");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const categoryData = categories.map((category) => {
    return {
      key: category._id,
      name: category.name,
      date: moment(category.date).format("DD/MM/YYYY" + " " + "hh:mm:ss"),
      action: (
        <div className="d-flex flex-wrap justify-content-evenly">
          <Link to={`/dashboard/categoryPage/${category._id}`}>
            <i className="fa-solid fa-edit text-info"></i>
          </Link>

          <a onClick={() => deleteCategory(category._id)}>
            <i className="fa-solid fa-trash text-danger"></i>
          </a>
        </div>
      ),
    };
  });

  const ids = useParams();
  // strigify ids
  const idstring = JSON.stringify(ids);
  const button = () => {
    if (idstring.length > 2) {
      return (
        <Button type="primary" onClick={updateCategory}>
          Update Category
        </Button>
      );
    } else {
      return (
        <Button type="primary" onClick={addCategory}>
          Add Category
        </Button>
      );
    }
  };

  const head = () => {
    if (idstring.length > 2) {
      return <h5 className="mb-3 fw-semibold">Update Category here</h5>;
    } else {
      return <h5 className="mb-3 fw-semibold">Add Category here</h5>;
    }
  };

  const nameValue = () => {
    if (idstring.length > 2) {
      return (
        <Form.Item
          label="Category Name"
          name="category"
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <Input placeholder={category} />
        </Form.Item>
      );
    } else {
      return (
        <Form.Item
          label="Category Name"
          name="category"
          onChange={(e) => setCategoryName(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      );
    }
  };

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
                {head()}

                <Form
                  name="basic"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 10 }}
                  autoComplete="off"
                >
                  <span className="  ">
                    {/* <Form.Item
                      label="Category Name"
                      name="category"
                      onChange={(e) => setCategoryName(e.target.value)}
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item> */}
                    {nameValue()}
                    <hr />

                    <Form.Item wrapperCol={{ offset: 1, span: 4 }}>
                      {button()}
                    </Form.Item>
                  </span>
                </Form>
              </div>
              <hr />
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={categoryData}
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
