import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Wrapper from "../wrapper/Setting";
import UserInput from "./smallcomponent/UserInput";

//backend integration of profile page
function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [panNo, setPanNo] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [skills, setSkills] = useState("");
  const [legal_name, setLegal_name] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFront, setImageFront] = useState("");
  const [imageBack, setImageBack] = useState("");

  const [formvalue, setform] = useState();
  const onsave = ({ name, value }) => {
    setform({ ...formvalue, [name]: value });
    console.log("saved");
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile/api/my-profile", config)
      .then((res) => {
        const profile = res.data.profile;
        setform(profile);
        setEmail(profile.email);
        setBio(profile.bio);
        setCountry(profile.country);
        setName(profile.name);
        setWebsite(profile.website);
        setPanNo(profile.pan_No);
        setAddress(profile.address);
        setStatus(profile.status);
        setSkills(profile.skills);
        setLegal_name(profile.legal_name);
        setPhone(profile.phone);
        setImageFront(profile.cit_front);
        setImageBack(profile.cit_back);
      });
  }, [formvalue]);

  return (
    <Wrapper>
      <div className="right-container">
        <section className="account">
          <h1>Account</h1>
          <UserInput
            name={"email"}
            value={email}
            question={"whats your Email?"}
            onsave={onsave}
            type={"email"}
            placeholder={email}
          />
          <div className="passwordreset hover">
            <span>Password</span>
            <span>Reset</span>
          </div>
          <div
            className="btn-delete hover"
            // make modal on click to delete account
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span>
              Delete Account &nbsp; &nbsp;
              <i className="fas fa-trash-alt"></i>
            </span>
          </div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title text-danger fs-5"
                    id="exampleModalLabel"
                  >
                    Delete Account
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Are you sure you want to delete your account ? you will lose
                  all your data, and you will not be able to recover it.
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => {
                      axios
                        .delete(
                          "http://localhost:5000/users/api/delete-user/",
                          config
                        )
                        .then((res) => {
                          localStorage.clear();
                          sessionStorage.clear();

                          console.log(res);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Delete &nbsp; &nbsp;
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="investorinfo">
          <h4>Investor Info</h4>
          <UserInput
            name={"Legal Name"}
            value={legal_name}
            question={"whats your Name ?"}
            onsave={onsave}
            type={"text"}
            placeholder={legal_name}
          />
          <UserInput
            name={"bio"}
            value={bio}
            question={"Share your bio?"}
            onsave={onsave}
            type={"text"}
            placeholder={bio}
          />
          <UserInput
            name={"country"}
            value={country}
            question={"Contry of country?"}
            onsave={onsave}
            type={"text"}
            placeholder={country}
          />
          <UserInput
            name={"pan_No"}
            value={panNo}
            question={"Whats your Pan ID?"}
            onsave={onsave}
            type={"Number"}
            placeholder={panNo}
          />
          <div className="pancard d-flex justify-content-between mt-2">
            <div
              className="pancard-front img-fluid"
              style={{ height: "10vh", width: "100%" }}
            >
              <label htmlFor="">PAN Card Front</label>
              <Card className="border border-2">
                <img src={imageFront} alt="front" />
              </Card>
            </div>
            <div
              className="pancard-back img-fluid"
              style={{ height: "10vh", width: "100%" }}
            >
              <label htmlFor="">PAN Card Back</label>
              <Card className="border border-2">
                <img src={imageBack} alt="Back" />
              </Card>
            </div>
          </div>
        </section>

        <section className="publicprofile mt-5">
          <h4>Public Info</h4>
          <UserInput
            name={"name"}
            value={name}
            question={"whats your name?"}
            onsave={onsave}
            type={"name"}
            placeholder={name}
          />
          <UserInput
            name={"email"}
            value={email}
            question={"whats your Email?"}
            onsave={onsave}
            type={"email"}
            placeholder={email}
          />
          <UserInput
            name={"address"}
            value={address}
            question={"whats your Address?"}
            onsave={onsave}
            type={"address"}
            placeholder={address}
          />
          <UserInput
            name={"skills"}
            value={skills}
            question={"whats your skills?"}
            onsave={onsave}
            type={"skills"}
            placeholder={skills}
          />
          <UserInput
            name={"phone"}
            value={phone}
            question={"whats your phone?"}
            onsave={onsave}
            type={"phone"}
            placeholder={phone}
          />
          <UserInput
            name={"website"}
            value={website}
            question={"whats your website?"}
            onsave={onsave}
            type={"website"}
            placeholder={website}
          />
        </section>
      </div>
    </Wrapper>
  );
}

export default Settings;
