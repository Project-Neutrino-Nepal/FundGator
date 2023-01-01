import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Basic, Story, Team, Visiblity } from "./component";
import tabs from "./utils/tab";
import Wrapper from "./wrapper/CompanyRegisterPage";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:5000");

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
    tag: [],
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
        name: "",
        email: "",
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
    imageuploadpreview: "",
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

  const membervalidation = () => {
    let team = values.teams;
    let valid = false;
    for (let i = 0; i < team.length; i++) {
      if (
        team[i].name &&
        team[i].email &&
        team[i].foundertype &&
        team[i].position &&
        team[i].jobtype &&
        (team[i].userfblink || team[i].userlinkedinlink)
      ) {
        valid = true;
      } else {
        valid = false;
        return valid;
      }
    }
    console.log(valid);
    return valid;
  };

  const videouploads = values.videoupload;

  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const data = {
    category: values.category,
    tag: values.tag,
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
  const companyName = values.companyname;
  const image = values.imageupload;
  const content = values.content;

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

  const handleTags = (e) => {
    setValue({ ...values, tag: e });
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

  const clearfile = (name) => {
    setValue({ ...values, [name]: "" });
  };

  const onsave = (e) => {
    e.preventDefault();
    const {
      companyname,
      city,
      facebook,
      linkedin,
      instagram,
      companylink,
      twitter,
      youtube,
      blog,
      amount,
      category,
      tag,
      reason0,

      imageupload,
      videoupload,
    } = values;

    if (activeindex <= 3) {
      // creating reasons
      if (activeindex === 1) {
        if (
          companyname &&
          city &&
          (facebook ||
            linkedin ||
            instagram ||
            companylink ||
            twitter ||
            youtube ||
            blog) &&
          amount &&
          category &&
          tag.length > 0 &&
          reason0
        ) {
          setActive((prev) => prev + 1);

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
                  toast.success(res.data.message);
                }
              });
          } catch (error) {
            toast.error(error.response.data.message);
          }
        } else {
          toast.error("please fill all the fields ");
        }
      }
      // updating reasons and adding team members
      else if (activeindex === 2) {
        if (membervalidation()) {
          setActive((prev) => prev + 1);

          try {
            axios
              .put(
                "http://localhost:5000/reason/api/update-team/" +
                  formvalue.companyname,
                { teams: values.teams },
                config
              )
              .then((res) => {
                if (res.data.success) {
                  toast.success("teams added successfully");
                }
              });
          } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
          }
        }
      } else if (activeindex === 3) {
        if (imageupload && videoupload) {
          setActive((prev) => prev + 1);

          const formData = new FormData();
          formData.append("company_video", videouploads);

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
                  toast.success("video uploaded successfully");
                }
              });
          } catch (error) {
            console.log(error.response.data.message);
          }
        }
      }
    } else if (activeindex === 4) {
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
            "http://localhost:5000/company/api/update-document/" +
              formvalue.companyname,
            formData,
            config
          )
          .then((res) => {
            if (res.data.success) {
              toast.success(
                "Company created Successfully",
                setTimeout(() => {
                  window.location.href = `/profile`;
                }, 1200)
              );
              //sends the event details via Socket.io
              const companyID = res.data.company._id;

              socket.emit("newCompany", { companyName, image, companyID });
              console.log(companyName, image, content);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ontabchange = (index) => {
    const {
      companyname,
      city,
      facebook,
      linkedin,
      instagram,
      companylink,
      twitter,
      youtube,
      blog,
      amount,
      category,
      tag,
      reason0,
      teams,
      imageupload,
      videoupload,
    } = values;
    if (index === 1) {
      if (
        companyname &&
        city &&
        (facebook ||
          linkedin ||
          instagram ||
          companylink ||
          twitter ||
          youtube ||
          blog) &&
        amount &&
        category &&
        tag.length > 0 &&
        reason0
      ) {
        setActive(index);
      }
    } else if (index === 2) {
      if (membervalidation()) {
        setActive(index);
      } else {
        toast.error("please fill all the fields ");
      }
    } else if (index === 3) {
      if (videoupload) {
        setActive(index);
      } else {
        toast.error("please upload videos ");
      }
    }
  };

  const onregistrationcard = () => {
    console.log("cardregister");
  };

  const onpancard = () => {
    console.log("pan card submit");
  };

  const oncitizenfrontcard = () => {
    console.log("citizenfront card submit");
  };

  const oncitizenbackcard = () => {
    console.log("citizenback card submit");
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
              onClick={() => ontabchange(item.id)}
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
          <Basic
            values={values}
            handleChange={handleChange}
            handleTags={handleTags}
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

        <div className={activeindex === 3 ? "form-child" : "d-none"}>
          <Story
            handleChange={fileChange}
            imgpreview={values.imageuploadpreview}
            vdpreview={values.videouploadpreview}
          />
        </div>

        <div className={activeindex === 4 ? "form-child" : "d-none"}>
          <Visiblity
            handleChange={handleChange}
            values={values}
            setcontent={setcontent}
            clearfile={clearfile}
            onregistrationcard={onregistrationcard}
            onpancard={onpancard}
            oncitizenfrontcard={oncitizenfrontcard}
            oncitizenbackcard={oncitizenbackcard}
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
