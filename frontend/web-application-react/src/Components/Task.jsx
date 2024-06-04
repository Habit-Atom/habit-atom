import React, { useState } from 'react';
import "../Css/Task.css"
import { request } from '../Helpers/axios_helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Task = ({id, task, completed, disabled}) => {
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
      <FontAwesomeIcon icon={task.icon} className="task-icon" style={{color: task.color}}/>
        <div className='task-name-container'> 
          <p className='task-name'>{task.name}</p>
          <p className='task-duration'>{task.duration}</p>
        </div>
      </div>
      <div className="round">
        <input
          type="checkbox"
          id={`checkbox-${name}-${task.id}`}
          defaultChecked={isCompleted}
          onChange={handleCheckboxClick}
          disabled={disabled}
        />
        <label htmlFor={`checkbox-${name}-${task.id}`} style={roundLabelStyle}></label>
      </div>
    </div>
  );
  };