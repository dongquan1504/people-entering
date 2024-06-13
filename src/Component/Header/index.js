import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import MyQRCode from "../QRCode";
import "./header.css";

export default function Header({ children, setIsScanner, isScanner }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const savedAccount = JSON.parse(localStorage.getItem("account"));

  const toggleDrawer = () => {
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
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Button onClick={() => navigate("/login")}>Sign Out</Button>
        </div>
      </div>
      {children}
      <Drawer open={open} onClose={toggleDrawer} anchor="right">
        <div style={{ width: "80vw", maxWidth: "400px", padding: "20px 10px" }}>
          Hello {savedAccount?.name || "Guest"}!!
        </div>
        <Button
          onClick={() => {
            toggleDrawer();
            setIsScanner(!isScanner);
          }}
        >
          {!isScanner ? "Start" : "End"} Scan
        </Button>
        <MyQRCode />
      </Drawer>
    </header>
  );
}
