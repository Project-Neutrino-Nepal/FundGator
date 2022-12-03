import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper/Overview";
import OurFounder from "./OurFounder";

const Overview = (ID, description) => {
  let id = ID.company;
  let desc = description.description;
  const [reasons0, setReasons0] = useState();
  const [reasons1, setReasons1] = useState();
  const [reasons2, setReasons2] = useState();
  const [reasons3, setReasons3] = useState();
  const [reasons4, setReasons4] = useState();
  const [reasons5, setReasons5] = useState();
  const [reasons6, setReasons6] = useState();
  const [reasons7, setReasons7] = useState();
  const [reasons8, setReasons8] = useState();
  const [teams, setTeams] = useState([]);
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
        let team = reasons.teams;
        console.log(team);
        setTeams(team);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <section className="lists">
        <h1>Highlights</h1>
        <div className="list">
          <div className="number">1</div>
          <h6>{reasons0}</h6>
        </div>
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
              description={desc}
            />
          ))}
        </div>
      </section>

      <section className="about">
        <h1> About Product</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          perferendis ducimus dolor laboriosam pariatur? Quas dolore consectetur
          aspernatur saepe libero suscipit aut tenetur est ut hic, corrupti
          explicabo, unde obcaecati tempora fugiat. Distinctio cum veniam quod
          totam harum, dicta accusantium magnam esse in incidunt maiores a quos,
          odio maxime molestiae. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Dolorum repellat, impedit consequuntur similique
          vitae maxime eos nesciunt soluta aliquam autem doloremque minus facere
          tempora sapiente blanditiis? Animi expedita doloremque repellat?
        </p>
      </section>
    </Wrapper>
  );
};

export default Overview;
