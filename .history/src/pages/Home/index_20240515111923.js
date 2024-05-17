import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
} from "chart.js";
import { Tabs, Tab, Box } from "@mui/material";
import "chartjs-adapter-moment";

import Header from "../../Component/Header";

ChartJS.register(
  Tooltip,
  Legend,
  BarElement,
  LineElement,
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
  const [isBarMode, setIsBarMode] = useState(true);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const barConfig = {
    labels: fakeData.map((data) => data.name),
    datasets: [
      {
        label: "entry time",
        data: fakeData.map(
          (data) => new Date(`1970-01-01T${data.entry_time}+08:00`)
        ),
        backgroundColor: "green",
        borderColor: "blue",
        borderWidth: 1,
      },
      {
        label: "exit time",
        data: fakeData.map(
          (data) => new Date(`1970-01-01T${data.exit_time}+08:00`)
        ),
        backgroundColor: "gray",
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          },
        },
      },
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabPanels = [
    {
      label: "Bar",
      value: 0,
      component: <Bar data={barConfig} options={barOptions} />,
    },
    {
      label: "Linear",
      value: 1,
      component: "Linear Chart",
    },
  ];

  return (
    <Header>
      <Tabs
        role="tabs"
        aria-label="basic tabs"
        scrollButtons="auto"
        allowScrollButtonsMobile
        variant="scrollable"
        data-cy="tab-list"
        value={value || tabPanels[0]?.value}
        onChange={handleChange}
      >
        {tabPanels.map((tab, index) => (
          <Tab label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      {tabPanels.map((tab, index) =>
        value === index ? (
          <div
            role="tabpanel"
            hidden={tab.value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
          >
            <Box sx={{ p: 3 }}>{tab.component}</Box>
          </div>
        ) : null
      )}

      {/* {isBarMode && <Bar data={config} options={options} />} */}
    </Header>
  );
}

export default Home;