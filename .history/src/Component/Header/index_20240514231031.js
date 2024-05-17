import React from 'react';
import { useNavigate } from "react-router-dom";

import Button from '../Button';

export default function Header({ children }) {
  const navigate = useNavigate();

  return (
    <header>
      <div>
      <h1>Header</h1>
      <Button> Sign Out</Button>
      </div>
      {children}
    </header>
  );
}