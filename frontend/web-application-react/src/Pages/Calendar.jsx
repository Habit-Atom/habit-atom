import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "../Css/Calendar.css";
import { ProgressBar } from '../Components/ProgressBar';
import { request } from "../Helpers/axios_helper";

const localizer = momentLocalizer(moment);

const isCurrentDay = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

const dayPropGetter = (date) => {
  return isCurrentDay(date) ? { className: 'current-day-cell' } : {};
};

const generateEventsFromDatabase = (events) => {
  return events.map(event => ({
    title: <ProgressBar percentage={Math.floor(event.percentOfCompletion)} location={"calendar"} />,
    start: new Date(event.date),
    end: new Date(event.date),
  }));
};

export const Calendar = () => {
  const [eventsFromDatabase, setEventsFromDatabase] = useState([]);

  const requestCalendarDates = () => {
    request(
      "GET",
      "/api/statistics/dates",
    ).then(
      (response) => {
        setEventsFromDatabase(response.data);
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    requestCalendarDates();
  }, []);

  const events = generateEventsFromDatabase(eventsFromDatabase);

  return (
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
};
