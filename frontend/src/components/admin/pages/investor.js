import { Avatar, Button, Card, Col, Row, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

// Images
const { Title } = Typography;
// table code start
const columns = [
  {
    title: "AUTHOR",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "FUNCTION",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "EMPLOYED",
    key: "employed",
    dataIndex: "employed",
  },
];



function InvestorAdmin() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [image, setPreview] = useState("");

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
        console.log(res.data.profiles);
        const profiles = res.data.profiles;
   
        
     profiles.map((profile) => {
        setName(profile.user.name);
        setEmail(profile.user.email);
        setCreatedAt(profile.user.createdAt);
        setPreview(profile.avatar);
      });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

     
const data = [
  {
    key: "1",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={image}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
            <p>{email}</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button type="primary" className="tag-primary">
          ONLINE
        </Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>{createdAt}</span>
          <a href="#">Edit</a>
        </div>
      </>
    ),
  },
];
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Authors Table"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
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

export default InvestorAdmin;
