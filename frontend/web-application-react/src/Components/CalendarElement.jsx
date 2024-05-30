import React from 'react'
import '../Css/CalendarElement.css'


export const CalendarElement = ({ date, active, onClick }) => {
  const [day, weekday] = date.toLocaleDateString(undefined, { day: 'numeric', weekday: 'short' }).split(' ');
  const backgroundColor = active ? '#0BC682' : 'white';
  const textColor = active ? 'white' : '#444444';

  return (
      <div
          className='calendar-element'
          style={{ backgroundColor, color: textColor }}
          onClick={() => onClick(date)}
      >
          <p>{weekday}</p>
          <p>{day}</p>
      </div>
  );
};