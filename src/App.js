import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes as Switch } from 'react-router-dom';

import "./App.css";
import Login from "./Login";
import Home from "./pages/Home";
import Register from "./Register";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path='*' element={<Navigate to="/login" />} />
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />}/>
        </Switch>
    </Router>
  );
}
