import axios from "axios";
import React, { useEffect, useState } from "react";
import EditPost from "./Editpost";
import Feeds from "./feeds";
import Loading from "./loading";
const Feed = () => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const [feeds, setFeeds] = useState([]);
  const [model, setmodel] = useState("modal fade");
  const [loading, setloading] = useState(true);
  const [id, setId] = useState(null);
  const [item, setitem] = useState({
    _id: "",
    img: "",
    vid: "",
    description: "",
  });

  const [showmodal, setmodal] = useState("modal fade");
  const [showmodal2, setmodal2] = useState("modal fade");
  const clearvalue = () => {
    setitem({
      _id: "",
      img: "",
      vid: "",
      description: "",
      
    });
    
  };
  const idchange = (id) => {
    setId(id);
  };

  const changemodel = (value) => {
    setmodal(value);
  };
  const closemodel = () => {
    setmodal2("modal fade");
  };
  

  const changemodel2 = (value) => {
    setmodal2(value);
  };

  const modelvalue = (value) => {
    setitem(value);
    console.log(value);
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/posts/api/get-all-posts", config)
        .then((res) => {
          setFeeds(res.data.posts);
          setloading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, [...feeds]);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="d-flex col-md-12 justify-content-around ms-3">
        <div className="col-md-7">
          {feeds.map((feed) => {
            return (
              <Feeds
                key={feed._id}
                feed={feed}
                idchange={idchange}
                changemodel={changemodel}
                modelvalue={modelvalue}
              />
            );
          })}
          <EditPost item={item} changemodel={changemodel} model={showmodal2} />
        </div>
        <div
          className="card col-md-4 sticky-top  "
          style={{ height: "600px", top: 80 }}
        >
          <div className="card-body">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Feed;
