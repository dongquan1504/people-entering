import React from "react";

import { TextField } from "@mui/material";

function Input({ style, ...rest }) {
  return <TextField fullWidth sx={{ height: "35px", ...style }} {...rest} />;
}

export default Input;
