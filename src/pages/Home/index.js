import React, { useEffect, useState } from "react";

import { Box, Tab, Tabs } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";
import { get, ref } from "firebase/database";
import { Bar, Line } from "react-chartjs-2";
import db from "../../firebase";

import Header from "../../Component/Header";

ChartJS.register(
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale
);

function Home() {
  const [valueTab, setValueTab] = useState(0);
  const [data, setData] = useState([]);

  const config = {
    labels: (data || []).map((d) => d?.name),
    datasets: [
      {
        label: "entry time",
        data: (data || []).map(
          (d) => new Date(`${d?.entry_day}T${d?.entry_time}+08:00`)
        ),
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1,
      },
      {
        label: "exit time",
        data: (data || []).map(
          (d) => new Date(`${d?.exit_day}T${d?.exit_time}+08:00`)
        ),
        backgroundColor: "gray",
        borderColor: "gray",
        borderWidth: 1,
      },
    ],
  };

  const options = {
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

  useEffect(() => {
    get(ref(db, "data"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const tabPanels = [
    {
      label: "Bar",
      value: 0,
      component: <Bar data={config} options={options} />,
    },
    {
      label: "Linear",
      value: 1,
      component: <Line data={config} options={options} />,
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
        value={valueTab || tabPanels[0]?.value}
        onChange={handleChange}
      >
        {tabPanels.map((tab, index) => (
          <Tab label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      {tabPanels.map((tab, index) =>
        valueTab === index ? (
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
