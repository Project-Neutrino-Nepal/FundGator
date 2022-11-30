import React from 'react'


import Wrapper from '../wrapper/Visibility';
const Visiblity = () => {

  return (

    <Wrapper className="form-content">

      <p>Who should be able to see your company?</p>

      <div className="radios ">

        <div className="d-flex gap-3">

          <input type="radio" name="privacy" id="" />

          <label htmlFor="">Anyone who visits FunGator</label>

        </div>

        <div className="d-flex gap-3">

          <input type="radio" name="privacy" id="" />

          <label htmlFor="">Anyone with the link</label>

        </div>

      </div>



        <p>

          https://wefunder.com/

          <input type="text" name="" id="" />

        </p>

    </Wrapper>

  );

}



export default Visiblity