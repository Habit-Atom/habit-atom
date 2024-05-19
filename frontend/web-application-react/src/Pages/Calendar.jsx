import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "../Css/Calendar.css";
import { ProgressBar } from '../Components/ProgressBar';

const localizer = momentLocalizer(moment);

const isCurrentDay = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

const dayPropGetter = (date) => {
  return isCurrentDay(date) ? { className: 'current-day-cell' } : {};
};

const eventsFromDatabase = [
  { date: new Date('2024-05-01'), percentage: 30 },
  { date: new Date('2024-05-02'), percentage: 20 },
  { date: new Date('2024-05-03'), percentage: 40 },
  { date: new Date('2024-05-04'), percentage: 45 },
  { date: new Date('2024-05-05'), percentage: 56 },
  { date: new Date('2024-05-06'), percentage: 5 },
  { date: new Date('2024-05-07'), percentage: 33 },
  { date: new Date('2024-05-08'), percentage: 99 },
];


const generateEventsFromDatabase = (events) => {
  return events.map(event => ({
    title: <ProgressBar percentage={event.percentage} location={"calendar"} />,
    start: event.date,
    end: event.date,
  }));
};

const events = generateEventsFromDatabase(eventsFromDatabase);

export const Calendar = () => (
  <div id="calendar">
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '90%', width: '100%' }}
      dayPropGetter={dayPropGetter}
    />
  </div>
);