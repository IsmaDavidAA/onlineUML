import React from "react";
const Input = (props) => {
  return (
    <div>
      <input
        className={props.className}
        value={props.value}
        disabled={props.disabled}
      />
      <button onClick={props.action}>-</button>
    </div>
  );
};

export default Input;
