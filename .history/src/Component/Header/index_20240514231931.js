import React from 'react';
import { useNavigate } from "react-router-dom";

import Button from '../Button';

const MyElement = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export default function Header({ children }) {
  const navigate = useNavigate();

  return (
    <header>
      <div style={{display: "flex", justifyContent: "space-between", margin: "0 80px"}}>
      <div onClick={()=> navigate("/home")}>
      <h1>Header</h1>
      </div>
      <Button onClick={()=> navigate("/login")}>Sign Out</Button>
      </div>
      {children}
    </header>
  );
}