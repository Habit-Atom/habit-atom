import React from 'react'
import '../Css/DailyProgress.css'


export const DailyProgress = () => {

    return (
        <div id='daily-progress-container'>
            <div id="daily-progress-text-container">
                <div id='text'>Your daily progress</div>
                <div id="display-count">
                    <div className="count-outer-container">
                        <div className="count-inner-container">
                            <span id='habits-done'>0</span>/<span id='habits-count'>0</span>
                        </div>
                        <p>Habits</p>
                    </div>
                    <div className="count-outer-container">
                        <div className="count-inner-container">
                            <span id='tasks-done'>0</span>/<span id='tasks-count'>0</span>
                        </div>
                        <p>Tasks</p>
                    </div>
                </div>
            </div>
            <div id="progress-bar-container">
                <div className="progress-bar">
                    <progress value="100" min="0" max="100" style={{ visibility: 'hidden', height: 0, width: 0 }} id='progress-bar'>100%</progress>
                </div>
            </div>

        </div>

    )
}