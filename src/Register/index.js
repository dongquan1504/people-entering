import { Box } from "@mui/material";
import bcrypt from "bcryptjs";
import { get, push, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Component/Button";
import Input from "../Component/Input";
import db from "../firebase";

import "./register.css";

const initializeLoginForm = {
  email: "",
  password: "",
  name: "",
  number: "",
};

function Register() {
  const [registerForm, setRegisterForm] = useState(initializeLoginForm);
  const [isError, setError] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const usersRef = ref(db, "users");

  const handleSignUp = () => {
    setSubmit(true);
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const user = Object.values(snapshot.val()).find(
            (user) => user.email === registerForm.email
          );

          if (
            !user &&
            registerForm.email &&
            registerForm.password
          ) {
            const newUserRef = push(usersRef);
            bcrypt.hash(registerForm.password, 10, function async(err, hash) {
              set(newUserRef, { ...registerForm, password: hash });
              const userWithoutPassword = { ...registerForm };
              delete userWithoutPassword.password;
              localStorage.setItem(
                "account",
                JSON.stringify(userWithoutPassword)
              );
            });

            navigate("/home");
          }
          setError(user);
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
        <div style={{ padding: "20px 0" }}>
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            style={{ marginBottom: "10px" }}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, email: e.target.value })
            }
            helperText={
              isSubmit && registerForm.email === "" && "this field is required"
            }
            error={isSubmit && registerForm.email === ""}
          />
        </div>
        <div style={{ padding: "20px 0" }}>
          <Input
            type="password"
            label="Password"
            required
            placeholder="Password"
            style={{ marginBottom: "15px" }}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, password: e.target.value })
            }
            helperText={
              isSubmit &&
              registerForm.password === "" &&
              "this field is required"
            }
            error={isSubmit && registerForm.password === ""}
          />
        </div>
        <div style={{ padding: "20px 0" }}>
          <Input
            type="text"
            label="Name"
            placeholder="enter your name"
            style={{ marginBottom: "15px" }}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, name: e.target.value })
            }
          />
        </div>
        <div style={{ padding: "20px 0" }}>
          <Input
            label="Phone Number"
            variant="outlined"
            name="phone"
            placeholder="your phone number"
            style={{ marginBottom: "15px" }}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, number: e.target.value })
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
