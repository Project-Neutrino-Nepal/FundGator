import React, { useState, useEffect } from "react";
import Wrapper from "../../wrapper/smallcomponent/PasswordInput";
const Passwordinput = ({
  value,
  name,
  onsave,
  
  value2,
  name2,
  
  name1,
  value1,
  name3,
  value3,
}) => {
  const [isEdit, setEdit] = useState(false);
  const [assigend, setValue] = useState(value);
  const [assigend2, setValue2] = useState(value);
  const [assigend3, setValue3] = useState(value);


  const [assigend1, setValue1] = useState(value);

  useEffect(() => {
    setValue(value);
    setValue2(value2);

    setValue1(value1);
    setValue3(value3);

  }, [value]);
  const onSave = (e) => {
    onsave({
      name: name,
      value: assigend,
      name1: name1,
      value1: assigend1,
      name2: name2,
      value2: assigend2,
      name3:name3,
      value3,assigend3
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
  const handleChange1 = (e) => {
    setValue(e.target.value);
  };
  const handleChange2 = (e) => {
    setValue(e.target.value);
  };
    const handleChange3 = (e) => {
      setValue(e.target.value);
    };
  return (
    <Wrapper
      className={isEdit ? "userinput active" : "userinput"}
      onClick={toggleEdit}
    >
      <h6>Password Id information</h6>
      <hr className={isEdit ? "" : "d-none"} />

      <div className="qsn">
        <h5 className={isEdit ? "" : "d-none"}>Passport / ID number</h5>
        <input
          className={isEdit ? "ifield " : "d-none"}
          type="text"
          onClick={toggleEdit}
          onFocus={stopropogation}
          disabled={isEdit ? false : true}
          onChange={handleChange}
          placeholder={"xxxxxxxxxx"}
          value={assigend}
        />
      </div>

      <div className="qsn">
        <h5 className={isEdit ? "" : "d-none"}>Passport / ID Issue date</h5>
        <input
          type="text"
          className={isEdit ? "ifield " : "d-none"}
          onClick={toggleEdit}
          onFocus={stopropogation}
          disabled={isEdit ? false : true}
          onChange={handleChange3}
          placeholder={"mm/dd/yy"}
          value={assigend3}
        />
      </div>
      <div className="qsn">
        <h5 className={isEdit ? "" : "d-none"}>
          Passport / ID expiration date
        </h5>
        <input
          type="text"
          className={isEdit ? "ifield " : "d-none"}
          onClick={toggleEdit}
          onFocus={stopropogation}
          disabled={isEdit ? false : true}
          onChange={handleChange1}
          placeholder={"mm/dd/yy"}
          value={assigend1}
        />
      </div>
      <div className="qsn">
        <h5 className={isEdit ? "" : "d-none"}>
          Passport / ID issuing country
        </h5>
        <input
          className={isEdit ? "ifield " : "d-none"}
          type="text"
          placeholder="Nationality"
          onClick={toggleEdit}
          onFocus={stopropogation}
          disabled={isEdit ? false : true}
          onChange={handleChange2}
          value={assigend2}
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
};

export default Passwordinput;
