import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import axios from "axios";
import React from "react";
const { Meta } = Card;
const Company = ({ company }) => {
  const removeItem = (id) => {
    try {
      axios
        .put(
          `http://localhost:5000/company/api/remove-watchlist/${id}`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      className="m-2"
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src={company.image}
          style={{ height: "auto", width: "100%", objectFit: "contain" }}
          className="img-fluid"
          onClick={() => {
            window.location.href = `/detail/${company._id}`;
          }}
        />
      }
      actions={[
        <EyeOutlined
          key="setting"
          onClick={() => {
            window.location.href = `/detail/${company._id}`;
          }}
        />,
        <DeleteOutlined
          color="red"
          key="edit"
          onClick={() => {
            removeItem(company._id);
          }}
        />,
      ]}
    >
      <Meta title={company.name} />
    </Card>
  );
};
export default Company;
