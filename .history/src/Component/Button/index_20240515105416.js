import React from "react";
import { Button } from "@mui/material";

function Button({ style, ...rest }) {
  return <button style={{ padding: "8px 15px", ...style }} {...rest} />;
}
export default Button;
