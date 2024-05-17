import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "./App.css";
import Login from "./Login";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/manager'>
            ok
          </Route>
        </Switch>
    </Router>
  );
}