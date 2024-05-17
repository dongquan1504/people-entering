import React from 'react';

import Button from '../Button';
export default function Header({ children }) {
  return (
    <header>
      <h1>Header</h1>
      {children}
    </header>
  );
}