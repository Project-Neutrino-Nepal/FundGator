import React from "react";

import Wrapper from "../wrapper/Visibility";
// import JoditEditor from "jodit-react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css";
import UploadField from "./UploadField";

const Visiblity = ({ handleChange, values, setcontent }) => {
  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log("Text change!");
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quillRef.current.firstChild.innerHTML);

        // setcontent(quill.root.innerHTML); // Get innerHTML using quillRef
        setcontent(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, quillRef]);

  return (
    <Wrapper className="form-content">
      {/* <JoditEditor
        ref={editor}
        value={content}
        // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          setContent(newContent);
        }}
      /> */}
      {/* <ReactQuill
        theme="snow"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /> */}
      <section
        style={{ width: "clac(550px + 400px)", height: 400 }}
        className="quill"
      >
        <div ref={quillRef} />
      </section>

      <section className="fuploads  p-2 w-100 ">
        <div className="d-flex gap-2">
          <UploadField
            label={"Photo"}
            name={"vimage"}
            accept="image/*"
            handleChange={handleChange}
          />
          <UploadField
            label={"Video"}
            name={"vvideo"}
            accept="video/*"
            handleChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2 mt-2">
          <UploadField
            label={"Audio"}
            name={"vaudio"}
            accept="audio/*"
            handleChange={handleChange}
          />
          <UploadField
            label={"PDF"}
            name={"vpdf"}
            accept="application/pdf"
            handleChange={handleChange}
          />
        </div>
      </section>
    </Wrapper>
  );
};

export default Visiblity;
