import axios from "axios";
import React, { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "./wrapper/WelcomePage";

const WelcomePage = () => {
  const [legalName, setLegalName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [skills, setSkills] = useState("");
  const [image, setPreview] = useState({
    preview: "https://github.com/mdo.png",
    file: "",
  });

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const onuploadimg = (e) => {
    console.log(e.target.value);
    setPreview({ ...image, file: e.target.files[0] });
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);

      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      axios
        .put(
          "http://localhost:5000/profile/api/update-profile",
          formData,
          config
        )
        .then((res) => {
          toast.success("Profile updated successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPreview({ ...image, preview: " " });
      console.log("no file selected");
    }
  };
  const validate = () => {
    if (
      legalName === "" &&
      country === "" &&
      address === "" &&
      bio === "" &&
      website === "" &&
      skills === ""
    ) {
      toast.error("All fields are Required.");
      return false;
    }
    if (legalName === "") {
      toast.error("Legal Name is required");
    }
    if (country === "") {
      toast.error("Country is required");
    }
    if (address === "") {
      toast.error("Address is required");
    }
    if (bio === "") {
      toast.error("Bio is required");
    }
    if (website === "") {
      toast.error("Website is required");
    }
    if (skills === "") {
      toast.error("Skills is required");
    }
    return true;
  };

  const UpdateUser = async (e) => {
    await axios
      .put("http://localhost:5000/users/api/update-user", config)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          toast.success(
            res.data.message,
            setTimeout(function () {
              window.location.href = "/homepage";
            }, 2000)
          );
        }
      });
  };

  const UpdateProfiles = (e) => {
    e.preventDefault();

    const data = {
      legal_name: legalName,
      country: country,
      address: address,
      bio: bio,
      website: website,
      skills: skills,
    };
    if (validate()) {
      try {
        axios
          .put("http://localhost:5000/profile/api/update-profile", data, config)
          .then((response) => {
            if (response.data.success) {
              UpdateUser();
              toast.success(
                response.data.message,
                setTimeout(function () {
                  window.location.href = "/homepage";
                }, 2000)
              );
            }
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Wrapper>
      <ToastContainer />
      <form id="profileUpdate" style={{ margin: "80px" }}>
        <div className="welcome mt-5">
          <h2 className="heading" id="InfoText">Investor Information</h2>
          <p>
            To invest online, federal law requires that we collect some info
          </p>
          <div className="inputs m-2">
            <label className="m-2"> Legal Name:&nbsp;&nbsp;</label>
            <input
              className="p-1"
              type="text"
              placeholder="Enter Your Legal Name"
              id="legalName"
              value={legalName}
              onChange={(e) => {
                setLegalName(e.target.value);
              }}
            />
            <br />
            <label className="m-2">
              {" "}
              Country:&nbsp;&nbsp;&nbsp; &emsp; &nbsp;
            </label>
            <input
              className="p-1 "
              type="text"
              placeholder="Enter Your Country"
              id="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
            <br />
            <label className="m-2"> Address:&nbsp;&nbsp; &emsp; &nbsp;</label>
            <input
              className="p-1"
              type="text"
              placeholder="Enter Your Address"
              id="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>

          <p>
            To invest online, NRB Policies and SEBON Guidline requires that we
            collect some info
          </p>
          <section className="public">
            <h4 className="heading">Public Infomration</h4>
            <p>show founders </p>
            <div className="information">
              <div className="inputs">
                <textarea
                  name=""
                  id="bio"
                  cols="30"
                  rows="10"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <input
                  type="text"
                  placeholder="personal weslite"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="add skills"
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn-continue"
              id="updateButton"
              onClick={UpdateProfiles}
            >
              SAVE & CONTINUE
            </button>
          </section>
        </div>
      </form>
    </Wrapper>
  );
};

export default WelcomePage;
