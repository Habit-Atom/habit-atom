import React from 'react';
import '../Css/DailyProgress.css';
import { ProgressBar } from './ProgressBar';

export const DailyProgress = ({ habits, tasks }) => {
  const totalHabits = habits.length;
  const totalTasks = tasks.length;

  const completedHabits = habits.filter(habit => habit.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const percentage = Math.floor(((completedHabits + completedTasks) / (totalHabits + totalTasks)) * 100);

  return (
    <div id='daily-progress-container'>
      <div id="daily-progress-text-container">
        <div id='text'>Your daily progress</div>
        <div id="display-count">
          <div className="count-outer-container">
            <div className="count-inner-container">
              <span id='habits-done'>{completedHabits}</span>/<span id='habits-count'>{totalHabits}</span>
            </div>
            <p>Habits</p>
          </div>
          <div className="count-outer-container">
            <div className="count-inner-container">
              <span id='tasks-done'>{completedTasks}</span>/<span id='tasks-count'>{totalTasks}</span>
            </div>
            <p>Tasks</p>
          </div>
        </div>
      </div>
      <ProgressBar percentage={percentage} location={"dashboard"}></ProgressBar>
    </div>
  );
};