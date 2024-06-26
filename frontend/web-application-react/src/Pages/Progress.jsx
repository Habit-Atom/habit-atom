import React, { useState, useEffect } from 'react';
import "../Css/Progress.css";
import { PieChart, LineChart } from '@mui/x-charts';
import { request } from "../Helpers/axios_helper";

export const Progress = () => {
  const [toggle, setToggle] = useState(false);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthlyLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

  // Effect to update xLabels based on toggle state
  useEffect(() => {
    setXLabels(toggle ? monthlyLabels : weeklyLabels);
  }, [toggle]);

  // Effect to request data once xLabels has been updated
  useEffect(() => {
    if (xLabels.length === 0) return;  // Skip if xLabels is not yet set

    const lineChartEndpoint = toggle
      ? "/api/statistics/lineChart/monthly"
      : "/api/statistics/lineChart/weekly";
    const pieChartEndpoint = toggle
      ? "/api/statistics/pieChart/monthly"
      : "/api/statistics/pieChart/weekly";

    requestDataForLineChart(lineChartEndpoint);
    requestDataForPieChart(pieChartEndpoint);
  }, [xLabels, toggle]);

  const requestDataForLineChart = (endpoint) => {
    request("GET", endpoint)
      .then((response) => {
        console.log('Line chart data received:', response.data);
        setLineData(response.data); // Update lineData directly
      })
      .catch((error) => {
        console.log('Error fetching line chart data:', error);
        setLineData([]); // Handle error state
      });
  };

  const requestDataForPieChart = (endpoint) => {
    request("GET", endpoint)
      .then((response) => {
        const data = response.data;
        const pieChartData = Object.entries(data).map(([key, value]) => ({
          label: key,
          value: value.value,
          color: value.color,
        }));
        console.log('Pie chart data received:', response.data);
        setPieData(pieChartData);
      })
      .catch((error) => {
        console.log('Error fetching pie chart data:', error);
      });
  };

  return (
    <main id='progress'>
      <div id="progress-buttons-container">
        <div className="checkbox-wrapper-22">
          <label className="switch" htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              checked={toggle}
              onChange={() => setToggle(!toggle)}
            />
            <div className="slider round"></div>
            <p id="weekly-text">Weekly</p>
            <p id="monthly-text">Monthly</p>
          </label>
        </div>
      </div>
      <div id="charts-container">
        {lineData.length > 0 && (
          <LineChart
            width={600}
            height={400}
            series={[{
              data: lineData,
              area: true,
              showMark: false,
              color: '#0BC682',
              areaStyle: { fill: 'rgba(11, 198, 130, 0.3)' }
            }]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            yAxis={[{ min: 0, max: 100 }]}
          />
        )}
        <PieChart
          width={600}
          height={350}
          series={[{
            data: pieData,
            innerRadius: 45,
            outerRadius: 150,
            paddingAngle: 3,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: 150,
            cy: 150,
          }]}
        />
      </div>
    </main>
  );
};
