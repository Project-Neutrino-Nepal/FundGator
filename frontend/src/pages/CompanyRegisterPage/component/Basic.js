import React, { useState } from "react";
import Labelinput from "./Labelinput";
import UnderlineInput from "./UnderlineInput";
import { TbCurrencyRupee, TbWorld } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillFacebook } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";

import {
  FaInstagramSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaYoutube,
  FaBlogger,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
const Basic = ({ values, handleChange }) => {
  const [addlink, setlink] = useState(0);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState();
  const { id } = useParams();
  const list = [
    {
      id: 0,
      value: values.reason0,
      name: "reason0",
    },
    {
      id: 1,

      value: values.reason1,
      name: "reason1",
    },
    {
      id: 2,

      value: values.reason2,
      name: "reason2",
    },
    {
      id: 3,

      value: values.reason3,
      name: "reason3",
    },
    {
      id: 4,

      value: values.reason4,
      name: "reason4",
    },
    {
      id: 5,

      value: values.reason5,
      name: "reason5",
    },
    {
      id: 6,

      value: values.reason6,
      name: "reason6",
    },
    {
      id: 7,

      value: values.reason7,
      name: "reason7",
    },
    {
      id: 8,

      value: values.reason8,
      name: "reason8",
    },
  ].filter((item) => item.id <= addlink);
  const Addlink = () => {
    if (addlink < 8) {
      setlink((addlink) => addlink + 1);
    }
  };
  return (
    <div className="form-content">
      <Labelinput
        type={"text"}
        placeholder={"Enter Company Name"}
        label={"Company Name"}
        value={id}
        // handleChange={handleChange}
        name={"name"}
      />

      <div className="d-flex flex-wrap justify-content-between mt-3 fw-semibold fs-6 ">
        <div>
          <label htmlFor="" className="text-dark mb-1 ">
            Categories
          </label>{" "}
          <br />
          <select
            id="dropdown"
            type={"text"}
            value={values.category}
            defaultValue={values.category}
            handleChange={handleChange}
            className="border border-dark rounded-3 p-2"
          >
            <option value="Select Category">Select Category</option>
            <option value="Fintech">Fintech</option>
            <option value="IT">IT</option>
          </select>
          <h1>{values.category}</h1>
        </div>
        <div>
          <label htmlFor="" className="text-dark mb-1 ">
            Tags
          </label>{" "}
          <br />
          <select
            id="dropdown"
            value={values.tag}
            type={"text"}
            defaultValue={values.tag}
            className="border border-dark rounded-3 p-2"
            handleChange={handleChange}
          >
            <option value="Select Category">Select Tags</option>
            <option value="Fintech">Fintech</option>
            <option value="IT">IT</option>
          </select>
        </div>
      </div>

      <label htmlFor=""> Fund amount *</label>
      <UnderlineInput
        type={"number"}
        index={<TbCurrencyRupee />}
        placeholder={"Raise fund amount"}
        value={values.amount}
        handleChange={handleChange}
        name={"amount"}
      />

      <label htmlFor="">The Top Reason to Invest</label>
      {list.map((item, index) => {
        console.log(list);
        return (
          <UnderlineInput
            key={index}
            type={"text"}
            index={index + 1}
            name={item.name}
            handleChange={handleChange}
            value={item.value}
          />
        );
      })}
      <button className="btn-addlink" onClick={Addlink}>
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

      <div className={show ? "" : "d-none"}>
        <UnderlineInput
          type={"text"}
          index={<FaInstagramSquare />}
          placeholder={"Enter Instagram Link"}
          value={values.instagram}
          handleChange={handleChange}
          name={"instagram"}
        />
      </div>
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
      <div className={show ? "" : "d-none"}>
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
      </div>
    </div>
  );
};

export default Basic;
