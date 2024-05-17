import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { ref, set, get, push } from "firebase/database";

import Input from "../Component/Input";
import Button from "../Component/Button";
import "./register.css";
import db from "../firebase";

const initializeLoginForm = {
  email: "",
  password: "",
  name: "",
  age: 0,
  number: "",
};

function Register() {
  const [signInForm, setSignInForm] = useState(initializeLoginForm);
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
          setSignInForm({ ...signInForm, email: e.target.value })
        }
      />
      <Input
        type="password"
        placeholder="Password"
        style={{ marginBottom: "15px" }}
        onChannge={(e) =>
          setSignInForm({ ...signInForm, password: e.target.value })
        }
      />
      <div className="groupBtn">
        <Button
          onClick={() => {
            set(
                push(ref(db, "users")),
                signInForm
            );
            navigate("");
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
