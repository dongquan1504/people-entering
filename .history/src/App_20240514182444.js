import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="*">
            oki
          </Route>
          <Route path="/login" element={}>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
