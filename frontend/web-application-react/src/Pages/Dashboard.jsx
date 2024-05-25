import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Dashboard.css';
import { DailyProgress } from '../Components/DailyProgress';
import { CalendarElement } from '../Components/CalendarElement';
import { request } from '../Helpers/axios_helper';
import { Habit } from '../Components/Habit';
import { Task } from '../Components/Task';

export const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDateToYYYYMMDD = (date) => {
    return date.toISOString().split('T')[0];
  };

  const fetchHabitsAndTasks = (date) => {
    const formattedDate = formatDateToYYYYMMDD(date);
    
    request("GET", `/api/habits?date=${formattedDate}`)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((error) => {
        console.error('Error fetching habits:', error);
      });

    request("GET", `/api/tasks?date=${formattedDate}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  useEffect(() => {
    fetchHabitsAndTasks(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderCalendarElements = () => {
    const elements = [];
    for (let i = 0; i < 6; i++) {
      const dateForElement = addDays(date, i);
      elements.push(
        <CalendarElement
          key={i}
          date={dateForElement}
          active={dateForElement.toDateString() === selectedDate.toDateString()}
          onClick={handleDateClick}
        />
      );
    }
    return elements;
  };

  const handleAddHabitClick = () => {
    navigate('/create', { state: { toggle: false } });
  };

  const handleAddTaskClick = () => {
    navigate('/create', { state: { toggle: true } });
  };

  return (
    <main>
      <h1 id="page-title">Dashboard</h1>
      <div id='upper-container'>
        <DailyProgress habits={habits} tasks={tasks} />
        <div id="dashboard-calendar-container">
          {renderCalendarElements()}
        </div>
      </div>
      <div id='lower-container'>
        <div className='outer-container'>
          <div className='header'>
            <h2>Habits</h2>
            <button onClick={handleAddHabitClick}>Add Habit</button>
          </div>
          <div className='inner-container'>
            {habits.map((d) => (
              <Habit key={d.id} id={d.id} habit={d.habit} completed={d.completed} />
            ))}
          </div>
        </div>
        <div className='outer-container'>
          <div className='header'>
            <h2>Tasks</h2>
            <button onClick={handleAddTaskClick}>Add Task</button>
          </div>
          <div className='inner-container'>
            {tasks.map((d) => (
              <Task key={d.id} id={d.id} task={d.task} completed={d.completed} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
