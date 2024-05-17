import React from "react";

import { Input as MU } from "@mui/material";

function Input({ style, ...rest }) {
  return <input style={{ height: "35px", ...style }} {...rest} />;
}
export default Input;
