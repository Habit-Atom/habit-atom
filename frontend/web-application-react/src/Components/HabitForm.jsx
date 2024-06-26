import React, { useState } from 'react';
import "../Css/HabitForm.css";
import { request } from "../Helpers/axios_helper";
import { IconModal } from "./IconModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus } from '@fortawesome/free-solid-svg-icons';


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
    const [selectedDays, setSelectedDays] = useState({});
    const [selectAll, setSelectAll] = useState(false);
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

    const handleDayChange = (day) => {
        setSelectedDays(prevSelectedDays => {
            const updatedSelectedDays = {
                ...prevSelectedDays,
                [day]: !prevSelectedDays[day]
            };
            setSelectAll([...daysLeft, ...daysRight].every(day => updatedSelectedDays[day]));
            return updatedSelectedDays;
        });
    };

    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedSelectedDays = {};
        [...daysLeft, ...daysRight].forEach(day => {
            updatedSelectedDays[day] = newSelectAll;
        });
        setSelectedDays(updatedSelectedDays);
    };

    const handleAddHabit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const habitName = formData.get('habit-name');
        const habitDuration = duration === 'custom' ? customDuration : duration;
        const habitColor = formData.get('color');
        const selectedDaysOfWeek = Object.entries(selectedDays)
            .filter(([day, isSelected]) => isSelected)
            .map(([day, isSelected]) => day);

        const requestData = {
            name: habitName,
            duration: habitDuration,
            color: habitColor,
            icon: selectedIcon,
            selectedDaysOfWeek: selectedDaysOfWeek
        };

        request("POST", "/api/habits/add", requestData)
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
            <form className="form-container" onSubmit={handleAddHabit}>
                <div className="top-side-form">
                    <div className='left-side-form'>
                        <div className='form-block'>
                            <label htmlFor="habit-name">Habit name</label>
                            <input required type="text" name="habit-name" id='habit-name' />
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
                        <p className="selectDaysTitle">Select days</p>
                        <div className='select-days-block'>
                            <div>
                                <div className="selectDays">
                                    <label className="round-checkbox-label">
                                        <span>Select All</span>
                                        <input
                                            type="checkbox"
                                            className="round-checkbox-input"
                                            checked={selectAll}
                                            onChange={handleSelectAllChange}
                                        />
                                        <span className="custom-checkbox"></span>
                                    </label>
                                </div>
                                {daysLeft.map(day => (
                                    <div className="selectDays" key={day}>
                                        <label className="round-checkbox-label">
                                            <span>{day}</span>
                                            <input
                                                type="checkbox"
                                                className="round-checkbox-input"
                                                checked={selectedDays[day] || false}
                                                onChange={() => handleDayChange(day)}
                                            />
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
                                            <input
                                                type="checkbox"
                                                className="round-checkbox-input"
                                                checked={selectedDays[day] || false}
                                                onChange={() => handleDayChange(day)}
                                            />
                                            <span className="custom-checkbox"></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='add-button-container'>
                    <input className="addHabitButton" type="submit" value={"Add Habit"} />
                </div>
            </form>
            <IconModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSelect={handleIconSelect}
            />
        </>
    );
};
