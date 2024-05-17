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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-moment";

import Header from "../../Component/Header";

ChartJS.register(
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  TimeScale
);

const fakeData = [
  {
    // 2024-11-06
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
        data: fakeData.map(
          (data) => new Date(`1970-01-01T${data.entry_time}A`)
        ),
        backgroundColor: "green",
        borderColor: "blue",
        borderWidth: 1,
      },
      {
        label: "exit time",
        data: fakeData.map((data) => new Date(`1970-01-01T${data.exit_time}Z`)),
        backgroundColor: "green",
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "time",
        time: {
          // Luxon format string
          // unit: "second",
          // displayFormats: {
          //   quarter: "HH:MM:S",
          // },
          unit: "hour",
          displayFormats: {
            hour: "h:mm:ss a",
          },
        },
      },
    },
  };

  return (
    <Header>
      <Bar data={config} options={options} />
    </Header>
  );
}

export default Home;
