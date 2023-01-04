import axios from "axios";
import React, { useEffect, useState } from "react";
import EditPost from "./Editpost";
import Feeds from "./feeds";
import Loading from "./loading";
import AddPost from "./AddPost";
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
    item: "",
    index: "",
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

  const modelvalue = (value, index) => {
    setitem({ item: value, index: index });
    setPreviews({ ...preview, img: value.image, vid: value.video });
    setValue({ ...values, description: value.text });
  };

  const onsuccess = (value, index) => {
    const { image, video, text } = value;
    let newfeed = feeds;
    if (image) {
      newfeed[index].image = image;
      newfeed[index].video = "";
      newfeed[index].text = text;
      setFeeds(newfeed);
    }
    if (video) {
      newfeed[index].video = video;

      newfeed[index].image = "";

      newfeed[index].text = text;
      setFeeds(newfeed);
    }
  };

  const [preview, setPreviews] = useState({
    img: null,
    vid: null,
    doc: "",
  });
  const [values, setValue] = useState({
    img: "",
    vid: "",
    doc: "",
    description: "",
  });

  const clearpreview = (name) => {
    console.log(name);

    setValue({ ...values, [name]: "" });
    setPreviews({ ...preview, [name]: "" });
  };

  const clearall = () => {
    setPreviews({
      img: "",
      vid: "",
      doc: "",
    });
    setValue({
      img: "",
      vid: "",
      doc: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValue({ ...values, [e.target.name]: e.target.files[0] });
    } else {
      setValue({ ...values, [e.target.name]: e.target.value });
    }
  };
  const fileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      setValue({
        ...values,
        [e.target.name]: e.target.files[0],
        vid: "",
      });

      setPreviews({ ...preview, [e.target.name]: blobURL, vid: "" });
      e.target.value = null;
    }
  };

  const vfileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      setValue({ ...values, [e.target.name]: e.target.files[0], img: "" });

      setPreviews({ ...preview, [e.target.name]: blobURL, img: "" });

      e.target.value = null;
    }
  };

  const deleteitem = (value) => {
    let newfeed = feeds;
    const filterfeed = newfeed.filter((item) => item._id !== value);
    setFeeds(filterfeed);
  };

  const addnew = (value) => {
    setFeeds([...feeds, value]);
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
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      {feeds.map((feed, index) => {
        return (
          <Feeds
            key={feed._id}
            feed={feed}
            idchange={idchange}
            changemodel={changemodel}
            modelvalue={modelvalue}
            index={index}
            deleteitem={deleteitem}
          />
        );
      })}
      <EditPost
        item={item.item}
        index={item.index}
        changemodel={changemodel}
        model={showmodal2}
        onsuccess={onsuccess}
        handleChange={handleChange}
        fileSelection={fileSelection}
        vfileSelection={vfileSelection}
        clearpreview={clearpreview}
        values={values}
        preview={preview}
        clearall={clearall}
      />

      <AddPost addnew={addnew} />
    </div>
  );
};
export default Feed;
