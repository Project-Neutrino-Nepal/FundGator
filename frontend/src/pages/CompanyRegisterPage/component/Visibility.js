import React, { useState, useRef, useMemo } from "react";

import Wrapper from "../wrapper/Visibility";
import JoditEditor from "jodit-react";
const Visiblity = ({ handleChange, values, setcontent }) => {
  const editor = useRef(null);
 

  

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
    </Wrapper>
  );
};

export default Visiblity;
