import React from "react";

import Wrapper from "../wrapper/Visibility";
const Visiblity = ({ handleChange, values }) => {
  const { companyurl, linktype } = values;

  return (
    <Wrapper className="form-content">
      <p>Who should be able to see your company?</p>

      <div className="radios ">
        <div className="d-flex gap-3">
          <input
            type="radio"
            name="linktype"
            value={false}
            id=""
            checked={linktype === "false" ? true : false}
            onChange={handleChange}
          />

          <label htmlFor="">Anyone who visits FunGator</label>
        </div>

        <div className="d-flex gap-3">
          <input
            type="radio"
            name="linktype"
            value={true}
            id=""
            checked={linktype === "true" ? true : false}
            onChange={handleChange}
          />

          <label htmlFor="">Anyone with the link</label>
        </div>
      </div>

      <p>
        https://wefunder.com/
        <input
          type="text"
          name="companyurl"
          id=""
          onChange={handleChange}
          value={companyurl}
        />
      </p>
    </Wrapper>
  );
};

export default Visiblity;
