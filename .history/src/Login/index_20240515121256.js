import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import { ref, set, get } from "firebase/database";

import Input from "../Component/Input";
import Button from "../Component/Button";

import db from "../firebase";
import "./login.css";

const initializeLoginForm = { email: "", password: "" };

function Login() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    get(ref(db, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());

    const user = fakeData.find(
      (user) =>
        user.email === loginForm.email && user.password === loginForm.password
    );
    if (user) {
      navigate("/home");
    }
    setError(true);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
          onChange={(e) =>
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
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
      </div>
      {isError && (
        <Box sx={{ color: "red", size: "small" }}>
          invalid email or password
        </Box>
      )}
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
