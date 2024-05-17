import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import BarChart from "chartjs";
import "./login.css";

const initializeLoginForm = { email: "", password: "" };


function Login() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();
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

  return (
    <BarChart config/>
  );
}

export default Login;
