import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../wrapper/Overview";
import OurFounder from "./OurFounder";

const Overview = (short_pitch) => {
  let content = short_pitch.content;
  const [reasons0, setReasons0] = useState("");
  const [reasons1, setReasons1] = useState("");
  const [reasons2, setReasons2] = useState("");
  const [reasons3, setReasons3] = useState("");
  const [reasons4, setReasons4] = useState("");
  const [reasons5, setReasons5] = useState("");
  const [reasons6, setReasons6] = useState("");
  const [reasons7, setReasons7] = useState("");
  const [reasons8, setReasons8] = useState("");
  const [teams, setTeams] = useState([]);
  let { id } = useParams();
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/reason/api/get-reasons/" + id, config)
      .then((res) => {
        let reasons = res.data.reasons;
        setReasons0(reasons.reason0);
        setReasons1(reasons.reason1);
        setReasons2(reasons.reason2);
        setReasons3(reasons.reason3);
        setReasons4(reasons.reason4);
        setReasons5(reasons.reason5);
        setReasons6(reasons.reason6);
        setReasons7(reasons.reason7);
        setReasons8(reasons.reason8);
        let team = reasons.teams;
        setTeams(team);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // only add reason if it is not empty
  let reasons = [];
  if (reasons0 != null) {
    reasons.push(reasons0);
  }
  if (reasons1 != null) {
    reasons.push(reasons1);
  }
  if (reasons2 != null) {
    reasons.push(reasons2);
  }
  if (reasons3 != null) {
    reasons.push(reasons3);
  }
  if (reasons4 != null) {
    reasons.push(reasons4);
  }
  if (reasons5 != null) {
    reasons.push(reasons5);
  }
  if (reasons6 != null) {
    reasons.push(reasons6);
  }
  if (reasons7 != null) {
    reasons.push(reasons7);
  }
  if (reasons8 != null) {
    reasons.push(reasons8);
  }
  const validReasons = reasons.filter((reason) => reason !== "");
  reasons = reasons.slice(0, validReasons.length);

  return (
    <Wrapper>
      <section className="lists">
        <h1>Highlights</h1>
        {reasons.map((reason, index) => {
          return (
            <div className="list" key={index}>
              <div className="number">{index + 1}</div>
              <h6>{reason}</h6>
            </div>
          );
        })}
      </section>

      <section className="our-team">
        <h1>Our Founders</h1>

        <div className="lists">
          {teams.map((team) => (
            <OurFounder
              key={team._id}
              name={team.name}
              image={team.image}
              email={team.email}
              position={team.position}
              facebook={team.userfblink}
              linkedin={team.userlinkedinlink}
            />
          ))}
        </div>
      </section>

      <section className="about">
        <h1> About Product</h1>
        <p align="justify">{content}</p>
      </section>
    </Wrapper>
  );
};

export default Overview;
