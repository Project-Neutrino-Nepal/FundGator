import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useRef, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaPlay, FaShare } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import khalticonfig from "../../components/Khalti/KhaltiConfig";
import {
  AskAQuestion,
  Detail,
  Overview,
  Update,
  WhatInvestorSay,
} from "./component";
import tabs from "./utils/tab";
import Wrapper from "./wrapper/DetailPage";
const Details = () => {
  const videoRef = useRef(null);
  const [play, setplay] = useState(false);
  const [activeindex, setActiveIndex] = useState(1);
  let { id } = useParams();
  let checkout = new KhaltiCheckout(khalticonfig);
  const [amount, setAmount] = useState(0);

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
        setAddress(company.address);
        setFund_raised(company.fund_raised);
        setStatus(company.status);
        setID(company._id);
        setInvestors(company.investors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get reason details using id from params

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
        setTags(reasons.tag);
        console.log(reasons);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // watchlist handler
  const watchlistHandler = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to add to watchlist");
      return;
    }
    axios
      .put("http://localhost:5000/company/api/watchlist/" + id, id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <Wrapper>
      <ToastContainer />

      <div className="left-container" id="detailPage">
        <section className="one">
          <div className="header">
            <div className="info">
              <h3>Invest in {name}</h3>
              <h1>
                {short_pitch
                  ? short_pitch.length > 200
                    ? short_pitch.substring(0, 200) + "..."
                    : short_pitch
                  : null}
              </h1>
            </div>
            <div className="share">
              <FaShare />
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
          <button
            className="btn-invest"
            onClick={() =>
              amount < 1000
                ? toast.info("Minimum amount to invest is Rs.1000")
                : checkout.show({
                    amount: amount * 100,
                    productIdentity: id,
                    productName: name,
                    productUrl: "http://localhost:3000/detail/" + id,
                  })
            }
          >
            Invest
          </button>
          <button
            className="btn-bookmark"
            onClick={() => {
              watchlistHandler();
            }}
          >
            <AiOutlineHeart />
            <span>Watch for updates</span>
          </button>
        </section>
        <section className="three">
          <div className="links">
            <Link>{website}</Link>
            <span>{address}</span>

            <Link
              className="icon"
              to={{
                pathname: `https://www.facebook.com/${facebook}`,
              }}
              target="_blank"
            >
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
          {activeindex === 3 ? <Update /> : null}
          {activeindex === 4 ? <WhatInvestorSay /> : null}
          {activeindex === 5 ? <AskAQuestion /> : null}
        </section>
      </div>
      <div className="right-container">
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
              <p>min Rs.1000</p>
            </div>
            <div className="invest-input">
              Rs.
              <input
                type="number"
                placeholder="0"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn-invest"
            onClick={() =>
              amount < 1000
                ? toast.info("Minimum amount to invest is Rs.1000")
                : checkout.show({
                    amount: amount * 100,
                    productIdentity: id,
                    productName: name,
                    productUrl: "http://localhost:3000/detail/" + id,
                  })
            }
          >
            Invest
          </button>
          <button
            className="btn-bookmark"
            onClick={() => {
              watchlistHandler();
            }}
          >
            <AiOutlineHeart />
            <span>Watch for updates</span>
          </button>
        </section>
      </div>
    </Wrapper>
  );
};

export default Details;
