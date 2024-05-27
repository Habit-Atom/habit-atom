import React, { useState, useEffect } from 'react';
import "../Css/Progress.css";
import { PieChart, LineChart } from '@mui/x-charts';
import {request} from "../Helpers/axios_helper"

export const Progress = () => {
    const [toggle, setToggle] = useState(false);
    const [lineData, setLineData] = useState([]);
    const [pieData, setPieData] = useState([]);
    let xLabels = [];

    if (toggle) {
        xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else {
        xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }



    const requestDataForLineChart = () => {
        request(
          "GET",
          "/api/statistics/lineChart",
        ).then(
          (response) => {
            setLineData(response.data);
          }).catch(
            (error) => {
              console.log(error);
            }
          );
      };

      const requestDataForPieChart = () => {
        request(
          "GET",
          "/api/statistics/pieChart",
        ).then(
          (response) => {
            const data = response.data;
            const pieChartData = Object.entries(data).map(([key, value]) => ({ label: key, value: value.value, color: value.color }));
            setPieData(pieChartData);
          }).catch(
            (error) => {
              console.log(error);
            }
          );
      };
    
      useEffect(() => {
        requestDataForLineChart();
        requestDataForPieChart();
      }, []);

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
                        <p id="yearly-text">Yearly</p>
                    </label>
                </div>
            </div>
            <div id="charts-container">
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
                <PieChart
                    width={500}
                    height={350}
                    series={[
                        {
                            data: pieData,
                            innerRadius: 45,
                            outerRadius: 150,
                            paddingAngle: 3,
                            cornerRadius: 5,
                            startAngle: 0,
                            endAngle: 360,
                            cx: 150,
                            cy: 150,
                        }
                    ]}
                />
            </div>
        </main>
    );
};
