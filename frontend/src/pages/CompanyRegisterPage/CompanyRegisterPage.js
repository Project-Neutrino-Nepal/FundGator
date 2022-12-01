import React, { useState } from "react";
import { Basic} from "./component";
import Wrapper from "./wrapper/CompanyRegisterPage";
import tabs from "./utils/tab";
const CompanyRegisterPage = () => {
  const formvalue = {
    companyname:"",
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
    
  }
  const [activeindex, setActive] = useState(1);
  const [values,setValue] =useState(formvalue)

 const handleChange =(e)=>{
  setValue({...values,[e.target.name]:e.target.value})

 }

 const onsave =()=>{
  if(activeindex <=3){
    setActive((prev)=> prev + 1)

  }
 }
  return (
    <Wrapper>
      <section className="tabs-container">
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
    
      </section>
      <section className="save">
        <button onClick={onsave}> {activeindex === 4 ? "save" : "save and Continue"}</button>
      </section>
    </Wrapper>
  );
};

export default CompanyRegisterPage;
