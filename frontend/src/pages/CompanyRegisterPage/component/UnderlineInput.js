import React,{useState} from "react";
import Wrapper from "../wrapper/UnderlineInput";

const UnderlineInput = ({
  type,
  label,
  name,
  placeholder,
  handleChange,
  index,
  value
}) => {

  const [border,setBorder] = useState(false)
  return (
    <Wrapper className={border? "underlineinput active":"underlineinput"}>
      <label htmlFor="">{index}</label>
      <input type={type} name={name} onChange={handleChange} placeholder={placeholder} value={value} onFocus={()=>setBorder(true)} onBlur={()=>setBorder(false)} />
    </Wrapper>
  );
};

export default UnderlineInput;
