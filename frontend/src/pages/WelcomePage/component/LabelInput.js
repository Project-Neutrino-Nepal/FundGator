import React from 'react'
import Wrapper from '../wrapper/LabelInput'

const LabelInput = ({name,placeholder}) => {
  return (
    <Wrapper>
      <label htmlFor="">{name} :</label>
      <input type="text" placeholder={placeholder}/>
    </Wrapper>
  )
}

export default LabelInput
