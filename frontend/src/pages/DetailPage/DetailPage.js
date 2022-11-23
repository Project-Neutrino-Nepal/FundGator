import React, { useRef, useState } from "react";
import Wrapper from "./wrapper/DetailPage";

import { FaPlay, FaShare } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { InvestmentTerm, LeadInvestor, Overview,Detail} from "./component";
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import tabs from "./utils/tab";

const DetailPage = () => {
  const videoRef = useRef(null);
  const [play, setplay] = useState(false);
  const [activeindex, setActiveIndex] = useState(1);

  const onplay = () => {
    if (!play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    setplay((play) => !play);
    console.log(videoRef);
  };
  return (
    <Wrapper>
      <div className="left-container">
        <section className="one">
          <div className="header">
            <div className="info">
              <h3>Invest in Landeed </h3>
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                iste.
              </h1>
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
              src="https://vod-progressive.akamaized.net/exp=1669007668~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3456%2F22%2F567282335%2F2682089462.mp4~hmac=23145947da7be3f3dbac2868b2407e484928b515a5f9e5d7fcf6aa838d96a717/vimeo-prod-skyfire-std-us/01/3456/22/567282335/2682089462.mp4"
              className="video"
              poster="https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
            <Link>landeed.com</Link>
            <span>Delaware city Delaware</span>

            <Link className="icon">
              <AiFillFacebook />
            </Link>

            <Link className="icon">
              <AiFillTwitterSquare />
            </Link>
          </div>

          <div className="category">
            <span>Technolgy</span>
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
          {activeindex === 1 ? <Overview /> : null}
          {activeindex === 2 ? <Detail /> : null}
        </section>
      </div>

      <div className="right-container">
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
      </div>
    </Wrapper>
  );
};

export default DetailPage;
