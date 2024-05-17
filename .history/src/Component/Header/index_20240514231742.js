import React from 'react';
import { useNavigate } from "react-router-dom";

import Button from '../Button';

export default function Header({ children }) {
  const navigate = useNavigate();

  return (
    <header>
      <div style={{display: "flex", justifyContent: "space-between", margin: "0 80px"}}>
      <div style={{ hover: {cur"pointer"}}} onClick={()=> navigate("/home")}>
      <h1>Header</h1>
      </div>
      <Button onClick={()=> navigate("/login")}>Sign Out</Button>
      </div>
      {children}
    </header>
  );
}