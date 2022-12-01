import React, { useState } from "react";
import Member from "./Member";

import Wrapper from "../wrapper/Team";
import Labelinput from "./Labelinput";

const Team = ({ values, handleChange, Addteam, teamChange }) => {

  const [members, setMembers] = useState(0);

  const [newuser, setNewuser] = useState({
    email: "",
    name: "",
  });

  const newhandlechange = (e) => {
    setNewuser({ ...newuser, [e.target.name]: e.target.value });
  };
  return (
    <Wrapper className="form-content">
      <h6>
        Tell us about the team{" "}
        <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          + Add Memeber
        </span>{" "}
      </h6>

      {/* <Member {...option} /> */}

      {values.teams.map((item, index) => {
        return (
          <div className="mem" key={index}>
            <Member
              item={item}
              handleChange={teamChange}
              index={index}
              options={values}
              members={members}
            />
          </div>
        );
      })}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <Labelinput
                  type={"text"}
                  placeholder={"Enter Name"}
                  label={"Name"}
                  handleChange={newhandlechange}
                  name={"name"}
                />
                <Labelinput
                  type={"text"}
                  placeholder={"Enter Email"}
                  label={"Email"}
                  name={"email"}
                  handleChange={newhandlechange}
                />
              </form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => Addteam(newuser.name, newuser.email)}
                  data-bs-dismiss={newuser.email && newuser.name ? "modal" : ""}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Team;
