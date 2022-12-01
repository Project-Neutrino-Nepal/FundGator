import React, { useState } from "react";
import Wrapper from "../wrapper/Story";
import upload from "../../../assets/image/uploadpic.svg";
const Story = () => {
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

      <label for="input-file" className="img-container">
        <img src={upload} alt="" srcset="" className="upload-pic" />
        <input type="file" name="" id="input-file" onChange={fileSelection} />
        <img src={preview} className="preview-img" alt="" />
      </label>

      <h5>Upload a 1-2 minute video</h5>
      <p>
        Please keep it simple: recording yourself with an iPhone will do. Fancy
        expensive videos perform worse on Wefunder.
      </p>

      <label htmlFor="video-file" className="vfile btn btn-primary">
        upload video
      </label>
      <video src={vpreview} controls></video>

      <input
        type="file"
        name=""
        id="video-file"
        onChange={videofileSelection}
      />
    </Wrapper>
  );
};

export default Story;
