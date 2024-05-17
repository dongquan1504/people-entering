import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {IconB}

import Button from "../Button";
import "./header.css";

export default function Header({ children }) {
  const navigate = useNavigate();

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
          <MenuIcon />
          <Button onClick={() => navigate("/login")}>Sign Out</Button>
        </div>
      </div>
      {children}
    </header>
  );
}