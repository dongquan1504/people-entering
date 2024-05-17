import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
// import { Tooltip, Legend, BarElement, Chart as ChartJS, CategoryScale, LinearScale } from "chartjs";

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);
function Home() {
  // const [loginForm, setLoginForm] = useState(initializeLoginForm);
  const navigate = useNavigate();
    
  useEffect(() => {
    const fetchSamplings = async () => {
        const res = await fetch("http://192.168.1.100:8080/consumer/v1/sampling/sensor/esp_planter_1/humidity/interval/24")
        const data = await res.json();
        
        setChartData({
            labels: data.map((sampling) => sampling.samplingDate),
            datasets: [{
                label: "Humidity",
                data: data.map((sampling) => sampling.humidity)                    
            }]
        });
    }
    fetchSamplings();        
}, [])

const [chartData, setChartData] = useState({
    datasets: [],
});

return(
    <div style={{height: "1024px", width: "2048px"}}>
        <Chart type='line' data={chartData} />
    </div>
)
}

export default Home;
