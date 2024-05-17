import React, { useState } from 'react';
import "../Css/Task.css"

export const Task = ({task, completed}) => {
  const name = task.name.toLowerCase().replace(/\s+/g, '_');
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleCheckboxClick = () => {
    setIsCompleted(!isCompleted); 
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
          onClick={handleCheckboxClick}
        />
        <label htmlFor={`checkbox-${name}`} style={roundLabelStyle}></label>
      </div>
    </div>
  );
  };