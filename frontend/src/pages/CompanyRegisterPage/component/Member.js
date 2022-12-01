import React, { useState } from "react";
import Labelinput from "./Labelinput";
import UnderlineInput from "./UnderlineInput";
import { AiFillFacebook } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import upload from "../../../assets/image/uploadpic.svg";

const Member = React.memo(({ item, handleChange, index }) => {
  const [preview, setPreview] = useState(upload);

  const {
    id,
    name,
    email,
    position,
    accomplished,
    userfblink,
    userlinkedinlink,
    foundertype,
    jobtype,
    
  } = item;

  const fileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      handleChange(e, index, e.target.name);
      setPreview(blobURL);
    }
  };

  return (
    <section className="users-form">
      <div className="info">
        <div className="image-upload me-2">
          <label htmlFor={`flie-input${index}`} className="f-input">
            <img src={preview} alt="" />
            <input
              id={`flie-input${index}`}
              type="file"
              name="image"
              onChange={fileSelection}
            />
          </label>
        </div>

        <div className="short-info">
          <h5>{name}</h5>
          <input
            type="text"
            placeholder="Enter email"
            name={`email`}
            value={email}
            onChange={(e) => handleChange(e, index, e.target.name)}
          />
        </div>
      </div>
      <Labelinput
        type={"text"}
        label={"Title"}
        placeholder={"CEO"}
        name={`position`}
        handleChange={(e) => handleChange(e, index, e.target.name)}
        value={position}
      />
      <div className="mt-2"></div>

      <Labelinput
        type={"text"}
        label={"Most Impressive accomplishment"}
        placeholder={"I 've accomplished"}
        name={`accomplished`}
        handleChange={(e) => handleChange(e, index, e.target.name)}
        value={accomplished}
      />
      <UnderlineInput
        type={"text"}
        label={"Title"}
        placeholder={"http://Linkedin.com/your_username"}
        index={<FaLinkedin />}
        name={`userlinkedinlink`}
        handleChange={(e) => handleChange(e, index, e.target.name)}
        value={userlinkedinlink}
      />

      <UnderlineInput
        type={"text"}
        label={"Title"}
        placeholder={"http://facebook.com/your_username"}
        index={<AiFillFacebook />}
        name={`userfblink`}
        handleChange={(e) => handleChange(e, index, e.target.name)}
        value={userfblink}
      />
      <div className="radio">
        <div className="radio-input">
          <input
            type="radio"
            name={`foundertype`}
            id=""
            value={"Founder"}
            checked={foundertype === "Founder" ? true : false}
            onChange={(e) => handleChange(e, index, e.target.name)}
          />
          <label htmlFor="">Founder</label>
        </div>
        <div className="radio-input ms-2">
          <input
            type="radio"
            name={`foundertype`}
            id=""
            value={"Co-Founder"}
            checked={foundertype === "Co-Founder" ? true : false}
            onChange={(e) => handleChange(e, index, e.target.name)}
          />
          <label htmlFor="">Co-Founder</label>
        </div>
      </div>

      <div className="radio">
        <div className="radio-input">
          <input
            type="radio"
            name="jobtype"
            id=""
            value={"Part-Time"}
            checked={jobtype === "Part-Time" ? true : false}
            onChange={(e) => handleChange(e, index, e.target.name)}
          />
          <label htmlFor="">Part-Time</label>
        </div>
        <div className="radio-input">
          <input
            type="radio"
            name="jobtype"
            id=""
            value={"Full-Time"}
            checked={jobtype === "Full-Time" ? true : false}
            onChange={(e) => handleChange(e, index, e.target.name)}
          />
          <label htmlFor="">Full-Time</label>
        </div>
      </div>
    </section>
  );
});

export default Member;
