import React, { useState } from "react";
import { Basic, Visiblity, Story } from "./component";
import Wrapper from "./wrapper/CompanyRegisterPage";
import tabs from "./utils/tab";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
const CompanyRegisterPage = () => {
  const formvalue = {
    name: "",
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
  };
  const [activeindex, setActive] = useState(1);
  const [values, setValue] = useState(formvalue);
  const handleChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };
  const data = {
    city: values.city,
    facebook: values.facebook,
    linkedin: values.linkedin,
    companylink: values.companylink,
    twitter: values.twitter,
    blog: values.blog,
    reason0: values.reason0,
    reason1: values.reason1,
    reason2: values.reason2,
    reason3: values.reason3,
    reason4: values.reason4,
    reason5: values.reason5,
    reason6: values.reason6,
    reason7: values.reason7,
    reason8: values.reason8,
  };
  // console.log(values);
  const onsave = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    if (activeindex <= 3) {
      setActive((prev) => prev + 1);
      if (activeindex == 1) {
        try {
          axios
            .post(
              "http://localhost:5000/company/reason/api/create-reason" +
                `/${useParams.name}`,
              values,
              config
            )
            .then((res) => {
              // if (res.data.success) {
              //   toast.success(
              //     res.data.message,
                  
              //   );
              // }
            });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

 
  console.log(data);

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
        {activeindex === 1 ? (
          <Basic values={values} handleChange={handleChange} />
        ) : null}
        {activeindex === 4 ? <Visiblity /> : null}
        {activeindex === 3 ? <Story /> : null}
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
