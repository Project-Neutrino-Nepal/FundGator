import React, { useState } from "react";
import Wrapper from "../wrapper/Story";
import upload from "../../../assets/image/uploadpic.svg";
const Story = ({ handleChange, imgpreview, vdpreview }) => {
  const [preview, setPreview] = useState(null);
  const [vpreview, setvPreview] = useState(null);

  const fileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      setPreview(blobURL);
    }
  };
  const videofileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      setvPreview(blobURL);
    }
  };
  return (
    <Wrapper className="form-content">
      <h6>Your best Image *</h6>
      <p>
        Ideally, show the founders with their product. This will be front and
        center on your profile.
      </p>

      <label htmlFor="input-file" className="img-container">
        <img src={upload} alt="" className="upload-pic" />
        <input
          type="file"
          name="imageupload"
          id="input-file"
          onChange={(e) => handleChange(e, "imageuploadpreview")}
        />
        <img src={imgpreview} className="preview-img" alt="" />
      </label>

      <h5>Upload a 1-2 minute video</h5>
      <p>
        Please keep it simple with short description of your company: recording
        yourself with an overview of the company may brings difference on FundGator.
      </p>

      <label htmlFor="video-file" className="vfile btn btn-primary">
        upload video
      </label>
      <video src={vdpreview} controls></video>

      <input
        type="file"
        name="videoupload"
        id="video-file"
        onChange={(e) => handleChange(e, "videouploadpreview")}
      />
    </Wrapper>
  );
};

export default Story;
