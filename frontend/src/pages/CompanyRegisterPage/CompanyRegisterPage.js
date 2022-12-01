import React, { useState } from "react";
import { Basic, Visiblity, Story } from "./component";
import Wrapper from "./wrapper/CompanyRegisterPage";
import tabs from "./utils/tab";
import { toast } from "react-toastify";
import axios from "axios";
const CompanyRegisterPage = () => {
  const formvalue = {
    name:"",
    city:"",
    facebook:"",
    linkedin:"",
    instagram:"",
    companylink:"",
    twitter:"",
    youtube:"",
    blog:"",
    reason0:"",
    reason1:"",
    reason2:"",
    reason3:"",
    reason4:"",
    reason5:"",
    reason6:"",
    reason7:"",
    reason8:"",
    
  }
  const data={
    name:formvalue.name,
    city:formvalue.city,
    facebook:formvalue.facebook,
    linkedin:formvalue.linkedin,
    instagram:formvalue.instagram,
    companylink:formvalue.companylink,
    twitter:formvalue.twitter,
    youtube:formvalue.youtube,
    blog:formvalue.blog,

  }
const createCompany= async(e)=>{
e.preventDefault();
const config={
  headers:{
    authorization:localStorage.getItem("token")
  }
}
try {
  await axios
    .post("http://localhost:5000/users/api/register", formvalue,config)
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


}
 
  const [activeindex, setActive] = useState(1);
  const [values,setValue] =useState(formvalue)

 const handleChange =(e)=>{
  setValue({...values,[e.target.name]:e.target.value})

 }
console.log(values);
 const onsave =()=>{
  if(activeindex <=3){
    setActive((prev)=> prev + 1)

  }
 }
  return (
    <Wrapper>
      <section className="tabs-container" style={{marginTop:80}}>
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
