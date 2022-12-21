import React, { useState, useRef } from "react";
import Wrapper from "../wrapper/UploadField";
import { IoMdCloseCircle } from "react-icons/io";
const UploadField = ({
  label,
  name,
  accept,
  handleChange,
  clearfile,
  filesubmit,
}) => {
  const [preview, setPreview] = useState("");
  const filestate = useRef(null);

  const fileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      handleChange(e);
      setPreview(blobURL);
    }
  };

  const clearpreview = (e) => {
    setPreview("");
    clearfile(name);
    filestate.current.value = "";
  };

  const onsubmit = (e) => {
    e.preventDefault();
    // console.log("hello");
    filesubmit(e);
  };

  return (
    <Wrapper className="d-flex flex-column gap-4 w-100 border border-1 p-2 position-relative">
      <p>{label}</p>
      <input
        type="file"
        accept={accept}
        name={name}
        id={name}
        style={{ "font-size": 10 }}
        onChange={(e) => fileSelection(e)}
        ref={filestate}
      />
      {preview ? (
        <IoMdCloseCircle
          className="position-absolute start-0 top-0 text-white fs-3"
          style={{ zIndex: "2" }}
          onClick={(e) => clearpreview(e)}
          name={name}
        />
      ) : null}
      {preview ? (
        <img
          src={preview}
          alt=""
          className="position-absolute top-0 start-0 w-100 h-100 "
        />
      ) : null}
      {!preview ? (
        <label
          htmlFor={name}
          className="bg-dark bg-opacity-25 text-white text-center py-1 fs-5 w-100"
        >
          Upload
        </label>
      ) : (
        <button
          className=" border-0  text-white text-center py-1 fs-5 w-100  "
          onClick={onsubmit}
        >
          Upload
        </button>
      )}
    </Wrapper>
  );
};

export default UploadField;
