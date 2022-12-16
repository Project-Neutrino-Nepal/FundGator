import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import upload from "../../assets/image/uploadpic.svg";
import { Basic, Story, Team, Visiblity } from "./component";
import tabs from "./utils/tab";
import Wrapper from "./wrapper/CompanyRegisterPage";
const parse = require("html-react-parser");

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
    amount: "",
    category: "",
    tag: "",
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
    content: "",
    registration_card: "",
    pan_card: "",
    citizenship_front: "",
    citizenship_back: "",
  };

  const navigate = useNavigate();

  const [activeindex, setActive] = useState(1);
  const [values, setValue] = useState(formvalue);

  const videouploads = values.videoupload;

  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const data = {
    amount: values.amount,
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
  //to pass variable to add teams data
  const teamsdata = {
    teams: values.teams,
  };

  const setcontent = (content) => {
    setValue({ ...values, content: content });
  };

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
      // creating reasons
      if (activeindex === 1) {
        try {
          axios
            .post(
              "http://localhost:5000/reason/api/create-reason/" +
                formvalue.companyname,
              data,
              config
            )
            .then((res) => {
              if (res.data.success) {
              }
            });
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
      // updating reasons and adding team members
      else if (activeindex === 2) {
        try {
          axios
            .put(
              "http://localhost:5000/reason/api/update-reason/" +
                formvalue.companyname,
              teamsdata,
              config
            )
            .then((res) => {
              if (res.data.success) {
              }
            });
        } catch (error) {
          console.log(error.response.data.message);
        }
      } else if (activeindex === 3) {
        const formData = new FormData();
        formData.append("company_video", videouploads);
        console.log(formData);

        try {
          axios
            .put(
              "http://localhost:5000/company/api/upload-video/" +
                formvalue.companyname,
              formData,
              config
            )
            .then((res) => {
              if (res.data.success) {
              }
            });
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("registration_card", values.registration_card);
        formData.append("pan_card", values.pan_card);
        formData.append("citizenship_front", values.citizenship_front);
        formData.append("citizenship_back", values.citizenship_back);
        formData.append("content", values.content);
        console.log(formData);
        axios
          .put(
            "http://localhost:5000/company/api/multipleimages/" +
              formvalue.companyname,
            formData,
            config
          )
          .then((res) => {
            if (res.data.success) {
              toast.success(
                "Company created Successfully",
                setTimeout(() => {
                  navigate("/homepage");
                }, 1200)
              );
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Wrapper>
      <ToastContainer />
      <section className="tabs-container mt-5" id="RaiseFund">
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
          <Visiblity
            handleChange={handleChange}
            values={values}
            setcontent={setcontent}
          />
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
