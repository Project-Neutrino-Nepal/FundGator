import React, { useEffect, useState } from "react";
import axios from "axios";
import Feeds from "./feeds";
import EditPost from "./Editpost";
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
  }, [config]);
  if (loading) {
    return <div>...Loading</div>;
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
