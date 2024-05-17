import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import { ref, get } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Input from "../Component/Input";
import Button from "../Component/Button";

import db from "../firebase";
import "./login.css";

// Initialize Firebase Auth
const auth = getAuth();

// Create a new Google provider
const provider = new GoogleAuthProvider();

const initializeLoginForm = { email: "", password: "" };

function Login() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    get(ref(db, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const user = Object.values(snapshot
            .val())
            .find(
              (user) =>
                user.email === loginForm.email &&
                user.password === loginForm.password
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
      <a className="signin" href="/register">
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
        {/* <IconButton
          onClick={() => {
            signInWithPopup(auth, provider)
              .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                  GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
              })
              .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential =
                  GoogleAuthProvider.credentialFromError(error);
                console.error(error);
              });
          }}
        >
          <FcGoogle />
        </IconButton> */}
      </div>
    </div>
  );
}

export default Login;
