import React from "react";

import Wrapper from "../wrapper/Visibility";
// import JoditEditor from "jodit-react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');
import ReactQuill from "react-quill";
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
  // const { quill, quillRef } = useQuill();

  // React.useEffect(() => {
  //   if (quill) {
  //     quill.on("text-change", (delta, oldDelta, source) => {
  //       console.log("Text change!");
  //       console.log(quill.getText()); // Get text only
  //       console.log(quill.getContents()); // Get delta contents
  //       console.log(quillRef.current.firstChild.innerHTML);

  //       // setcontent(quill.root.innerHTML); // Get innerHTML using quillRef
  //       setcontent(quillRef.current.firstChild.innerHTML);
  //     });
  //   }
  // }, [quill, quillRef]);

  return (
    <Wrapper className="form-content">
      <div>
      <h4 className="fw-semibold">Write short description of your company?</h4>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea3"
          rows={5}
          name="content"
          value={values.content}
          onChange={handleChange}
        ></textarea>
      </div>

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
              values={values.registration_card}
            />
            <UploadField
              label={"PAN card"}
              name={"pan_card"}
              accept="image/*"
              handleChange={handleChange}
              clearfile={clearfile}
              filesubmit={onpancard}
              values={values.pan_card}
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
              values={values.citizenship_front}
            />
            <UploadField
              label={"Citizenship card(Back side)"}
              name={"citizenship_back"}
              accept="image/*"
              handleChange={handleChange}
              clearfile={clearfile}
              filesubmit={oncitizenbackcard}
              values={values.citizenship_back}
            />
          </div>
        </form>
      </section>
    </Wrapper>
  );
};

export default Visiblity;
