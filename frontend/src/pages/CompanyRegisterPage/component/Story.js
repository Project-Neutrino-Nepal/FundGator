import React, { useState } from "react";
import Wrapper from "../wrapper/Story";
import upload from "../../../assets/image/uploadpic.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
const Story = ({ handleChange, imgpreview, vdpreview }) => {
  const [image, setPreview] = useState(null);
  const [vpreview, setvPreview] = useState(null);
  const { id } = useParams();

  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const onuploadimg = (e) => {
    console.log(e.target.value);
    setPreview({ ...image, file: e.target.files[0] });
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      handleChange(e);
      setPreview(blobURL);
      axios
        .put(
          "http://localhost:5000/company/api/upload-companyimage/" + id,
          formData,
          config
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onuploadvid = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      handleChange(e, "videouploadpreview");
      setvPreview(blobURL);
    }
  };

  console.log(image);

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
          onChange={onuploadimg}
          accept="image/*"
        />
        <img src={image} className="preview-img" alt="" />
      </label>

      <h5>Upload a 1-2 minute video</h5>
      <p>
        Please keep it simple with short description of your company: recording
        yourself with an overview of the company may brings difference on
        FundGator.
      </p>

      <label htmlFor="video-file" className="vfile btn btn-primary">
        upload video
      </label>
      {vpreview ? <video src={vpreview} controls></video> : null}

      <input
        type="file"
        name="videoupload"
        id="video-file"
        accept="video/*"
        onChange={onuploadvid}
      />
    </Wrapper>
  );
};

export default Story;
