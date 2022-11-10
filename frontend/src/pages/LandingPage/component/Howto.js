import React from 'react'

import Wrapper from '../wrappers/Howto';

const Howto = ({icon,id,heading,text}) => {
  return (
    <Wrapper className="card">
      <img className='icon' src={icon} alt="" />
      <div className="card-info">
          <h6>0{id}</h6>
          <h5>{heading}</h5>
          <p>{text} </p>
      </div>
    </Wrapper>
  );
}

export default Howto