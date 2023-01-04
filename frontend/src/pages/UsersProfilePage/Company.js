import { EyeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import axios from "axios";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Meta } = Card;
const Company = ({ company }) => {
  // watchlist handler
  const watchlistHandler = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to add to watchlist");
      return;
    }
    axios
      .put(
        "http://localhost:5000/company/api/watchlist/" + company._id,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const removeWatchlist = () => {
    try {
      axios
        .put(
          `http://localhost:5000/company/api/remove-watchlist/${company._id}`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
        toast.success(res.data.message);

        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />

      <Card
        className="m-2"
        style={{
          width: 300,
        }}
        cover={
          <Link to={`/company/${company._id}`}>
            <img alt="example" src={company.image} style={{ height: "25em" }} />
          </Link>
        }
        actions={[
          <EyeOutlined
            key="setting"
            onClick={() => {
              window.location.href = `/company/${company._id}`;
            }}
          />,
          <>
            {company.watchlist.includes(
              JSON.parse(localStorage.getItem("userInfo")).user._id
            ) ? (
              <AiFillHeart
                color="red"
                key="edit"
                onClick={() => {
                  removeWatchlist();
                }}
              />
            ) : (
              <AiOutlineHeart
                key="edit"
                onClick={() => {
                  watchlistHandler();
                }}
              />
            )}
            ,
          </>,
        ]}
      >
        <Meta title={company.name} />
      </Card>
    </>
  );
};
export default Company;
