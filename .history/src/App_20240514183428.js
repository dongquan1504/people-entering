import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/manager">
            ok
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
