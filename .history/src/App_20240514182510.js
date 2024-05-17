import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="*" element={<>oki</>}>
          <Route path="/login" element={<Login />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
