import React from "react";

function Input({ style, ...rest }) {
  return <input style={{ height: "35px", ...style }} {...rest} />;
}
export default Input;
