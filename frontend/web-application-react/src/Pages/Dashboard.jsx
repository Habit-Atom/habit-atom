import React, { useState, useEffect } from 'react';
import '../Css/Dashboard.css'
import { DailyProgress } from '../Components/DailyProgress'
import { CalendarElement } from '../Components/CalendarElement'
import { request } from '../Helpers/axios_helper'
import { Habit } from '../Components/Habit'
import { Task } from '../Components/Task'

export const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);

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
      if (i === 0) {
        elements.push(<CalendarElement key={i} date={dateForElement} active={true} />);
      } else {
        elements.push(<CalendarElement key={i} date={dateForElement} active={false} />);
      }

    }
    return elements;
  };

  const renderHabits = () => {
    return request("GET", "/api/habits")
      .then((response) => {
        setHabits(response.data)
      })
      .catch((error) => {
        console.error('Error fetching habits:', error);
      });
  };

  const renderTasks = () => {
    return request("GET", "/api/tasks")
      .then((response) => {
        setTasks(response.data)
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  useEffect(() => {
    renderHabits();
    renderTasks();
  }, []);

  return (
    <main>
      <h1 id="page-title">Dashboard</h1>
      <div id='upper-container'>
        <DailyProgress habits={habits} tasks={tasks}></DailyProgress>
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
            {habits.map((d) => (
              <Habit key={d.id} habit={d.habit} completed={d.completed} />
            ))}
          </div>
        </div>
        <div className='outer-container'>
          <div className='header'>
            <h2>Tasks</h2>
            <button>Add Task</button>
          </div>
          <div className='inner-container'>
            {tasks.map((d) => (
              <Task key={d.id} task={d.task} completed={d.completed} />
            ))}
          </div>
        </div>
      </div>
    </main>

  )
}