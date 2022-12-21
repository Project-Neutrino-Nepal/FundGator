import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../css/homepage.css";
import Basenav from "./basenav";

import { BsCardImage } from "react-icons/bs";
import { IoCloseCircleSharp, IoDocumentTextSharp } from "react-icons/io5";
import { RiVideoFill } from "react-icons/ri";

import { Outlet } from "react-router-dom";

const Homepage = () => {
  const [name, setName] = useState("");
  const [image, setPreview] = useState({
    preview: "https://github.com/mdo.png",
    file: "",
  });

  const [preview, setPreviews] = useState({
    img: "",
    vid: "",
    doc: "",
  });
  const [values, setValue] = useState({
    img: "",
    vid: "",
    doc: "",
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValue({ ...values, [e.target.name]: e.target.files[0] });
    } else {
      setValue({ ...values, [e.target.name]: e.target.value });
    }
  };

  const clearpreview = (name) => {
    console.log(name);
    setValue({ ...values, [name]: "" });
    setPreviews({ ...preview, [name]: "" });
  };

  const fileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      handleChange(e);
      setPreviews({ ...preview, [e.target.name]: blobURL });
    }
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // fetching Profile data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile/api/my-profile", config)
      .then((res) => {
        let program = res.data.profile;
        setName(program.legal_name);
        setPreview({ ...image, preview: program.avatar });
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", values.img);
    formData.append("vid", values.vid);
    formData.append("description", values.description);
    if (!values.img && !values.vid && !values.description) {
      toast.error("You can't post empty post");
      return;
    }
    if (values.img && values.vid) {
      toast.error("You can only upload one file at a time");
      return;
    }

    try {
      axios
        .post("http://localhost:5000/posts/api/create-post", formData, config)
        .then((res) => {
          toast.success(
            res.data.message,
            setTimeout(function () {
              window.location.reload();
            }, 2000)
          );
        });
    } catch (err) {
      toast.error("Post Creation Failed");
      console.log(err);
    }
  };

  // get feeds from API
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/posts/api/get-all-posts", config)
        .then((res) => {
          setFeeds(res.data.posts);
          console.log(res.data.posts);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  let key;

  return (
    <>
      <ToastContainer />
      <div className="basenav">
        <Basenav user={image.preview} />
      </div>
      {/* <div className="d-flex flex-wrap"> */}
      <div
        className="  p-3 text-white mt-5 col-3 position-fixed"
        id="sidebar-width"
        style={{ backgroundColor: "#0a4fa3" }}
      >
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={image.preview}
              alt=""
              width={65}
              height={65}
              className="rounded-circle me-2 mt-2"
            />
            <strong>{name}</strong>
          </a>

          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="/raise">
                Raise fund
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/profile/Settings">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
          </ul>
        </div>
        <hr />

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/homepage"
              className={
                window.location.pathname === "/homepage"
                  ? "nav-link active"
                  : "nav-link text-white"
              }
              aria-selected="true"
            >
              <i className="fa fa-home" />
              <span className="ms-2">Feeds</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/homepage/one"
              className={
                window.location.pathname === "/homepage/one"
                  ? "nav-link active"
                  : "nav-link text-white"
              }
              aria-selected="false"
            >
              <i className="fa fa-dashboard" />

              <span className="ms-2">My Investment</span>
            </Link>
          </li>
          <li>
            <Link
              to="/homepage/two"
              className={
                window.location.pathname === "/homepage/two"
                  ? "nav-link active"
                  : "nav-link text-white"
              }
            >
              <i className="fa fa-first-order" />

              <span className="ms-2">By Fundgator</span>
            </Link>
          </li>
          <li>
            <Link
              to="/homepage/three"
              className={
                window.location.pathname === "/homepage/three"
                  ? "nav-link active"
                  : "nav-link text-white"
              }
            >
              <i className="fa fa-bookmark" />
              <span className="ms-2">My Watchlist</span>
            </Link>
          </li>
          <li>
            <li className="nav-link text-white">
              <i className="fa fa-cog" />
              <span
                className="ms-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Post
              </span>
            </li>
          </li>
        </ul>
      </div>
      <div className="container-fluid col-10 mt-2  " id="feeds-position">
        <Outlet />
        {/* {feeds.map((feed) => {
          return <Feeds key={feed._id} feed={feed} />;
        })} */}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create a Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={image.preview}
                  className="rounded rounded-5 img-circle"
                  alt=""
                  style={{ width: 40, height: 40 }}
                />
                <span className="text-dark fw-bold">{name}</span>
              </div>

              <div className="form-floating">
                <textarea
                  className="form-control border-0"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                ></textarea>
                <label for="floatingTextarea2">Enter Description</label>
              </div>

              <div className="d-flex gap-2">
                <div className={preview.img ? "position-relative " : "d-none"}>
                  <img
                    src={preview.img}
                    alt=""
                    height={100}
                    width={80}
                    style={{ objectFit: "cover" }}
                  />
                  <IoCloseCircleSharp
                    className="position-absolute top-0 end-0 fs-3 bg-white rounded-circle shadow shadow-sm"
                    name="img"
                    style={{ transform: "translate(9px , -9px) " }}
                    onClick={() => clearpreview("img")}
                  />
                </div>

                <div className={preview.vid ? "position-relative " : "d-none"}>
                  <video
                    src={preview.vid}
                    alt=""
                    height={100}
                    width={80}
                    style={{ objectFit: "cover" }}
                  />
                  <IoCloseCircleSharp
                    className="position-absolute top-0 end-0 fs-3 bg-white rounded-circle shadow shadow-sm "
                    style={{ transform: "translate(9px , -9px) " }}
                    onClick={() => clearpreview("vid")}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex fs-5 gap-2">
                  <label htmlFor="img" className="pe-auto ">
                    <BsCardImage />
                  </label>
                  <label htmlFor="vid">
                    <RiVideoFill />
                  </label>
                </div>

                <div className="d-none">
                  <input
                    type="file"
                    accept="image/*"
                    name="img"
                    id="img"
                    onChange={fileSelection}
                  />
                  <input
                    type="file"
                    accept="video/*"
                    name="vid"
                    id="vid"
                    onChange={fileSelection}
                  />
                  <input type="file" accept="image/*" name="doc" id="doc" />
                </div>
                <button
                  className="btn mt-2 bg-dark bg-opacity-10 rounded-pill  "
                  onClick={handleSubmit}
                >
                  post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
