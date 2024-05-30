import React, { useState } from 'react';
import '../Css/Habit.css';
import { request } from '../Helpers/axios_helper'


export const Habit = ({id, habit, completed, disabled }) => {
  const name = habit.name.toLowerCase().replace(/\s+/g, '_');
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleCheckboxClick = async () => {
    try {
      await request('POST', '/api/habits/updateStatus', {
        id: id,
      });
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error('Error updating habit status:', error);
    }
  };

  const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const rgbaColor = hexToRGBA(habit.color, 0.7);

  const roundLabelStyle = {
    border: `3px solid ${habit.color}`,
    backgroundColor: habit.color,
  };


  if (isCompleted) {
    roundLabelStyle.backgroundColor = habit.color;
    roundLabelStyle.borderColor = habit.color;
  }else{
    roundLabelStyle.backgroundColor = "transparent";
    roundLabelStyle.borderColor = habit.color;
  }

  return (
    <div className='habit-container' style={{backgroundColor: rgbaColor}}>
      <div className='habit-details'>
        <img src={habit.icon} alt="Icon" />
        <div className='habit-name-container'> 
          <p className='habit-name'>{habit.name}</p>
          <p className='habit-duration'>{habit.duration}</p>
        </div>
      </div>
      <div className="round">
        <input
          type="checkbox"
          id={`checkbox-${name}-${habit.id}`}
          defaultChecked={isCompleted}
          onChange={handleCheckboxClick}
          disabled={disabled}
        />
        <label htmlFor={`checkbox-${name}-${habit.id}`} style={roundLabelStyle}></label>
      </div>
    </div>
  );
};