import React from "react";
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';

import "./App.css";
import Login from "./Login";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path='*' element={<Navigate "" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<>ok</>}/>
        </Switch>
    </Router>
  );
}
