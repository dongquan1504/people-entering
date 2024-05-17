import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Tooltip, Legend, BarElement, Chart as ChartJS, CategoryScale, LinearScale } from "chart.js";

import Header from "../../Component/Header";

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const fakeData = [
  {
      student_id: 1,
      name: "John Doe",
      entry_time: "08:00:00",
      exit_time: "12:00:00"
  },
  {
      student_id: 2,
      name: "Jane Smith",
      entry_time: "08:15:00",
      exit_time: "11:30:00"
  },
  {
      student_id: 3,
      name: "Alice Johnson",
      entry_time: "09:00:00",
      exit_time: "12:45:00"
  },
  {
      student_id: 4,
      name: "Bob Brown",
      entry_time: "09:30:00",
      exit_time: "11:00:00"
  }
];

function Home() {
  // const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();
  const config = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80],
        backgroundColor: 'green',
        borderColor: "blue",
        borderWidth: 1
      }]
    };

  const options= {

  }

  return (
    <Header>
    <Bar data={config} options={options} />
    </Header>
  );
}

export default Home;
