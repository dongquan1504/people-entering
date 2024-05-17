import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { ref, set, get, push } from "firebase/database";
import { Box } from "@mui/material";

import Input from "../Component/Input";
import Button from "../Component/Button";
import db from "../firebase";

import "./register.css";

const initializeLoginForm = {
  email: "",
  password: "",
  name: "",
  age: 0,
  number: "",
};

function Register() {
  const [registerForm, setRegisterForm] = useState(initializeLoginForm);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="register">
      <a className="signin" href="/login">
        Sign In
      </a>
      <h1>Register</h1>
      <Input
        type="email"
        placeholder="Email"
        style={{ marginBottom: "10px" }}
        onChannge={(e) =>
          setRegisterForm({ ...registerForm, email: e.target.value })
        }
      />
      <Input
        type="password"
        placeholder="Password"
        style={{ marginBottom: "15px" }}
        onChannge={(e) =>
          setRegisterForm({ ...registerForm, password: e.target.value })
        }
      />

      {isError && (
        <Box sx={{ color: "red", size: "small" }}>
          this email exist
        </Box>
      )}
      <div className="groupBtn">
        <Button
          onClick={() => {
            get(ref(db, "users"))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  // console.log(snapshot.val());
                  const user = snapshot
                    .val()
                    .find((user) => user.email === registerForm.email);

                  if (user) {
                    set(push(ref(db, "users")), registerForm);
                    navigate("");
                  }
                  setError(true);
                } else {
                  console.log("No data available");
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          Sign Up
        </Button>
        {/* <FcGoogle /> */}
      </div>
    </div>
  );
}

export default Register;