import React from "react";
import { Button as MuiButton } from "@mui/material";

function Button({ style, ...rest }) {
  return <Button style={{ padding: "8px 15px", ...style }} {...rest} />;
}
export default Button;
