import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import BarChart from "chartjs";
import "./login.css";

const initializeLoginForm = { email: "", password: "" };

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

function Login() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();

  return (
    <BarChart config/>
  );
}

export default Login;
