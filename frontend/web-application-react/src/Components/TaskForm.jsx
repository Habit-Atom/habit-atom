import React, { useState } from 'react';
import { Calendar } from "react-multi-date-picker"
import "../Css/TaskForm.css"
import { request } from "../Helpers/axios_helper"

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

export const TaskForm = () => {

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

    const [values, setValues] = useState([])

    const handleAddTask = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const taskName = formData.get('task-name');
        const taskDuration = duration === 'custom' ? customDuration : duration;
        const taskColor = formData.get('color');

        if (values.length === 0) {
            alert("Please select at least one active date.");
            return;
        }

        const requestData = {
            name: taskName,
            duration: taskDuration,
            color: taskColor,
            activeDates: values.map(date => date.format("YYYY-MM-DD")),
        };

        console.log(requestData)

        request("POST", "/api/tasks/add", requestData)
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form className="form-container" onSubmit={handleAddTask}>
            <div className="top-side-form">
                <div className='left-side-form'>
                    <div className='form-block'>
                        <label htmlFor="task-name">Task name</label>
                        <input required type="text" name="task-name" id='task-name' />
                    </div>
                    <div className='form-block'>
                        <label>Choose or upload icon</label>
                    </div>
                    <div className='form-block'>
                        <label htmlFor="task-duration">Duration</label>
                        <select required name="task-duration" id="task-duration" value={duration} onChange={handleDurationChange}>
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
                    <p className="selectDaysTitle">Select active days</p>
                    <Calendar
                        value={values}
                        onChange={setValues}
                        multiple
                    />
                </div>
            </div>
            <div>
                <input className="addTaskButton" type="submit" value={"Add Task"} />
            </div>
        </form>
    )
}