import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Tooltip,
  Legend,
  BarElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
} from "chart.js";

import Header from "../../Component/Header";

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const fakeData = [
  {
    student_id: 1,
    name: "John Doe",
    entry_time: "08:00:00",
    exit_time: "12:00:00",
  },
  {
    student_id: 2,
    name: "Jane Smith",
    entry_time: "08:15:00",
    exit_time: "11:30:00",
  },
  {
    student_id: 3,
    name: "Alice Johnson",
    entry_time: "09:00:00",
    exit_time: "12:45:00",
  },
  {
    student_id: 4,
    name: "Bob Brown",
    entry_time: "09:30:00",
    exit_time: "11:00:00",
  },
];

function Home() {
  // const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();

  const config = {
    labels: fakeData.map((data) => data.name),
    datasets: [
      {
        label: "entry time",
        data: fakeData.map((data) => data.entry_time),
        backgroundColor: "green",
        borderColor: "blue",
        borderWidth: 1,
      },
      {
        label: "exit time",
        data: fakeData.map((data) => data.exit_time),
        backgroundColor: "green",
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          // Luxon format string
          tooltipFormat: 'HH T'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
    }
  };

  return (
    <Header>
      <Bar data={config} options={options} />
    </Header>
  );
}

export default Home;
