import React, { useState, useRef, useMemo } from "react";

import Wrapper from "../wrapper/Visibility";
import JoditEditor from "jodit-react";
const Visiblity = ({ handleChange, values, setcontent }) => {
  const editor = useRef(null);
  const parse = require('html-react-parser');
  const text=parse(values.content);
 

  

  return (
    <Wrapper className="form-content">
      <JoditEditor
        ref={editor}
        value={values.content}
        tabIndex={1} // tabIndex of textarea
        // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          setcontent(newContent);
        }}
      />
      <div>{values.content}</div>
      <div>{text}</div>
    </Wrapper>
  );
};

export default Visiblity;
