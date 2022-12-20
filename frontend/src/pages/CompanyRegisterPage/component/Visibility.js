import React from "react";

import Wrapper from "../wrapper/Visibility";
// import JoditEditor from "jodit-react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css";
import UploadField from "./UploadField";

const Visiblity = ({
  handleChange,
  values,
  setcontent,
  clearfile,
  onregistrationcard,
  onpancard,
  oncitizenfrontcard,
  oncitizenbackcard,
}) => {
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
      <section
        style={{ width: "clac(550px + 400px)", height: 400 }}
        className="quill"
      >
        <div ref={quillRef} />
      </section>

      <section className="fuploads  p-2 w-100 ">
        <h4 className="fw-semibold">Please upload your document here!</h4>
        <form action="" encType="multipart/form-data" method="post">
          <div className="d-flex gap-2">
            <UploadField
              label={"Company registration card"}
              name={"registration_card"}
              accept="image/*"
              handleChange={handleChange}
              clearfile={clearfile}
              filesubmit={onregistrationcard}
            />
            <UploadField
              label={"PAN card"}
              name={"pan_card"}
              accept="image/*"
              handleChange={handleChange}
              clearfile={clearfile}
              filesubmit={onpancard}
            />
          </div>

          <div className="d-flex gap-2 mt-2">
            <UploadField
              label={"Citizenship card(Front side)"}
              name={"citizenship_front"}
              accept="image/*"
              handleChange={handleChange}
              clearfile={clearfile}
              filesubmit={oncitizenfrontcard}
            />
            <UploadField
              label={"Citizenship card(Back side)"}
              name={"citizenship_back"}
              accept="image/*"
              handleChange={handleChange}
              clearfile={clearfile}
              filesubmit={oncitizenbackcard}
            />
          </div>
        </form>
      </section>
    </Wrapper>
  );
};

export default Visiblity;
