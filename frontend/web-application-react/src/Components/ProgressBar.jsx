import React from 'react';
import "../Css/ProgressBar.css"

export const ProgressBar = ({ percentage, location }) => {
  let height = 0;
  let width = 0;
  let fontSize = 0;
  if (location === "calendar") {
    height = 60;
    width = 60;
    fontSize = 16;
  } else if (location === "dashboard") {
    height = 120;
    width = 120;
    fontSize = 26;
  }

  return (
    <div id="progress-bar-container">
      <div className="progress-bar" style={{ '--percentage': percentage, height, width, fontSize }}>
        
      </div>
    </div>
  );
};

//<progress value={percentage} max="100" style={{ visibility: 'hidden', height: 0, width: 0 }} id='progress-bar'>{percentage}%</progress>
