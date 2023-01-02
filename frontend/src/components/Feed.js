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

  const idchange = (id) => {
    setId(id);
  };

  const changemodel = (value) => {
    setmodal(value);
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
    <div>
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
  );
};
export default Feed;
