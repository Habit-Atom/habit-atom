import React, { useState } from 'react';
import "../Css/Task.css"
import { request } from '../Helpers/axios_helper'

export const Task = ({id, task, completed}) => {
  const name = task.name.toLowerCase().replace(/\s+/g, '_');
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleCheckboxClick = async () => {
    try {
      await request('POST', '/api/tasks/updateStatus', {
        id: id,
      });
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const roundLabelStyle = {
    border: `3px solid ${task.color}`,
    backgroundColor: task.color,
  };


  if (isCompleted) {
    roundLabelStyle.backgroundColor = task.color;
    roundLabelStyle.borderColor = task.color;
  }else{
    roundLabelStyle.backgroundColor = "white";
    roundLabelStyle.borderColor = task.color;
  }

  return (
    <div className='task-container' style={{border: `3px solid ${task.color}`}}>
      <div className='task-details'>
        <img src={task.icon} alt="Icon" />
        <div className='task-name-container'> 
          <p className='task-name'>{task.name}</p>
          <p className='task-duration'>{task.duration}</p>
        </div>
      </div>
      <div className="round">
        <input
          type="checkbox"
          id={`checkbox-${name}`}
          defaultChecked={isCompleted}
          onChange={handleCheckboxClick}
        />
        <label htmlFor={`checkbox-${name}`} style={roundLabelStyle}></label>
      </div>
    </div>
  );
  };