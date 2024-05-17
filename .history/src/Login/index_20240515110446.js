import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IconButton, Box } from "@mui/material";

import Input from "../Component/Input";
import Button from "../Component/Button";
import "./login.css";

const initializeLoginForm = { email: "", password: "" };

const fakeData = [
  { email: "quanduong@gmail.com", password: "123" },
  { email: "kimbao@gmail.com", password: "123" },
];

function Login() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (fakeData.includes(loginForm)) {
      navigate("/home");
    }
    setError(true)
  };

  return (
    <div className="login">
      <a className="signin" href="/signin">
        Register
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
      {isError&&<Box sx={{ color: "red" }}>invalid email or password</Box>}
      <div className="groupBtn">
        <Button onClick={handleSubmit}>Login</Button>
        <IconButton onClick={() => console.log("ok")}>
          <FcGoogle />
        </IconButton>
      </div>
    </div>
  );
}

export default Login;
