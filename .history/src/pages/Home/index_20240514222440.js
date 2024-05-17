import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import BarChart from "chartjs";

const initializeLoginForm = { email: "", password: "" };


function Home() {
  const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();
  const config = {
    type: 'bar',
    data: [1,3,4,5,6],
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

export default Home;
