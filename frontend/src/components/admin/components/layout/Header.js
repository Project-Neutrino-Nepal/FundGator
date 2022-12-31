import { useEffect, useState } from "react";

import {
  Breadcrumb,
  Col,
  Input,
  Row,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";


import { BsBellFill } from "react-icons/bs";
import SingleNotification from "./SingleNotification";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Header({ name, subName, onPress }) {
  useEffect(() => window.scrollTo(0, 0));
  const [shownotification, setnotification] = useState(false);

  const [addNotification, setAddnotification] = useState([]);

  useEffect(() => {
    //listens for the company list from the backend
    socket.on("sendMessage-admin", (company) => {
      console.log(company);
      setAddnotification(company);
    });
  });

  return (
    <>
      <Row gutter={[24, 0]} style={{ marginTop: 50 }}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              {/* <NavLink to="/">Pages</NavLink> */}
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "/")}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24} md={18} className="header-control">
          <div className="position-relative">
            <div
              className=" position-relative"
              onClick={() => setnotification(!shownotification)}
            >
              <BsBellFill />
              
              {addNotification.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {addNotification.length} <span className="visually-hidden">unread messages</span>
              </span>
                
              )}
            </div>
            <div
              className={
                shownotification
                  ? "position-absolute top-0 start-0  bg-white shadow shadow-sm"
                  : "d-none"
              }
              style={{
                transform: "translateY(37px) translateX(-480px)",
                zIndex: "2",
                width: "max-content",
                maxWidth: "500px",
                minWidth: "500px",
                minHeight: "70px",
              }}
            >
              {addNotification.length > 0 ? (
                  <SingleNotification />)
               : (
                <h4 className="w-100  text-center" width={500} height={200}>
                  no notification
                </h4>
              )}
            </div>
          </div>
          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
}

export default Header;
