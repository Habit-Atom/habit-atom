import React, { useState } from 'react';
import "../Css/Progress.css";
import { PieChart, LineChart } from '@mui/x-charts';

export const Progress = () => {
    const [habits, setHabits] = useState(false);
    let xLabels = [];
    let uData = [];

    if (habits) {
        xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        uData = [20, 55, 30, 85, 15, 50, 70,20, 55, 30, 85, 15];
    } else {
        xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        uData = [20, 55, 30, 85, 15, 50, 70];
    }

    return (
        <main id='progress'>
            <div id="progress-buttons-container">
                <div className="checkbox-wrapper-22">
                    <label className="switch" htmlFor="checkbox">
                        <input 
                            type="checkbox" 
                            id="checkbox" 
                            checked={habits} 
                            onChange={() => setHabits(!habits)} 
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
                        data: uData,
                        area: true,
                        showMark: false,
                        color: '#0BC682',
                        areaStyle: { fill: 'rgba(11, 198, 130, 0.3)' }
                    }]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    yAxis={[{ min: 0, max: 100 }]}
                />
                <PieChart
                    width={450}
                    height={350}
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, color: "#FFE29C", label: "Studying" },
                                { id: 1, value: 15, color: "#FFA4A4", label: "Cycling" },
                                { id: 2, value: 20, color: "#A4C8FF", label: "Reading" },
                            ],
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
