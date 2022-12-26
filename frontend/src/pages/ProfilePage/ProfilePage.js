import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Notification, Portfolio, Settings, Watchlist } from "./component";
import tabs from "./utils/tabs";
import Wrapper from "./wrapper/ProfilePage";

const ProfilePage = () => {
  const loaddata = useRef(true);

  const [activeindex, setActive] = useState(1);
  const [dropdown, setDropdown] = useState(false);
  const [image, setPreview] = useState({
    preview:
      "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/totw_network_profile_400.jpg",
    file: "",
  });

  const closedropdown = (text, index) => {
    setActive(index);
    setDropdown(false);
  };

  const editprofile = () => {
    setActive(6);
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const onuploadimg = (e) => {
    console.log(e.target.value);
    setPreview({ ...image, file: e.target.files[0] });
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      axios
        .put(
          "http://localhost:5000/profile/api/update-profile",
          formData,
          config
        )
        .then((res) => {
          toast.success("Profile updated successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPreview({ ...image, preview: " " });
      console.log("no file selected");
    }
  };

  const { id } = useParams();

  const [name, setName] = useState("");

  // fetching Profile data from API
  useEffect(() => {
    if (loaddata.current === true) {
      axios
        .get("http://localhost:5000/profile/api/my-profile", config)
        .then((res) => {
          let program = res.data.profile;
          setName(program.name);
          setPreview({ ...image, preview: program.avatar });
        });
    }
    if (id === "Portfolio") {
      setActive(1);
    }
    if (id === "Watchlist") {
      setActive(2);
    }
    if (id === "Settings") {
      setActive(3);
    }
    if (id === "Notifications") {
      setActive(4);
    }
    return () => (loaddata.current = false);
  }, [config, id]);

  return (
    <Wrapper>
      <ToastContainer />
      <section
        className="infocontainer "
        style={{ marginTop: "72px" }}
        id="SettingPage"
      >
        <div className="userinfo">
          <div className="edit-img">
            <img
              src={image.preview}
              alt="profile_avatar"
              className="rounded-circle border border-2 border-grey"
              onChange={onuploadimg}
            />
            <div className="upload-img">
              <input
                type="file"
                name=""
                id=""
                className="file-upload"
                onChange={onuploadimg}
              />
              <div
                style={{
                  // position: "relative",
                  // left: "80px",
                  // top: "70px",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
                className="text-center border border-2 border-grey"
              >
                <AiFillCamera className="icon text-dark " />
              </div>
            </div>
          </div>

          <div className="info">
            <h5 color="text-white">{name}</h5>

            <p onClick={editprofile}>Edit Profile</p>
          </div>
        </div>

        <p
          className="dropdown"
          onClick={() => setDropdown((dropdown) => !dropdown)}
        >
          {tabs.map((item, index) => {
            return (
              <span
                className={activeindex === item.id ? "tabs active" : "d-none"}
                key={item.id}
              >
                {item.text}
              </span>
            );
          })}
          <RiArrowDropDownLine className={dropdown ? "icon active" : "icon "} />
        </p>

        <div className={dropdown ? "tab-container2 active" : "tab-container2"}>
          {tabs.map((item, index) => {
            return (
              <Link
                to={`/profile/${item.text}`}
                className={activeindex === item.id ? "tabs active" : "tabs"}
                key={item.id}
                onClick={() => closedropdown(item.text, item.id)}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
      </section>

      <section className={dropdown ? "tab-container active" : "tab-container"}>
        {tabs.map((item, index) => {
          return (
            <Link
              to={`/profile/${item.text}`}
              className={activeindex === item.id ? "d-none" : "tabs"}
              key={item.id}
              onClick={() => closedropdown(item.text, item.id)}
            >
              {item.text}
            </Link>
          );
        })}
      </section>

      <section className="content">
        {activeindex === 1 ? <Portfolio /> : null}
        {activeindex === 2 ? <Watchlist /> : null}
        {activeindex === 3 ? <Settings /> : null}
        {activeindex === 4 ? <Notification /> : null}
      </section>
    </Wrapper>
  );
};

export default ProfilePage;
