import React, { useState } from 'react';
import { Calendar } from "react-multi-date-picker"
import "../Css/TaskForm.css"
import { request } from "../Helpers/axios_helper"
import { IconModal } from "./IconModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const durations = [
    { value: '15 min', label: '15 min' },
    { value: '30 min', label: '30 min' },
    { value: '45 min', label: '45 min' },
    { value: '1 hour', label: '1 hour' },
    { value: '2 hours', label: '2 hours' }
];

const colors = {
    "amber": "#F4D03F",
    "orange": "#F39C12",
    "light-pink": "#FFE6E6",
    "pink": "#FF70AB",
    "red": "#E74C3C",
    "light-green": "#9DDE8B",
    "vomit-green": "#D2D180",
    "lime": "#2ECC71",
    "teal": "#48C9B0",
    "blue": "#3498DB",
    "purple": "#7469B6",
    "brown": "#A67B5B",
};

export const TaskForm = () => {

    const [duration, setDuration] = useState('');
    const [customDuration, setCustomDuration] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('');

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
            icon: selectedIcon,
            activeDates: values.map(date => date.format("YYYY-MM-DD")),
        };

        console.log(requestData)

        request("POST", "/api/tasks/add", requestData)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleIconSelect = (icon) => {
        setSelectedIcon(icon);
        closeModal();
    };

    return (
        <>
            <form className="form-container" onSubmit={handleAddTask}>
                <div className="top-side-form">
                    <div className='left-side-form'>
                        <div className='form-block'>
                            <label htmlFor="task-name">Task name</label>
                            <input required type="text" name="task-name" id='task-name' />
                        </div>
                        <div className='form-block' id="icon-block">
                            <label>Choose or upload icon</label>
                            <button type="button" onClick={openModal} id='icon-select-button'>
                                {selectedIcon ? (
                                    <FontAwesomeIcon icon={selectedIcon} />
                                ) : (
                                    <FontAwesomeIcon icon={faPlus} />
                                )}
                            </button>

                            <input type="hidden" name="icon" value={selectedIcon} />
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
                                {Object.entries(colors).map(([name, hex]) => (
                                    <label key={name} className={name}>
                                        <input type="radio" name="color" value={hex} />
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
                <div className='add-button-container'>
                    <input className="addTaskButton" type="submit" value={"Add Task"} />
                </div>
            </form>
            <IconModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSelect={handleIconSelect}
            />
        </>
    )
}