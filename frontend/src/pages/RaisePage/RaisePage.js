import React, { useEffect, useState } from "react";
import Wrapper from "./wrapper/RaisePage";
import raise from "../../assets/image/raise.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RaisePage = () => {

  const [border, setBorder] = useState(false);
  const [name, setcompanyname] = useState("");
  const handleChange = async (e) => {
    setcompanyname(e.target.value);
  };
  const navigate = useNavigate();

  const createCompany = async (e) => {
    e.preventDefault();
    const data = {name};
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    if (name.length > 0) {
      try{
        await axios.post("http://localhost:5000/company/api/create-company", data,config).then((res) => {
          if (res.data.success) {
            navigate(`/companyRegister/${name}`) 
          }
        })
      }catch(error){
        toast.error(error.response.data.message);
      }
    }else{
      toast.error("Please enter company name");
    }
  };

  return (
    <Wrapper className="">
      <ToastContainer/>
      <section className="left-container ">
        <h1>
          Start Rasing money in <span>15 minutes</span>
        </h1>
        <p>
          We take the pain out of raising money. Raise $50K to $5M from
          superfans & angel investors who believe in you.
        </p>
        <div className={border ? "entercompany active" : "entercompany"}>
          <input
            type="text"
            placeholder="company name"
            onChange={handleChange}
            value={name}
            onFocus={() => setBorder(true)}
            onBlur={() => setBorder(false)}
          />
          <button
            className="btn-raise"
            onClick={createCompany}
          >
            Start Raising now
          </button>
        </div>
      </section>

      <section className="right-container ">
        <img src={raise} alt="" />
      </section>
    </Wrapper>
  );
};

export default RaisePage;
