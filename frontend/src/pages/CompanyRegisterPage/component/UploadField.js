import React from "react";

const UploadField = ({ label, name, accept, handleChange }) => {
  return (
    <div className="d-flex flex-column gap-4 w-100 border border-1 p-2">
      <p>{label}</p>
      <input
        type="file"
        accept={accept}
        name={name}
        id={name}
        style={{ "font-size": 10 }}
        onChange={handleChange}
      />

      <label
        htmlFor={name}
        className="bg-dark bg-opacity-25 text-white text-center py-2 w-100"
      >
        Upload
      </label>
    </div>
  );
};

export default UploadField;
