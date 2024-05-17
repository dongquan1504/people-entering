import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
// import { Tooltip, Legend, BarElement, Chart as ChartJS, CategoryScale, LinearScale } from "chartjs";

function Home() {
  // const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();
  const config = {
    type: 'bar',
    data:  {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'green',
        borderColor: "blue",
        borderWidth: 1
      }]
    },
  };

  const options= {

  }

  return (
    <Bar data={config} options={options} />
  );
}

export default Home;
