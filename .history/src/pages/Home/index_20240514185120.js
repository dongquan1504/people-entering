import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import BarChart from "chartjs";
import "./login.css";

const initializeLoginForm = { email: "", password: "" };

function Login() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();

  return (
    <BarChart/>
  );
}

export default Login;