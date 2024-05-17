import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { ref, set, get, push } from "firebase/database";
import { Box } from "@mui/material";
import bcrypt from "bcryptjs";

import Input from "../Component/Input";
import Button from "../Component/Button";
import db from "../firebase";

import "./register.css";

const initializeLoginForm = {
  email: "",
  password: "",
  name: "",
  number: "",
  birthday: "",
};

function Register() {
  const [registerForm, setRegisterForm] = useState(initializeLoginForm);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();
  const usersRef = ref(db, "users");

  const handleSignUp = () => {
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const user = Object.values(snapshot.val()).find(
            (user) => user.email === registerForm.email
          );

          if (!user) {
            const newUserRef = push(usersRef);
            bcrypt.hash(registerForm.password, 10, function(err, hash) {
              // Store hash in your password DB.
              console.log(hash);
              bcrypt.hash(hash,10)
              console.log(err);
            })
            // set(newUserRef, registerForm);

            // localStorage.setItem("account", JSON.stringify(registerForm));
            // navigate("/home");
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
      <div className="register">
        <a className="signin" href="/login">
          Sign In
        </a>
        <h1>Register</h1>
        <div className="text-input">
          <div>Email:</div>
          <Input
            type="email"
            placeholder="Email"
            style={{ marginBottom: "10px" }}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, email: e.target.value })
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
              setRegisterForm({ ...registerForm, password: e.target.value })
            }
          />
        </div>
        <div className="text-input">
          <div>Name:</div>
          <Input
            type="text"
            placeholder="enter your name"
            style={{ marginBottom: "15px" }}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, name: e.target.value })
            }
          />
        </div>
        <div className="text-input">
          <div>Number:</div>
          <Input
            type="number"
            placeholder="your phone number"
            style={{ marginBottom: "15px" }}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, number: e.target.value })
            }
          />
        </div>
        <div className="text-input">
          <div>Birth of Day:</div>
          <Input
            type="date"
            style={{ marginBottom: "15px" }}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, birthday: e.target.value })
            }
          />
        </div>

        {isError && (
          <Box sx={{ color: "red", size: "small" }}>this email existed</Box>
        )}
        <div className="groupBtn">
          <Button onClick={handleSignUp}>Sign Up</Button>
          {/* <FcGoogle /> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
