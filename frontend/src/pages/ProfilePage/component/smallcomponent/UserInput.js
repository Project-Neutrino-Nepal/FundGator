import axios from "axios";
import React, { useState, useEffect } from "react";
import Wrapper from "../../wrapper/smallcomponent/UserInput";
const UserInput = React.memo(
  ({ name, value, question, onsave, type, placeholder }) => {
    const [isEdit, setEdit] = useState(false);
    const [assigend, setValue] = useState(value);
    // useEffect(()=>{
    //   axios.get("http://localhost:5000/profile/api/profile/" + localStorage.getItem("userID")).then((res) => {
    //     //console.log(res.data);
    //   });
    //  // setValue(value)

    // },[value])
    const onSave = (e) => {
      onsave({ name: name, value: assigend });
      const data = {
        name: name,
      };
      console.log(onsave);
      axios
        .put(
          "http://localhost:5000/profile/api/edit-profile/" +
            localStorage.getItem("userID"),
          data
        )
        .then((res) => {
          console.log(res.data);
        });

      setEdit(true);
    };
    const onCancel = (e) => {
      e.stopPropagation();

      setEdit(false);
    };

    const stopropogation = (e) => {
      e.stopPropagation();
    };

    const toggleEdit = () => {
      setEdit((isEdit) => !isEdit);
      setValue(value);
    };

    const handleChange = (e) => {
      setValue(e.target.value);
    };
    return (
      <Wrapper
        className={isEdit ? "userinput active" : "userinput"}
        onClick={toggleEdit}
      >
        <h6>{name}</h6>
        <hr className={isEdit ? "" : "d-none"} />
        <div className="qsn">
          <h5 className={isEdit ? "" : "d-none"}>{question}</h5>
          <input
            type={type}
            value={assigend}
            className={isEdit ? "ifield " : "ifield unactive"}
            onClick={toggleEdit}
            onFocus={stopropogation}
            disabled={isEdit ? false : true}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </div>
        <div className={isEdit ? "buttons" : "d-none"}>
          <button className="btn-cancel" onClick={onCancel}>
            cancel
          </button>
          <button className="btn-save" onClick={onSave}>
            save
          </button>
        </div>
      </Wrapper>
    );
  }
);

export default UserInput;
