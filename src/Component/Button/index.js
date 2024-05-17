import { Button as MuiButton } from "@mui/material";
import React from "react";

function Button({ style, ...rest }) {
  return <MuiButton style={{ padding: "8px 15px", ...style }} {...rest} />;
}
export default Button;
