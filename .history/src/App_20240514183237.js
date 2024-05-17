import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/manager">
            <Manager />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
