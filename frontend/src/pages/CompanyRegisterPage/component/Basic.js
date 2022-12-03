import React, { useState } from "react";
import Labelinput from "./Labelinput";
import UnderlineInput from "./UnderlineInput";
import { TbWorld } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillFacebook } from "react-icons/ai";
import {
  FaInstagramSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaYoutube,
  FaBlogger,
} from "react-icons/fa";
const Basic = ({ values, handleChange, Addreason, reasonChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="form-content">
      <Labelinput
        type={"text"}
        placeholder={"Enter Company Name"}
        label={"Company Name"}
        value={values.companyname}
        handleChange={handleChange}
        name={"companyname"}
      />

      <label htmlFor="">The Top Reason to Invest</label>
      {values.reasons.map((item, index) => {
        return (
          <UnderlineInput
            key={index}
            type={"text"}
            index={index + 1}
            handleChange={(e) => reasonChange(e, index)}
            value={values.reasons[index].reason}
          />
        );
      })}
      <button className="btn-addlink" onClick={Addreason}>
        Add Reason
      </button>

      <label htmlFor="">City *</label>
      <UnderlineInput
        type={"text"}
        index={<IoLocationSharp />}
        placeholder={"Enter company Location"}
        value={values.city}
        handleChange={handleChange}
        name={"city"}
      />

      <label htmlFor="">Link</label>
      <UnderlineInput
        type={"text"}
        index={<TbWorld />}
        placeholder={"Enter Company Link"}
        value={values.companylink}
        handleChange={handleChange}
        name={"companylink"}
      />
      <UnderlineInput
        type={"text"}
        index={<AiFillFacebook />}
        placeholder={"Enter FaceBook Link"}
        value={values.facebook}
        handleChange={handleChange}
        name={"facebook"}
      />

      <button
        className={!show ? "btn-addlink" : "d-none"}
        onClick={() => setShow(true)}
      >
        Add More Link
      </button>

      {/* <div className={show ? "" : "d-none"}>
        <UnderlineInput
          type={"text"}
          index={<FaInstagramSquare />}
          placeholder={"Enter Instagram Link"}
          value={values.instagram}
          handleChange={handleChange}
          name={"instagram"}
        />
      </div> */}
      <div className={show ? "" : "d-none"}>
        <UnderlineInput
          type={"text"}
          index={<FaTwitterSquare />}
          placeholder={"Enter Twitter Link"}
          value={values.twitter}
          handleChange={handleChange}
          name={"twitter"}
        />
      </div>
      <div className={show ? "" : "d-none"}>
        <UnderlineInput
          type={"text"}
          index={<FaLinkedin />}
          placeholder={"Enter Linkedin Link"}
          value={values.linkedin}
          handleChange={handleChange}
          name={"linkedin"}
        />
      </div>
      {/* <div className={show ? "" : "d-none"}>
        <UnderlineInput
          type={"text"}
          index={<FaYoutube />}
          placeholder={"Enter Youtube Link"}
          value={values.youtube}
          handleChange={handleChange}
          name={"youtube"}
        />
      </div>
      <div className={show ? "" : "d-none"}>
        <UnderlineInput
          type={"text"}
          index={<FaBlogger />}
          placeholder={"Enter Blog Link"}
          value={values.blog}
          handleChange={handleChange}
          name={"blog"}
        />
      </div> */}
    </div>
  );
};

export default Basic;
