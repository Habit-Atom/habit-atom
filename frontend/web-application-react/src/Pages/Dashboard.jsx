import React, { useState, useEffect } from 'react';
import '../Css/Dashboard.css'
import { DailyProgress } from '../Components/DailyProgress'
import { CalendarElement } from '../Components/CalendarElement'

export const Dashboard = () => {
    const [date, setDate] = useState(new Date());
  
    useEffect(() => {
        const intervalId = setInterval(() => {
          setDate(new Date());
        }, 60000); // Update every minute
    
        return () => clearInterval(intervalId);
      }, []);
    
      const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      };
    
      const renderCalendarElements = () => {
        const elements = [];
        for (let i = 0; i < 6; i++) {
          const dateForElement = addDays(date, i);
          if(i === 0){
            elements.push(<CalendarElement key={i} date={dateForElement} active={true}/>);   
          }else{
            elements.push(<CalendarElement key={i} date={dateForElement} active={false}/>);
          }
          
        }
        return elements;
      };

      const renderHabits = () => {
        
      };

      const renderTasks = () => {
        //sendRequest('http://localhost:8080/your-endpoint');
      };
    
    return (
        <main>
            <h1 id="page-title">Dashboard</h1>
            <div id='upper-container'>
                <DailyProgress></DailyProgress>
                <div id="dashboard-calendar-container">
                    {renderCalendarElements()}
                </div>
            </div>
            <div id='lower-container'>
                <div className='outer-container'>
                    <div className='header'>
                        <h2>Habits</h2>
                        <button>Add Habit</button>
                    </div>
                    <div className='inner-container'>
                        {renderHabits()}
                    </div>
                </div>
                <div className='outer-container'>
                    <div className='header'>
                        <h2>Tasks</h2>
                        <button>Add Task</button>
                    </div>
                    <div className='inner-container'>
                        {renderTasks()}
                    </div>
                </div>
            </div>
        </main>
        
    )
}