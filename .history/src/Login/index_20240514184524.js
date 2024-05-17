import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import Input from "../Component/Input";
import Button from "../Component/Button";
import "./login.css";

const initializeLoginForm = { email: "", password: "" };

function Login() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);

  return (
    <div className="login">
      <a className="signin" href="/signin">
        Sign In
      </a>
      <h1>Login</h1>
      <div className="text-input">
        <div>Email:</div>
        <Input
          type="email"
          placeholder="Email"
          // style={{ marginBottom: "10px" }}
          onChannge={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
        />
      </div>
      <div className="text-input">
        <div>Password:</div>
        <Input
          type="password"
          placeholder="Password"
          style={{ marginBottom: "15px" }}
          onChannge={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
      </div>
      <div className="groupBtn">
        <Button onClick={()=>nav}>Login</Button>
        <FcGoogle />
      </div>
    </div>
  );
}

export default Login;
