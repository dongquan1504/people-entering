import React from 'react';

import Button from '../Button';
export default function Header({ children }) {
  return (
    <header>
      <div>
      <h1>Header</h1>
<Button
      </div>
      {children}
    </header>
  );
}