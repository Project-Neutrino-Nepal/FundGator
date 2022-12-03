import React from "react";
import folderimg from "../../../assets/image/file.svg";
import Wrapper from "../wrapper/Portfolio";
const Portfolio = () => {
  return (
    <Wrapper>
      {/* <img src={folderimg} alt=""  className="fileimg"/>
      <p>build your own startup</p>
      <button>Explore Companies</button> */}

      <div className="post-box-list">
        <div className="post-box">
          <img
            src="https://images.unsplash.com/photo-1529567186287-3e17bdefa342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
            alt=""
          />
          <div className="user-info">
            <div className="info">
              <span className="username">username</span>
              <img
                src="https://images.unsplash.com/photo-1623323650632-94f1b9a018a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80"
                className="profile-pic"
                alt=""
              />
            </div>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              itaque vero deleniti consequuntur alias vitae sunt, officia
              voluptatem, est at commodi tenetur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Doloribus aperiam magnam velit alias
              et dolorum tenetur porro soluta earum, debitis ducimus incidunt.
              Odio sed aut vel commodi, vitae distinctio ipsam laborum aliquid
              placeat in modi maxime minima, facere, quos maiores!
            </p>
          </div>
          <div className="investment">
            <h6>Total investment</h6>
            <h6>$ 10000</h6>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Portfolio;
