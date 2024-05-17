import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import { Tooltip, Legend, BarElement, Chart as ChartJS, CategoryScale, LinearScale } from "chartjs";

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

function Home() {
  // const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();
    
  

return(
    <div style={{height: "1024px", width: "2048px"}}>
        <Chart type='line' data={chartData} />
    </div>
)
}

export default Home;
