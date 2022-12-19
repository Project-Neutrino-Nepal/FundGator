import React, { useEffect, useState } from "react";
import axios from "axios";
import Feeds from "./feeds";
const Feed = () => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/posts/api/get-all-posts", config)
        .then((res) => {
          setFeeds(res.data.posts);
          console.log(res.data.posts);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      {feeds.map((feed) => {
        return <Feeds key={feed._id} feed={feed} />;
      })}
    </div>
  );
};

export default Feed;
