import { Box } from "@mui/material";
import bcrypt from "bcryptjs";
import { get, ref } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Component/Button";
import Input from "../Component/Input";

import db from "../firebase";
import "./login.css";

// // Initialize Firebase Auth
// const auth = getAuth();

// // Create a new Google provider
// const provider = new GoogleAuthProvider();

const initializeLoginForm = { email: "", password: "" };

function Login() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    get(ref(db, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const user = Object.values(snapshot.val()).find(
            (user) => user.email === loginForm.email
          );
          // console.log(bcrypt.hash(loginForm.password, 10));
          if (user) {
            bcrypt.compare(
              loginForm.password,
              user.password,
              function (err, result) {
                if (result) {
                  // Passwords match
                  const userWithoutPassword = { ...user };
                  delete userWithoutPassword.password;
                  localStorage.setItem(
                    "account",
                    JSON.stringify(userWithoutPassword)
                  );
                  navigate("/home");
                } else {
                  // Passwords don't match
                  setError(true);
                }
              }
            );
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
    <div className="container">
      <div className="login">
        <Button
          sx={{
            position: "fixed",
            top: "5px",
            right: "20px",
          }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        <h1>Login</h1>
        <div style={{ padding: "20px 0" }}>
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            // style={{ marginBottom: "10px" }}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
          />
        </div>
        <div style={{ padding: "20px 0" }}>
          <Input
            type="password"
            label="Password"
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
    </div>
  );
}

export default Login;
