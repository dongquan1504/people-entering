import React, { useState } from "react";

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
import { Bar, Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

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

export default function ChartTab({ item, savedAccount }) {
  const [valueTab, setValueTab] = useState(0);
  const options = {
    // responsive: true,
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
    setValueTab(newValue);
  };

  const config = (res) => {
    return {
      labels: (res || []).map((d) => d?.name),
      datasets: [
        {
          label: "entry time",
          data: (res || []).map(
            (d) => new Date(`1970-01-01 ${d?.entry_time}+08:00`)
          ),
          backgroundColor: "green",
          borderColor: "green",
          borderWidth: 1,
        },
        {
          label: "exit time",
          data: (res || []).map(
            (d) => new Date(`1970-01-01 ${d?.exit_time}+08:00`)
          ),
          backgroundColor: "gray",
          borderColor: "gray",
          borderWidth: 1,
        },
      ],
    };
  };

  const tabPanels = (res) => [
    {
      label: "Bar",
      value: 0,
      component: (
        <Bar
          data={config(
            res.filter((i) => i.teacher_email === savedAccount.email)
          )}
          options={options}
        />
      ),
    },
    {
      label: "Linear",
      value: 1,
      component: (
        <Line
          data={config(
            res.filter((i) => i.teacher_email === savedAccount.email)
          )}
          options={options}
        />
      ),
    },
  ];

  const className = savedAccount?.class_id.find(
    (i) => i.id === item[0]?.class_id
  )?.name;
  console.log(className);
  console.log(item);

  return (
    <div style={{ padding: "10px" }}>
      <span>{className} Attendance on {item[0]?.entry_day}</span>
      <Tabs
        role="tabs"
        aria-label="basic tabs"
        scrollButtons="auto"
        allowScrollButtonsMobile
        variant="scrollable"
        data-cy="tab-list"
        value={valueTab || tabPanels(item)[0]?.value}
        onChange={handleChange}
      >
        {tabPanels(item).map((tab, index) => (
          <Tab label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      {tabPanels(item).map((tab, index) =>
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
    </div>
  );
}
