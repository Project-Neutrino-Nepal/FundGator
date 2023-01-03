import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Button, Card, Col, Descriptions, List, Row } from "antd";

import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import axios from "axios";
import BgProfile from "../assets/images/bg-profile.jpg";

function Profile() {
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState([]);
  const [image, setPreview] = useState({
    preview:
      "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/totw_network_profile_400.jpg",
    file: "",
  });

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // creating variable for fetching data from company api to get list of companies by user id
  const [comdatas, setComdata] = useState([]);

  // fetching Profile data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile/api/my-profile", config)
      .then((res) => {
        let program = res.data.profile;
        setName(program.name);
        setBio(program.bio);
        setEmail(program.email);
        setPhone(program.phone);
        setPan(program.pan_No);
        setAddress(program.address);

        setPreview({ ...image, preview: program.avatar });
      });
  }, []);

  // fetching company data from api thoruogh userid
  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/get-my-companies", config)
      .then((res) => {
        let comdata = res.data.companies;
        setComdata(comdata);
      });
  });

  // fetching company data from api thoruogh userid
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/api/contact-us", config)
      .then((res) => {
        let contacts = res.data.contact;
        setContact(contacts);
      });
  });

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const createButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Create new company</div>
    </div>
  );
  const navigate = useNavigate();

  const handleChange = () => {
    navigate("/raise");
  };

  const data = contact.map((item) => {
    return {
      title:
        "Name: " +
        item.f_name +
        " " +
        item.l_name +
        "  Emial: " +
        item.email +
        "  Title: " +
        item.title,

      description: item.message,
    };
  });

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={image.preview} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{name}</h4>
                  <p>Admin</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            ></Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Link to="/profile/Settings">{pencil}</Link>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              {bio ? (
                bio
              ) : (
                <h6 style={{ color: "lightblue" }}>Please Update Your Bio </h6>
              )}
            </p>
            <hr className="my-25" />
            <Descriptions title="Admin Details">
              <Descriptions.Item label="Full Name" span={3}>
                {name}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {phone ? (
                  phone
                ) : (
                  <p style={{ color: "lightblue" }}>
                    Please Update Your profile{" "}
                  </p>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {email ? (
                  email
                ) : (
                  <p style={{ color: "lightblue" }}>
                    Please Update Your profile{" "}
                  </p>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="PAN No" span={3}>
                {pan ? (
                  pan
                ) : (
                  <p style={{ color: "lightblue" }}>
                    Please Update Your profile{" "}
                  </p>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {address ? (
                  address
                ) : (
                  <p style={{ color: "lightblue" }}>
                    Please Update Your profile{" "}
                  </p>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={15} className="mb-24">
          <Card
            bordered={false}
            title={<p className="font-semibold m-0">Contact Us Messages</p>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item
                  actions={
                    item.description.length > 100
                      ? [
                          <Button
                            type="primary"
                            onClick={() => {
                              // navigate("/profile/Settings");
                            }}
                          >
                            Read More
                          </Button>,
                        ]
                      : null
                  }
                >
                  <List.Item.Meta
                    title={item.title}
                    description={
                      item.description.length > 100
                        ? item.description.substring(0, 100) + "..."
                        : item.description
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Company</h6>
            <p>Total company created by FundGator</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {comdatas.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={
                  <div>
                    <img
                      alt="example"
                      src={p.image}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                }
              >
                <div className="card-tag"></div>
                <h5>{p.name}</h5>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button
                      type="button"
                      onClick={() => {
                        window.location.href = `/company/${p._id}`;
                      }}
                    >
                      View Company
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Card style={{ width: 300, height: 350, textAlign: "center" }}>
              <div
                className="mt-5 btn  d-flex justify-content-center p-5"
                onClick={handleChange}
              >
                {" "}
                {createButton}
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default Profile;
