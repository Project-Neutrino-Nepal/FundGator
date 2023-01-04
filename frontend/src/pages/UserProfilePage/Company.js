import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Meta } = Card;
const Company = ({ company }) => {
  // Remove company
  const removeItem = (id) => {
    try {
      axios
        .delete(`http://localhost:5000/company/api/delete-company/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
            toast.success(company.name + " has been deleted");
        });
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  };

  return (
    <>
      <ToastContainer />
      {company ? (
        <Card
          className="m-2"
          style={{
            width: 300,
          }}
          cover={
            <Link to={`/company/${company._id}`}>
              <img
                alt="example"
                src={company.image}
                style={{ height: "25em" }}
              />
            </Link>
          }
          actions={[
            <EyeOutlined
              key="setting"
              onClick={() => {
                window.location.href = `/company/${company._id}`;
              }}
            />,
            <EditOutlined
              key="edit"
              onClick={() => {
                window.location.href = `/company/edit/${company.name}`;
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
      ) : (
        <h1>No Company Found</h1>
      )}
    </>
  );
};
export default Company;
