import React from "react";

import { Input as MuiInput } from "@mui/material";

function Input({ style, ...rest }) {
  return <MuiInput sx={{ height: "35px", ...style }} {...rest} />;
}

export default Input;
