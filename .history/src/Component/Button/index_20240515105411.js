import React from "react";
import {}

function Button({ style, ...rest }) {
  return <button style={{ padding: "8px 15px", ...style }} {...rest} />;
}
export default Button;
