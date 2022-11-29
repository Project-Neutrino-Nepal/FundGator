import React from 'react'
import Wrapper from '../wrapper/LabelInput'

const Labelinput = ({type,label,name,placeholder,handleChange,value}) => {
  return (
    <Wrapper>
      <label htmlFor="">{label}</label>
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={handleChange} />
    </Wrapper>
  )
}

export default Labelinput
