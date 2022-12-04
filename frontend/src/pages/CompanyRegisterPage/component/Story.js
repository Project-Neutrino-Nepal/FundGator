import React, { useState } from "react";
import Wrapper from "../wrapper/Story";
import upload from "../../../assets/image/uploadpic.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
const Story = ({ handleChange, imgpreview, vdpreview }) => {


const [image, setPreview] = useState(null);
  const [vpreview, setvPreview] = useState(null);
  const {id}=useParams();

  const config={
    headers:{
      authorization:localStorage.getItem("token")}
  }

const onuploadimg = (e) => {
  console.log(e.target.value);
  setPreview({ ...image, file: e.target.files[0] });
  if (e.target.files && e.target.files[0]) {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("company_logo", e.target.files[0]);
    axios
      .put(
        "http://localhost:5000/company/api/update-companyimage/"+id,
        formData,
        config
      )
      .then((res) => {
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
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
        />
        <img src={imgpreview} className="preview-img" alt="" />
      </label>
      
      <div className="">

      <h6 className="btn btn-sm p-2 w-25 fw-semibold m-2 ms-0 btn-primary  ">upload pic</h6>
      </div>

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
