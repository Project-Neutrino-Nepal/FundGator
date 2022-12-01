import React, { useState } from "react";
import { Basic, Visiblity, Story, Team } from "./component";
import Wrapper from "./wrapper/CompanyRegisterPage";
import tabs from "./utils/tab";
import { toast } from "react-toastify";
import axios from "axios";
import upload from "../../assets/image/uploadpic.svg";
import { useParams } from "react-router-dom";

const CompanyRegisterPage = () => {
  const { id } = useParams();

  const formvalue = {
    companyname: id,

    city: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    companylink: "",
    twitter: "",
    youtube: "",
    blog: "",
    reasons: [{ reason: "" }],
    teams: [
      {
        id: 0,
        image: "",
        name: "name",
        email: "email",
        position: "CEO",
        accomplished: "",
        userfblink: "",
        userlinkedinlink: "",
        foundertype: "",
        jobtype: "",
        imagepreview: upload,
      },
    ],
    imageupload: "",
    videoupload: "",
    imageuploadpreview: upload,
    videouploadpreview: "",
    linktype: "",
    companyurl: "",
  };
  const data = {
    name: formvalue.name,
    city: formvalue.city,
    facebook: formvalue.facebook,
    linkedin: formvalue.linkedin,
    instagram: formvalue.instagram,
    companylink: formvalue.companylink,
    twitter: formvalue.twitter,
    youtube: formvalue.youtube,
    blog: formvalue.blog,
  };
  const createCompany = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      await axios
        .post("http://localhost:5000/users/api/register", formvalue, config)
        .then((res) => {
          if (res.data.success) {
            toast.success(
              res.data.message,
              setTimeout(function () {
                window.location.assign("/signin");
              }, 2000)
            );
          }
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [activeindex, setActive] = useState(1);
  const [values, setValue] = useState(formvalue);
  const reasonChange = (e, index) => {
    var newreason = values.reasons;
    newreason[index].reason = e.target.value;
    setValue({ ...values, reasons: newreason });
  };
  const Addreason = () => {
    var newReason = values.reasons;
    if (newReason.length <= 7) {
      newReason.push({ reason: "" });
      setValue({ ...values, reasons: newReason });
    }
  };

  const teamChange = (e, index, name) => {
    var teams = values.teams;
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      teams[index] = {
        ...teams[index],
        [name]: e.target.files[0],
        imagepreview: blobURL,
      };

      setValue({ ...values, teams: teams });
    } else {
      teams[index] = { ...teams[index], [name]: e.target.value };

      setValue({ ...values, teams: teams });
    }
  };
  const Addteam = (name, email) => {
    var newTeam = values.teams;
    newTeam.push({
      id: 0,
      image: "",
      name: name,
      email: email,
      position: "CEO",
      accomplished: "",
      userfblink: "",
      userlinkedinlink: "",
      foundertype: "",
      jobtype: "",
      imagepreview: upload,
    });
    setValue({ ...values, teams: newTeam });
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValue({ ...values, [e.target.name]: e.target.files[0] });
    } else {
      setValue({ ...values, [e.target.name]: e.target.value });
    }
  };

  const fileChange = (e, name) => {
    let file = e.target.files[0];
    let blobURL = URL.createObjectURL(file);
    setValue({
      ...values,
      [e.target.name]: e.target.files[0],
      [name]: blobURL,
    });
  };
  const onsave = () => {
    if (activeindex <= 3) {
      setActive((prev) => prev + 1);
    }
  };
  return (
    <Wrapper>
      <section className="tabs-container" style={{ marginTop: 80 }}>
        {tabs.map((item, index) => {
          return (
            <div
              className="singletab"
              key={item.id}
              onClick={() => setActive(item.id)}
            >
              <div
                className={activeindex === item.id ? "tas active" : "tas"}
                key={item.id}
              >
                {item.text}
              </div>
              <hr
                className={activeindex === item.id ? "line active" : "line"}
              />
            </div>
          );
        })}
      </section>
      <section className="form-section">
        {activeindex === 1 ? (
          <Basic
            values={values}
            handleChange={handleChange}
            Addreason={Addreason}
            reasonChange={reasonChange}
          />
        ) : null}
        {activeindex === 4 ? (
          <Visiblity handleChange={handleChange} values={values} />
        ) : null}
        {activeindex === 3 ? (
          <Story
            handleChange={fileChange}
            imgpreview={values.imageuploadpreview}
            vdpreview={values.videouploadpreview}
          />
        ) : null}
        {activeindex === 2 ? (
          <Team
            values={values}
            handleChange={handleChange}
            Addteam={Addteam}
            teamChange={teamChange}
          />
        ) : null}
      </section>
      <section className="save">
        <button onClick={onsave}>
          {" "}
          {activeindex === 4 ? "save" : "save and Continue"}
        </button>
      </section>
    </Wrapper>
  );
};

export default CompanyRegisterPage;
