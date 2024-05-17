import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <div className="App">
    <Router>
        <Switch>
          <Route path="*" element={<>oki</>}>
          <Route path="/login" element={<Login />}/>
        </Switch>
    </Router>
      </div>
  );
}

export default App;
