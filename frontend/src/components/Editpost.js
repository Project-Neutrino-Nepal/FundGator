import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BsCardImage } from "react-icons/bs";
import { IoCloseCircleSharp, IoDocumentTextSharp } from "react-icons/io5";
import { RiVideoFill } from "react-icons/ri";
//import Feeds from "../DetailsPage/../../../components/feeds"
const EditPost = React.memo(({ item, model, clearvalue }) => {
  const [name, setName] = useState("");
  const closebtn = useRef(null)
  const [image, setPreview] = useState({
    preview:
      "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/totw_network_profile_400.jpg",
    file: "",
  });
  const [preview, setPreviews] = useState({
    img: item.image,
    vid: item.video,
    description: item.text,
   
  });
  const [values, setValue] = useState({
    img: item.image,
    vid: item.video,
    description: item.text,
  });

  // useEffect(() => {
  //   setPreview({
  //     img: item.image,
  //     vid: item.video,
  //     description: item.text,
  //   });
  // }, [item]);

  // const handletextChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setValue({ ...values, [e.target.name]: e.target.files[0] });
  //   } else {
  //     setValue({ ...values, [e.target.name]: e.target.value });
  //   }
  // };

  const handleChange = (e) => {
    // if (e.target.files && e.target.files[0]) {
    //   setValue({ ...values, [e.target.name]: e.target.files[0] });
    // } else {
    //   setValue({ ...values, [e.target.name]: e.target.value });
    // }
    setValue({ ...values, description: e.target.value });
  };
  const clearpreview = (name) => {
    console.log(name);
    setValue({ ...values, [name]: "" });
    setPreviews({ ...preview, [name]: "" });
  };
  const clearvalues = () => {
    setValue({
      img: "",
      vid: "",
      description: "",
    });
    setPreviews({
      img: "",
      vid: "",
      description: "",
    });
  };
  //this is change after pull
  const fileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      setValue({
        ...values,
        img: e.target.files[0],
      });
     // handleChange(e);

      setPreviews({ ...preview, [e.target.name]: blobURL,});
      e.target.value = null;
    }
  };

  const vfileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      setValue({ ...values, vid: e.target.files[0] });
    //  handleChange(e);

      setPreviews({ ...preview, [e.target.name]: blobURL, img: "" });

       e.target.value = null;
    }
  };
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("token"),
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", values.img);
    formData.append("vid", values.vid);
    // formData.append("doc", values.doc);
    if(values.description == null){
      values.description = item.text;
    } else {
    formData.append("description", values.description)
    }
    console.log("The desc -->",values.description);
    if (!values.img && !values.vid && !values.description) {
      toast.error("You can't post empty post");
      return;
    }
    if (values.img && values.vid) {
      toast.error("You can only upload one file at a time");
      return;
    }
    axios
      .put(
        `http://localhost:5000/posts/api/update-post/${item._id}`,
        formData,
        config
      )
      .then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        closebtn.current.click()
        //window.location.reload();
        //redirect to home page
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  if (model === "model show") {
    return <div></div>;
  }
  return (
    <>
      <ToastContainer />
      <div
        className={model}
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={clearvalues}
                ref={closebtn}
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={item?.profile?.avatar}
                  className="rounded rounded-5 img-circle"
                  alt=""
                  style={{ width: 40, height: 40 }}
                />
                <span className="text-dark fw-bold">
                  {item?.profile?.legal_name}
                </span>
              </div>
              <div className="form-floating">
                <textarea
                  value={values.description ?? item.text}
                  className="form-control border-0"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  name="description"
                  onChange={handleChange}
                ></textarea>
                <label for="floatingTextarea2">Enter Description</label>
              </div>
              <div className="d-flex gap-2">
                <div
                  className={
                    preview.img ?? item?.image ? "position-relative " : "d-none"
                  }
                >
                  <img
                    src={preview?.img ?? item?.image}
                    alt="preview"
                    height={100}
                    width={80}
                    style={{ objectFit: "cover" }}
                  />
                  <IoCloseCircleSharp
                    className="position-absolute top-0 end-0 fs-3 bg-white rounded-circle shadow shadow-sm"
                    name="img"
                    style={{ transform: "translate(9px , -9px) " }}
                    onClick={() => clearpreview("img")}
                  />
                </div>
                <div
                  className={
                    preview.vid ?? item?.video ? "position-relative " : "d-none"
                  }
                >
                  <video
                    src={preview.vid ?? item?.video}
                    alt=""
                    height={100}
                    width={80}
                    style={{ objectFit: "cover" }}
                  />
                  <IoCloseCircleSharp
                    className="position-absolute top-0 end-0 fs-3 bg-white rounded-circle shadow shadow-sm "
                    style={{ transform: "translate(9px , -9px) " }}
                    onClick={() => clearpreview("vid")}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex fs-5 gap-2">
                  <label htmlFor="img" className="pe-auto ">
                    <BsCardImage />
                  </label>
                  <label htmlFor="vid">
                    <RiVideoFill />
                  </label>
                  <label htmlFor="doc">
                    <IoDocumentTextSharp />
                  </label>
                </div>
                <div className="d-none">
                  <input
                    type="file"
                    accept="image/*"
                    name="img"
                    id="img"
                    onChange={fileSelection}
                  />
                  <input
                    type="file"
                    accept="video/*"
                    name="vid"
                    id="vid"
                    onChange={vfileSelection}
                  />
                  <input type="file" accept="image/*" name="doc" id="doc" />
                </div>
                <button
                  className="btn mt-2 bg-dark bg-opacity-10 rounded-pill  "
                  onClick={handleSubmit}
                >
                  post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default EditPost;
