import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "./wrapper/DetailPage";

import { Button, Space } from "antd";
import axios from "axios";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaPlay, FaShare } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { About, AskAQuestion, Detail, Overview } from "./component";
import tabs from "./utils/tab";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const CompanyDetails = () => {
  const tab2 = [
    { id: 1, text: "OVERVIEW" },
    { id: 2, text: "DETAILS" },
    { id: 3, text: "About" },

    { id: 4, text: "ASK A QUESTION" },
  ];
  const isadmin = localStorage.getItem("admin");
  const tablst = isadmin ? tab2 : tabs;

  const videoRef = useRef(null);
  const [play, setplay] = useState(false);
  const [activeindex, setActiveIndex] = useState(1);
  let { id } = useParams();

  const onplay = () => {
    if (!play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    setplay((play) => !play);
    console.log(videoRef);
  };

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [short_pitch, setShort_pitch] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fund_goal, setFund_goal] = useState("");
  const [fund_raised, setFund_raised] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [tags, setTags] = useState([]);
  const [ID, setID] = useState("");
  const [investors, setInvestors] = useState([]);
  const [registration, setRegistration] = useState("");
  const [pan, setPan] = useState("");
  const [citFront, setCitFront] = useState("");
  const [citBack, setCitBack] = useState("");
  const [verified, setVerified] = useState(false);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // get company details using id from params

  useEffect(() => {
    axios
      .get("http://localhost:5000/company/api/company/" + id, config)
      .then((res) => {
        let company = res.data.company;
        setName(company.name);
        setImage(company.image);
        setVideo(company.company_video);
        setShort_pitch(company.content);
        setEmail(company.email);
        setPhone(company.phone);
        setFund_raised(company.fund_raised);
        setStatus(company.status);
        setID(company._id);
        setInvestors(company.investors);
        setRegistration(company.registration_card);
        setPan(company.pan_card);
        setCitFront(company.citizenship_front);
        setCitBack(company.citizenship_back);
        setVerified(company.verified);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Verify company by admin
  const admin = localStorage.getItem("admin");

  const verifyCompany = () => {
    if (admin) {
      axios
        .put(
          "http://localhost:5000/company/api/verify-company/" + id,

          config
        )
        .then((res) => {
          let companyName = res.data.updatedCompany.name;
          let user_id = res.data.updatedCompany.user;

          let companyID = id;

          toast.success(res.data.message);

          const data = {
            company: companyID,
            user: user_id,
          };
          axios
            .post(
              "http://localhost:5000/notification/api/verify-notification/",
              data
            )
            .then((res) => {
              window.location.replace("/dashboard/company_admin");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("You are not authorized to verify company");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/reason/api/get-reasons/" + id, config)
      .then((res) => {
        let reasons = res.data.reasons;
        setFacebook(reasons.facebook);
        setTwitter(reasons.twitter);
        setLinkedin(reasons.linkedin);
        setWebsite(reasons.companylink);
        setFund_goal(reasons.amount);
        setAddress(reasons.city);
        setTags(reasons.tag);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Delete company
  const rejectCompany = () => {
    if (admin) {
      axios
        .put("http://localhost:5000/company/api/reject-company/" + id, config)
        .then((res) => {
          let companyName = res.data.updatedCompany.name;
          let user_id = res.data.updatedCompany.user;

          let companyID = id;

          toast.success(res.data.message);

          const data = {
            company: companyID,
            user: user_id,
          };
          axios
            .post(
              "http://localhost:5000/notification/api/verify-notification/",
              data
            )
            .then((res) => {
              window.location.replace("/dashboard/company_admin");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("You are not authorized to delete company");
    }
  };

  return (
    <Wrapper>
      <ToastContainer />

      <div className="left-container" id="detailPage">
        <section className="one">
          <div className="header">
            <div className="info">
              <h3>Invest in {name}</h3>
              <h1 align="justify">
                {short_pitch
                  ? short_pitch.length > 200
                    ? short_pitch.substring(0, 200) + "..."
                    : short_pitch
                  : null}
              </h1>
            </div>
          </div>
          <div className="video-container">
            <video
              autoPlay
              ref={videoRef}
              onClick={onplay}
              loop
              disablePictureInPicture
              controls={play ? true : false}
              src={video}
              className="video"
              poster={image}
            ></video>
            <FaPlay className={!play ? "icon" : "d-none"} onClick={onplay} />
          </div>
        </section>
        <section className="two">
          <span>
            {fund_goal - fund_raised < 10000 ? (
              <p className="text-danger">
                {fund_goal - fund_raised} Left to reach goal
              </p>
            ) : (
              <p className="text-success">
                {fund_goal - fund_raised} Left to reach goal
              </p>
            )}
          </span>
          <div className="line"></div>
          <div className="price">
            <p>Rs.{fund_goal}</p>
            <p>Raised money from {investors.length} investor</p>
          </div>
          <div className="invest">
            <div className="invest-info">
              <p>Invest</p>
              <p>minRs.1000</p>
            </div>
            <div className="invest-input">
              Rs.
              <input type="number" placeholder="0" />
            </div>
          </div>
          <button className="btn-invest">Invest</button>
          <button className="btn-bookmark">
            <AiOutlineHeart />
            <span>Watch for updates</span>
          </button>
        </section>
        <section className="three">
          <div className="links">
            <Link>{website}</Link>
            <span>{address}</span>

            <Link className="icon">
              <AiFillFacebook />
            </Link>
            <Link className="icon" to={twitter}>
              <AiFillTwitterSquare />
            </Link>
            <Link className="icon" to={instagram}>
              <AiFillInstagram />
            </Link>
          </div>
          <div className="category">
            {tags.map((item, index) => {
              return (
                <span key={index} className="tag">
                  {item.name}
                </span>
              );
            })}
          </div>
        </section>
        <section className="four tab">
          {tabs.map((item, index) => {
            return (
              <span
                key={item.id}
                onClick={() => setActiveIndex(item.id)}
                className={activeindex === item.id ? "active" : ""}
              >
                {item.text}
              </span>
            );
          })}
        </section>

        <section className="five">
          {activeindex === 1 ? (
            <Overview
              // pass company content as props
              content={short_pitch}
            />
          ) : null}
          {activeindex === 2 ? (
            <Detail
              // pass company ID as props
              company={{
                id: ID,
                fundGoal: fund_goal,
                fundRaised: fund_raised,
              }}
            />
          ) : null}
          {activeindex === 3 ? (
            <About
              // pass company content as props
              company={{
                Reg: registration,
                Cit_front: citFront,
                Cit_back: citBack,
                Pan: pan,
              }}
            />
          ) : null}

          {activeindex === 4 ? <AskAQuestion /> : null}
        </section>
      </div>
      <div className="right-container">
        <section className="two">
          <Space wrap>
            {verified ? (
              <Button
                onClick={() => {
                  rejectCompany();
                }}
              >
                Unverify Company
              </Button>
            ) : (
              <Button
                onClick={() => {
                  verifyCompany();
                }}
              >
                Verify Company
              </Button>
            )}
          </Space>
        </section>
      </div>
    </Wrapper>
  );
};

export default CompanyDetails;
