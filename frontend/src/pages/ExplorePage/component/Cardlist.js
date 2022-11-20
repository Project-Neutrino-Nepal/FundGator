import React,{useState} from "react";
import Slider from "react-slick";
import "../wrapper/slick.css";
import "../wrapper/slick-theme.css";
import Card from "./Card";
import { Prevbtn, Nextbtn } from "./Buttons";
import {FcNext} from "react-icons/fc"
import {Link} from "react-router-dom"

const Cardlist = ({item,heading,to}) => {
  

 

  var settings = {
  
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1.5,
          centerMode: false,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2.5,
          centerMode: false,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <section className="carousel-container">
    
      <div className="title">
        <span className="heading">{heading}</span>
        <Link className="btn-disc" to={to}>
          <FcNext className="icon" />
          <span className="discover">Discover now</span>
        </Link>
      </div>
      <Slider {...settings} className="slidy">
        {item.map((item) => {
          return <Card {...item} key={item.id} />;
        })}
      </Slider>
    </section>
  );
};

export default Cardlist;
