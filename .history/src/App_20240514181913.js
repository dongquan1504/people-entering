import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Manager from './Manager';

function App() {
  return (
    <div className="App">
      <Login />
      {/* <h1>Control Number of People Entering</h1> */}
    </div>
  );
}

export default App;
