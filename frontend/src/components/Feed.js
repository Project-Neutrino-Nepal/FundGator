import React, { useEffect, useState } from "react";
import axios from "axios";
import Feeds from "./feeds";
import Editpost from "./Editpost"
const Feed = () => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const [feeds, setFeeds] = useState([]);
  const [loading, setloading] = useState(true);
  const [id, setId] = useState(null);
  const idchange = (id) => {
    setId(id);
  };
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/posts/api/get-all-posts", config)
        .then((res) => {
          setFeeds(res.data.posts);
          setloading(false);
          console.log(res.data.posts);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  if (loading) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      {feeds.map((feed) => {
        return <Feeds key={feed._id} feed={feed} idchange={idchange} />;
      })}
      <Editpost id={id ?? feeds[1]._id} />
    </div>
  );
};
export default Feed;