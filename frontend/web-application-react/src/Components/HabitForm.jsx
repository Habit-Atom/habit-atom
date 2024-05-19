import React, { useState } from 'react';
import "../Css/HabitForm.css"

const durations = [
    { value: '15 min', label: '15 min' },
    { value: '30 min', label: '30 min' },
    { value: '45 min', label: '45 min' },
    { value: '1 hour', label: '1 hour' },
    { value: '2 hours', label: '2 hours' }
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
                        <label class="orange">
                            <input type="radio" name="color" value="orange" />
                            <div class="button"><span></span></div>
                        </label>

                        <label class="amber">
                            <input type="radio" name="color" value="amber" />
                            <div class="button"><span></span></div>
                        </label>

                        <label class="lime">
                            <input type="radio" name="color" value="lime" />
                            <div class="button"><span></span></div>
                        </label>

                        <label class="teal">
                            <input type="radio" name="color" value="teal" />
                            <div class="button"><span></span></div>
                        </label>

                        <label class="blue">
                            <input type="radio" name="color" value="blue" />
                            <div class="button"><span></span></div>
                        </label>

                        <label class="indigo">
                            <input type="radio" name="color" value="indigo" />
                            <div class="button"><span></span></div>
                        </label>
                    </div>
                </div>
            </div>
            <div className='right-side-form'>
                
            </div>
        </form>
    )
}