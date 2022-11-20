import React from 'react'
import cashimg from "../../../assets/image/cash.png"
import Wrapper from '../wrapper/Portfolio'
const Cash = () => {
  return (
    <Wrapper>
      <img src={cashimg} alt="" className="fileimg" />
      <p className='heading'>You don't have any Cash yet</p>
      <p className='desc'>You can deposit from a wire transfer or a linked account</p>
      <div className="buttons">
        <button>ADD New Bank Account</button>
        <button className='btn-cash'>Make Khalti/Esewa Transfer</button>
      </div>
    </Wrapper>
  );
}

export default Cash