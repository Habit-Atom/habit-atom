import React, { useState } from 'react';
import "../Css/HabitForm.css"

const durations = [
    { value: '15 min', label: '15 min' },
    { value: '30 min', label: '30 min' },
    { value: '45 min', label: '45 min' },
    { value: '1 hour', label: '1 hour' },
    { value: '2 hours', label: '2 hours' }
];

const colors = [
    "orange",
    "amber",
    "lime",
    "teal",
    "blue",
    "indigo"
];

const daysLeft = [
    "Monday",
    "Tuesday",
    "Wednesday"
];
const daysRight = [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


export const HabitForm = () => {

    const [duration, setDuration] = useState('');
    const [customDuration, setCustomDuration] = useState('');

    const handleDurationChange = (event) => {
        const { value } = event.target;
        if (value === 'custom') {
            setCustomDuration('');
        }
        setDuration(value);
    };

    const handleCustomDurationChange = (event) => {
        setCustomDuration(event.target.value);
    };

    return (
        <form className="form-container">
            <div className="top-side-form">
                <div className='left-side-form'>
                    <div className='form-block'>
                        <label htmlFor="habit-name">Habit name</label>
                        <input type="text" name="habit-name" id='habit-name' />
                    </div>
                    <div className='form-block'>
                        <label htmlFor="habit-icon">Choose or upload icon</label>
                    </div>
                    <div className='form-block'>
                        <label htmlFor="habit-duration">Duration</label>
                        <select required name="habit-duration" id="habit-duration" value={duration} onChange={handleDurationChange}>
                            <option value="">Select</option>
                            {durations.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                            <option value="custom">Custom</option>
                        </select>
                        {duration === 'custom' && (
                            <input
                                type="text"
                                name="custom-duration"
                                id="custom-duration"
                                placeholder="Enter custom duration"
                                value={customDuration}
                                onChange={handleCustomDurationChange}
                            />
                        )}
                    </div>
                    <div className='form-block'>
                        <label htmlFor="color">Choose color</label>
                        <div className="color-options">
                            {colors.map(color => (
                                <label key={color} className={color}>
                                    <input type="radio" name="color" value={color} />
                                    <div className="button"><span></span></div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='right-side-form'>
                    <p className="selectDaysTitle">Select days</p>
                    <div className='select-days-block'>
                        <div>
                            <div className="selectDays">
                                <label className="round-checkbox-label">
                                    <span>Select All</span>
                                    <input type="checkbox" className="round-checkbox-input" />
                                    <span className="custom-checkbox"></span>
                                </label>
                            </div>
                            {daysLeft.map(day => (
                                <div className="selectDays" key={day}>
                                    <label className="round-checkbox-label">
                                        <span>{day}</span>
                                        <input type="checkbox" className="round-checkbox-input" />
                                        <span className="custom-checkbox"></span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div>
                            {daysRight.map(day => (
                                <div className="selectDays" key={day}>
                                    <label className="round-checkbox-label">
                                        <span>{day}</span>
                                        <input type="checkbox" className="round-checkbox-input" />
                                        <span className="custom-checkbox"></span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <input className="addHabitButton" type="submit" value={"Add Habit"} />
            </div>
        </form>
    )
}