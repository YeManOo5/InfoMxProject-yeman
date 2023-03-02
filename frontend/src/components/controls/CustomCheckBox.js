import React from "react";

const CustomCheckBox = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}/>
  );
};

export default CustomCheckBox;