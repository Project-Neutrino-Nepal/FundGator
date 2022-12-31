import { Button, Card, Col, Form, Input, Row, Space, Table } from "antd";

import { Link, useParams } from "react-router-dom";

// Images
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    title: "Tags Name",
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

function Tag() {
  const [company, setCompany] = useState([]);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // delete Tag
  const deleteTags = (id) => {
    console.log(id);
    axios

      .delete("http://localhost:5000/admin/api/delete-tags/" + id, config)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const [Tags, setTags] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/api/get-tags", config)
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  let { id } = useParams();
  // get tags by id
  const [Tag, setTag] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/api/get-tags/" + id, config)
      .then((res) => {
        setTag(res.data.tags.name);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log(Tag);

  // update Tag by id
  const updateTag = (e) => {
    e.preventDefault();
    const data = {
      name: TagName,
    };
    axios
      .put("http://localhost:5000/admin/api/update-tags/" + id, data, config)
      .then((res) => {
        console.log(res);
        toast.success(
          res.data.message,
          setTimeout(() => {
            window.location.assign("/dashboard/tagPage");
          })
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  //    add Tag to database
  const [TagName, setTagName] = useState();
  const addTag = (e) => {
    e.preventDefault();
    const data = {
      name: TagName,
    };
    try {
      axios
        .post("http://localhost:5000/admin/api/create-tags", data, config)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error("please enter a valid tag name");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const TagData = Tags.map((Tag) => {
    return {
      key: Tag._id,
      name: Tag.name,
      date: moment(Tag.date).format("DD/MM/YYYY" + " " + "hh:mm:ss"),
      action: (
        <div className="d-flex flex-wrap justify-content-evenly">
          <Link to={`/dashboard/tagPage/${Tag._id}`}>
            <i className="fa-solid fa-edit text-info"></i>
          </Link>

          <a onClick={() => deleteTags(Tag._id)}>
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
        <Button type="primary" onClick={updateTag}>
          Update Tag
        </Button>
      );
    } else {
      return (
        <Button type="primary" onClick={addTag}>
          Add Tag
        </Button>
      );
    }
  };

  const head = () => {
    if (idstring.length > 2) {
      return <h5 className="mb-3 fw-semibold">Update Tag here</h5>;
    } else {
      return <h5 className="mb-3 fw-semibold">Add Tag here</h5>;
    }
  };

  const nameValue = () => {
    if (idstring.length > 2) {
      return (
        <Form.Item
          label="Tag Name"
          name="Tag"
          onChange={(e) => setTagName(e.target.value)}
        >
          <Input placeholder={Tag} />
        </Form.Item>
      );
    } else {
      return (
        <Form.Item
          label="Tag Name"
          name="Tag"
          onChange={(e) => setTagName(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input tag name!",
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
              title="Tag"
            >
              {/* add Tag field */}
              <div className=" ms-5 m-4">
                {head()}

                <Form
                  name="basic"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 10 }}
                  autoComplete="off"
                >
                  <span className="  ">
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
                  dataSource={TagData}
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
