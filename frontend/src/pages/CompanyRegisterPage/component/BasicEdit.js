import React, { useEffect, useState } from "react";
import Labelinput from "./Labelinput";
import UnderlineInput from "./UnderlineInput";
import { TbCurrencyRupee, TbWorld } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillFacebook } from "react-icons/ai";
import Multiselect from "multiselect-react-dropdown";

import {
  FaInstagramSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaYoutube,
  FaBlogger,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
const BasicEdit = ({ values, handleChange,handleTags}) => {
let [reasons, setReasons] = useState([]);

  const [addlink, setlink] = useState(0);
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const list = [
    {
      id: 0,
      value: values.reason0,
      name: "reason0",
    },
    {
      id: 1,

      value: reasons.reason1,
      name: "reason1",
    },
    {
      id: 2,

      value: reasons.reason2,
      name: "reason2",
    },
    {
      id: 3,

      value: reasons.reason3,
      name: "reason3",
    },
    {
      id: 4,

      value: reasons.reason4,
      name: "reason4",
    },
    {
      id: 5,

      value: reasons.reason5,
      name: "reason5",
    },
    {
      id: 6,

      value: reasons.reason6,
      name: "reason6",
    },
    {
      id: 7,

      value: reasons.reason7,
      name: "reason7",
    },
    {
      id: 8,

      value: reasons.reason8,
      name: "reason8",
    },
  ].filter((item) => item.id <= addlink);
  const Addlink = () => {
    if (addlink < 8) {
      setlink((addlink) => addlink + 1);
    }
  };
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/api/get-all-categories", config)
      .then((res) => {
        let category = res.data.categories;
        setCategories(category);
      });
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/api/get-tags", config)
      .then((res) => {
        let tag = res.data.tags;
        setTags(tag);
      });
  });

  // fetch data from reason model
useEffect(() => {
  axios
    .get("http://localhost:5000/reason/api/get-reason/"+id, config)
    .then((res) => {
      let reasons = res.data.reasons;
      setReasons( reasons);
    });
});
console.log(reasons);



  return (
    <div className="form-content">
      <Labelinput
        type={"text"}
        placeholder={"Enter Company Name"}
        label={"Company Name"}
        value={id}
        handleChange={handleChange}
        name={"name"}
        
            
        
      />

      <div
      >
        <div>
          <label className="text-dark mb-3 mt-3">Select Category</label> &emsp;
          <select
            id="dropdown"
            value={values.category}
            onChange={handleChange}
            name="category"
            className="border border-dark rounded-3 p-2"
          >
            {categories.map((category) => {
              return <option value={category.name}>{category.name}</option>;
            })}
          </select>
        </div>

        <label htmlFor="" className="text-dark mb-1 ">
          Choose Tags 1 or more
        </label>
        <Multiselect
          isObject={false}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={function noRefCheck() {}}
          placeholder="Select Tags"
          options={tags.map((tag) => {
            return tag.name;
          })}
          
          onSelect={handleTags}
        />
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

export default BasicEdit;
