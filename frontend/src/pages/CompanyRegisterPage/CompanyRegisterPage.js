import React, { useState } from "react";
import { Basic, Visiblity, Story, Team } from "./component";
import Wrapper from "./wrapper/CompanyRegisterPage";
import tabs from "./utils/tab";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import upload from "../../assets/image/uploadpic.svg";
import { useParams } from "react-router-dom";
const CompanyRegisterPage = () => {
  const { id } = useParams();
  const formvalue = {
    city: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    companylink: "",
    twitter: "",
    youtube: "",
    blog: "",
    reason0: "",
    reason1: "",
    reason2: "",
    reason3: "",
    reason4: "",
    reason5: "",
    reason6: "",
    reason7: "",
    reason8: "",
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
      },
    ],
    imageupload: "",
    videoupload: "",
    imageuploadpreview: upload,
    videouploadpreview: "",
    linktype: "",
    companyurl: "",
  };
  const [activeindex, setActive] = useState(1);
  const [values, setValue] = useState(formvalue);

  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  console.log(values);
  const data = {
    reason0: values.reason0,
    reason1: values.reason1,
    reason2: values.reason2,
    reason3: values.reason3,
    reason4: values.reason4,
    reason5: values.reason5,
    reason6: values.reason6,
    reason7: values.reason7,
    reason8: values.reason8,
    city: values.city,
    facebook: values.facebook,
    linkedin: values.linkedin,
    twitter: values.twitter,
    companylink: values.companylink,
  };

  console.log(data);

  const teamChange = (e, index, name) => {
    var teams = values.teams;
    if (e.target.files && e.target.files[0]) {
      teams[index] = {
        ...teams[index],
        [name]: e.target.files[0],
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
  const onsave = (e) => {
    e.preventDefault();

    if (activeindex <= 3) {
      setActive((prev) => prev + 1);

      if (activeindex === 1) {
        try {
          axios
            .post(
              "http://localhost:5000/reason/api/create-reason/" +
                values.companyname,
              data,
              config
            )
            .then((res) => {
              if (res.data.success) {
                toast.success(res.data.message);
              }
            });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };
  return (
    <Wrapper>
      <ToastContainer />
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
        <div className={activeindex === 1 ? "form-child" : "d-none"}>
          <Basic values={values} handleChange={handleChange} />
        </div>
        <div className={activeindex === 4 ? "form-child" : "d-none"}>
          <Visiblity handleChange={handleChange} values={values} />
        </div>
        <div className={activeindex === 3 ? "form-child" : "d-none"}>
          <Story
            handleChange={fileChange}
            imgpreview={values.imageuploadpreview}
            vdpreview={values.videouploadpreview}
          />
        </div>
        <div className={activeindex === 2 ? "form-child" : "d-none"}>
          <Team
            values={values}
            handleChange={handleChange}
            Addteam={Addteam}
            teamChange={teamChange}
          />
        </div>
      </section>
      <section className="save">
        <button onClick={onsave}>
          {activeindex === 4 ? "save" : "save and Continue"}
        </button>
      </section>
    </Wrapper>
  );
};
export default CompanyRegisterPage;
