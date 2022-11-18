import React from "react";
import Wrapper from "./wrapper/UserProfilePage";
import { Link } from "react-router-dom";
const UserProfilePage = () => {
  return (
    <Wrapper>
      <div className="left-container">
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="profilepic"
        />
        <h2>name</h2>

        <Link to="/Welcome" className="btn-edit">
          edit profile
        </Link>

        <h2>10</h2>
        <p>karma</p>
        <p>Meme since November 2022</p>
      </div>

      <div className="right-container">
        <h1>interested in..</h1>
        <p>artifical intelligence</p>

        <h1>i am using FundGator for </h1>
        <p>Raise Money</p>
      </div>
    </Wrapper>
  );
};

export default UserProfilePage;
