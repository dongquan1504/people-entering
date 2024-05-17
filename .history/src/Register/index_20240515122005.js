import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../Component/Input";
import Button from "../Component/Button";
import "./login.css";

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
    <div className="re">
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
        <Button onClick={()=>navigate("")}>Sign In</Button>
        {/* <FcGoogle /> */}
      </div>
    </div>
  );
}

export default Register;