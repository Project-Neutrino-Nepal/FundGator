import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "./wrapper/DetailPage";

import { Button, Space } from "antd";
import axios from "axios";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiOutlineHeart
} from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaPlay, FaShare } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  AskAQuestion,
  Detail,
  InvestmentTerm,
  LeadInvestor,
  Overview,
  Update,
  WhatInvestorSay
} from "./component";
import tabs from "./utils/tab";

const CompanyDetails = () => {
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
  const [tags, setTags] = useState("");
  const [ID, setID] = useState("");
  const [content, setContent] = useState("");

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
        setVideo(company.video);
        setWebsite(company.website);
        setFacebook(company.facebook);
        setTwitter(company.twitter);
        setLinkedin(company.linkedin);
        setInstagram(company.instagram);
        setShort_pitch(company.short_pitch);
        setEmail(company.email);
        setPhone(company.phone);
        setAddress(company.address);
        setFund_goal(company.fund_goal);
        setFund_raised(company.fund_raised);
        setCategory(company.category);
        setStatus(company.status);
        setTags(company.tags);
        setContent(company.content);
        setID(company._id);
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
          console.log(res);
          toast.success(res.data.message);
          window.location.replace("/dashboard/company_admin");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("You are not authorized to verify company");
    }
  };

  // Delete company
  const deleteCompany = () => {
    if (admin) {
      axios
        .put(
          "http://localhost:5000/company/api/reject-company/" + id,
          config
        )
        .then((res) => {
          toast.success(res.data.message);
          window.location.replace("/dashboard/company_admin");
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

      <div className="left-container">
        <section className="one">
          <div className="header">
            <div className="info">
              <h3>Invest in {name}</h3>
              <h1>{short_pitch}</h1>
            </div>
            <div className="share">
              <FaShare />
            </div>
          </div>
          <div className="video-container">
            <video
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
          <span>almost sold out</span>
          <div className="line"></div>
          <div className="price">
            <p>$2,000,000</p>
            <p>Raised money from 200 investor</p>
          </div>
          <div className="invest">
            <div className="invest-info">
              <p>Invest</p>
              <p>min$100</p>
            </div>
            <div className="invest-input">
              <BsCurrencyDollar />
              <input type="number" placeholder="0" />
            </div>
          </div>
          <button className="btn-invest">Invest</button>
          <button className="btn-bookmark">
            <AiOutlineHeart />
            <span>Watch for updates</span>
          </button>
          <InvestmentTerm />
          <LeadInvestor />
        </section>
        <section className="three">
          <div className="links">
            <Link>{website}</Link>
            <span>{address}</span>

            <Link className="icon">
              <AiFillFacebook />
            </Link>

            <Link className="icon">
              <AiFillTwitterSquare />
            </Link>
          </div>

          <div className="category">
            <span>{}</span>
            <span>Fintech & Finance</span>
            <span>Y Combinator</span>
            <span>B2B</span>
            <span>Saas</span>
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
          <div className="content">
            <div className="content-one">
              <div className="content-one-left">
                <h3>Company</h3>
                <p>{content}</p>
              </div>
            </div>
            </div>
          {activeindex === 1 ? (
            <Overview
              // pass company ID as props
              company={ID}
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
          {activeindex === 3 ? <Update /> : null}
          {activeindex === 4 ? <WhatInvestorSay /> : null}
          {activeindex === 5 ? <AskAQuestion /> : null}
        </section>
      </div>
      <div className="right-container">
        <section className="two">
          <Space wrap>
            <Button
              type="primary"
              onClick={() => {
                verifyCompany();
              }}
            >
              Verify Company
            </Button>
            <Button
              onClick={() => {
                deleteCompany();
              }}
            >
              Reject Company
            </Button>
          </Space>
        </section>
      </div>
    </Wrapper>
  );
};

export default CompanyDetails;
