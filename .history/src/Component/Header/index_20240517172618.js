import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Drawer } from "@mui/material";

import Button from "../Button";
import "./header.css";

export default function Header({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center",
          margin: "0 80px",
        }}
      >
        <div onClick={() => navigate("/home")}>
          <h1>Header</h1>
        </div>
        <div className="right-header">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Button onClick={() => navigate("/login")}>Sign Out</Button>
        </div>
      </div>
      {children}
      <Drawer open={open} onClose={toggleDrawer()} anchor="">
        ok
      </Drawer>
    </header>
  );
}
