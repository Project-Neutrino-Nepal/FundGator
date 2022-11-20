import React from 'react'
import { AiOutlineBank, AiFillHeart, AiFillCreditCard } from "react-icons/ai";
import Wrapper from '../wrapper/Portfolio';

const BankandCards = () => {
  return (
    <Wrapper>
      <div className="icons-container">
        <AiOutlineBank/>
        <AiFillHeart/>
        <AiFillCreditCard/>
      </div>

      <p>Add Your Bank Account</p>

      <div className="buttons">
        <button>Add New Bank Account</button>
        <button className='add-new'>Add New Card</button>
      </div>
    </Wrapper>
  )
}

export default BankandCards